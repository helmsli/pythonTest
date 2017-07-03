#include <iostream>
#include "BtsCDRmanager.h"


#define  ARRAY_LENGTH_FOR_UNITE_BTS_RECORD 1024

FunBtsCdrparseEnd funBtsCdrparseEnd = 0;
FunBtsProcessCallback funBtsProcessCallback=0;
void setFunBtsProcessCallback(FunBtsProcessCallback c)
{
	funBtsProcessCallback=c;
}


void setFunBtsCdrparseEnd(FunBtsCdrparseEnd c) {
  funBtsCdrparseEnd = c;
} 

XS32 Fun(XS32 nSum, XS32 j)
{
	XS32 b = nSum;
	//求第i+1位的数字是(nSum/10E+i)%10;
	while(0 != j )
	{
		b = b/10;
		j--;
	}
	b = b % 10;
	return (XS32)b;
}

BtsCDRmanager::BtsCDRmanager()
{
}

BtsCDRmanager::~BtsCDRmanager()
{
}


XVOID BtsCDRmanager::AdjustHead(SBtsHead &sHead)
{
	sHead.uiLen = XOS_NtoHl(sHead.uiLen);
	sHead.usRcdCnt = XOS_NtoHs(sHead.usRcdCnt);
	sHead.usChdFldIndx = XOS_NtoHs(sHead.usChdFldIndx);
	sHead.iChk = XOS_NtoHl(sHead.iChk);
}

// 调整子域字节序
XVOID BtsCDRmanager::AdjustCldFld(SBtsChdFld &sChild)
{
	sChild.usNxtChdFldIndx = XOS_NtoHs(sChild.usNxtChdFldIndx);
	sChild.usIndxCnt = XOS_NtoHs(sChild.usIndxCnt);
}

XVOID BtsCDRmanager::AdjustRecord(SBtsRecord &record)
{
	record.usRrdLen = XOS_NtoHs(record.usRrdLen);
	record.usSheetType = XOS_NtoHs(record.usSheetType);
    	record.uiSeqID = XOS_NtoHl(record.uiSeqID);
	record.uiPID = XOS_NtoHl(record.uiPID);
	record.uiUID = XOS_NtoHl(record.uiUID);
	record.uiDuration = XOS_NtoHl(record.uiDuration);
	record.uiBtsID = XOS_NtoHl(record.uiBtsID);
	record.uiWiFiUID = XOS_NtoHl(record.uiWiFiUID);
	record.uiWiFiIP = XOS_NtoHl(record.uiWiFiIP);

	record.SegmentID = XOS_NtoHs(record.SegmentID);
	record.usULMAXBW = XOS_NtoHs(record.usULMAXBW);
	record.usULMINBW = XOS_NtoHs(record.usULMINBW);
	record.usDLMAXBW = XOS_NtoHs(record.usDLMAXBW);
	record.usDLMINBW = XOS_NtoHs(record.usDLMINBW);
	/*新增硬件类型转换*/
	record.hardWareType = XOS_NtoHs(record.hardWareType);
}

//读取固定域数据
XS32 BtsCDRmanager::LoadFixField(FILE * fp, SBtsRecord & obj)
{
	//读取基站的数据域的字节长度
	XU16 contentLen=0;	
	XS8 *content=(XS8*)malloc(1024);
	memset(content,0,1024);
	XS32 len =  (XS32)(fread((XVOID*)(content), 1, 2, fp));
	if(len!=2)
	{
		free(content);
		return -1;
	}
	//contentLen 不包括长度
	contentLen = (content[0]&0xff) * 256 + 	 (content[1]&0xff) ;
	if(contentLen>=1024-2||contentLen<=0)
	{
        	free(content);
		return contentLen;
	}

	XS32 ret = (XS32)(fread((XVOID*)(content+2), 1, contentLen-2, fp));

	len = contentLen;
        if(ret!=contentLen-2)
        {
        	free(content);
        	return -4;
        }

	if(len>sizeof(SBtsRecord))
	{
		len=sizeof(SBtsRecord);
	}
	//兼容老的话单格式
	else if(len<60)
	{
		free(content);
		return -3;
	}
	memcpy((XS8*)(&obj),content,len);
	
	if(ret == contentLen-2) 
	{
		AdjustRecord(obj);
	
		ret = 0;
	}
	else
	{
		ret = -2;
	}
	free(content);
	return ret;
}


XVOID BtsCDRmanager::conver_i642_str(XS8* str_result,XS32 i64value)
{
	XS8 szArr[100] = {0};
	XS32 nNum = i64value;
	XS32 nFlag =0;

	//取出个位数字
	szArr[0] = (XS32)(nNum % 10);
	nFlag = nNum-szArr[0];
	XS32 i=1;
	for(; 0  != nFlag ; i++)
	{
		//取第i+1位的数字
		szArr[i] = Fun(nNum, i) ;
		//将nFlag缩小到原来的十分之一，然后减去右起第i+1位的值，
		//得到的值必然是10的倍数，为下次除以10与0比较做准备
		nFlag = nFlag/10 - szArr[i];
	}
	XS32 j(0);
	while(i != 0)
	{
		sprintf(&str_result[j],"%c", szArr[i-1]+48);
		j++;
		i--;
	}
}



XS32 BtsCDRmanager::conver_byte8_i64(const XU8* byte8,XS32 lenth,std::string& result)
{
	XS32 i64result(0);
	XS8 t1[64] = {0};
	if ( lenth < 1)
	{
		conver_i642_str(t1,i64result);
		result = t1;
		return i64result;
	}
	i64result = byte8[0];
	for ( XS32 i =1; i < lenth; i++ )
	{
		i64result = i64result << 8 ;
		i64result += byte8[i];
	}

	conver_i642_str(t1,i64result);
	result = t1;

	return i64result;	
}


XS8* BtsCDRmanager::TransferTime(const XS8 * inTime, const XS32 iLen, XS8 * outTime)
{
	XS8 ch;
	XS8 chVal[3];
	XS8 * tmp = outTime;
	for(XS32 i = 0; i < iLen; ++i)
	{
		ch = inTime[i];
		sprintf(chVal, "%02d", ch);
		outTime[2*i + 1] = chVal[1];
		outTime[2*i] = chVal[0];
	}
	return tmp;
}


XVOID BtsCDRmanager::convert_byte14_dateTimeStr(const  XS8* byte14,std::string& result)
{
	SDateTime date_time;
	XS8 tmp_var[5];
	XS8 t2[64] = {0};
	
	XU8* pos = (XU8*)byte14;
	memset(tmp_var,0,5);
	memcpy(tmp_var,pos,4);
	date_time.lYear = atoi(tmp_var);

	memset(tmp_var,0,5);
	pos += 4;
	memcpy(tmp_var,pos,2);
	date_time.lMonth = atoi(tmp_var);

	memset(tmp_var,0,5);
	pos += 2;
	memcpy(tmp_var,pos,2);
	date_time.lDay = atoi(tmp_var);

	memset(tmp_var,0,5);
	pos += 2;
	memcpy(tmp_var,pos,2);
	date_time.lHour = atoi(tmp_var);

	memset(tmp_var,0,5);
	pos += 2;
	memcpy(tmp_var,pos,2);
	date_time.lMinute = atoi(tmp_var);

	memset(tmp_var,0,5);
	pos += 2;
	memcpy(tmp_var,pos,2);
	date_time.lSecond = atoi(tmp_var);

	date_time.printRfTime(t2);
	result = t2;
}


//const XS8* BtsCDRmanager::UniteRecord(const SBtsRecord & record)
const XS8* BtsCDRmanager::UniteRecord(const SBtsRecord & record, XS8 *result, XS32 &resultLen)
{
//	static XS8 result[1024];
//	memset(result,0,1024);

	XS8 t1_7[8]={0};
	XS8 t2_7[8]={0};

	memcpy(t1_7,record.sStartTime,7);
	memcpy(t2_7,record.sEndTime,7);
	XS8 t1[15] = {0};
	XS8 t2[15] = {0};

	//调试UID是否正确
	XS8 strUID[10] = {0};
	sprintf(strUID,"%08x",record.uiUID);

	std::string dataflowup,dataflowdown;
	std::string starttime,endtime,datamac;
	conver_byte8_i64(record.sDataFlowUp, 8, dataflowup);
	conver_byte8_i64(record.sDataFlowDown, 8, dataflowdown);


	XS8 macAddr[128]={0};
	XS8 tempMac[128]={0};	
	for(XS32 i=0;i<6;i++)
	{
		memset(tempMac,0,128);
		sprintf(tempMac,"%02x",record.sWiFiMAC[i]&0xff);
		strcat(macAddr,tempMac);
		if(i<5)
		{
			strcat(macAddr,"-");
		}
	}
	datamac=macAddr;	

	TransferTime(t1_7,7,t1);
	convert_byte14_dateTimeStr(t1,starttime);

	TransferTime(t2_7,7,t2);
	convert_byte14_dateTimeStr(t2,endtime);

	//业务类型0-7，表示数据的流量级别
	XS16 user_type = record.ucUserType;
	if(0 != record.uiWiFiUID)
	{
		sprintf(result
			, "%u\t%d\t%u\t%u\t%d\t%s\t%s\t%d\t%s\t%s\t%u\t%u\t%u\t%s\t%u\t%u\t%u\n"
			, record.uiSeqID
			, record.usSheetType
			, record.uiPID
			, record.uiWiFiUID
			, user_type 
			, starttime.c_str()
			, endtime.c_str()
			, record.uiDuration
			, dataflowup.c_str()
			, dataflowdown.c_str()
			, record.uiBtsID
			, record.uiUID
			, record.uiWiFiIP
			, datamac.c_str()
			,record.SegmentID		
			,record.softWareType//软件类型
			,record.hardWareType//硬件类型
			); 
		//   	 CHARGE_ERROR(("BtsCDRMgr::ParseCDR file=%d,%s", 2,result));
		return result;

	}
	else
	{
		sprintf(result
			, "%u\t%d\t%u\t%u\t%d\t%s\t%s\t%d\t%s\t%s\t%u\t%u\t%u\t%s\t%u\t%u\t%u\n"
			, record.uiSeqID
			, record.usSheetType
			, record.uiPID
			, record.uiUID
			, user_type 
			, starttime.c_str()
			, endtime.c_str()
			, record.uiDuration
			, dataflowup.c_str()
			, dataflowdown.c_str()
			, record.uiBtsID
			, record.uiWiFiUID
			, record.uiWiFiIP
			, datamac.c_str()
			,record.SegmentID		
			,record.softWareType//软件类型
			,record.hardWareType//硬件类型
			);

		return result;
	}
}




int BtsCDRmanager::ParseBtsCDR( char *FileName, char *sourceDir, char *desDir)
{

	XS8 sCDR[512] = {0};
	XS8 sFinalCDR[512] = {0};
	char pyBtsRecord[1024]={0};
	sprintf(sCDR, "%s%s",sourceDir, FileName);
	SBtsHead   head;
	SBtsChdFld sChdFld;		
	std::string sFinalFileName;
	std::string sFinalRec;
	XU32 nFilePos = 0;
	FILE *fp = NULL;
	FILE *wfp = NULL;
	size_t readBytes = 0;
	if(NULL == (fp = fopen(sCDR, "rb")))
	{
		return -1;
	}

	fseek(fp, nFilePos, 0);

	readBytes = fread((XVOID*)&head, 1, sizeof(SBtsHead), fp);
	if(readBytes<sizeof(SBtsHead))
	{
		if (fp != NULL) 
		{
			fclose( fp );
			fp = NULL;
		}
		return -1;
	}
	// 调整消息头网络字节序
	AdjustHead(head);
	if(head.uiLen <= sizeof(SBtsHead) || head.usRcdCnt == 0 ) 
	{
		if (fp != NULL) 
		{
			fclose( fp );
			fp = NULL;
		}
		return -1;
	}
	// 定位子域开始位置
	nFilePos = head.usChdFldIndx-1;
	fseek(fp, nFilePos, 0);

	readBytes = fread((XVOID*)&sChdFld, 1, sizeof(SBtsChdFld), fp);
	if(readBytes<sizeof(SBtsChdFld))
	{
		if (fp != NULL) 
		{
			fclose( fp );
			fp = NULL;
		}
		return -1;
	}
	
	AdjustCldFld(sChdFld); //调整子域结构

	//最终话单文件
	std::string tmp_file = FileName;
	XS32 pos = (XS32)(tmp_file.find("."));
	if ( pos != -1 )
	{
		sFinalFileName = tmp_file.substr(0,pos);
	}
	else
	{
		sFinalFileName = tmp_file;
	}		
	sFinalFileName += ".txt";

	//最终话单路径

	sprintf(sFinalCDR, "%s/%s", desDir, sFinalFileName.c_str());

	if((wfp = fopen(sFinalCDR, "wt")) == NULL)
	{
		//打开文件失败后,最终话单序号不需要递增,返回到以前			
		return -1;
	}


	// 定位记录域开始位置，目前索引宽度为0，忽略
	nFilePos += sizeof(SBtsChdFld);
	fseek(fp, nFilePos, 0);


	XS32 nRecCnt = 0;	
	XS8 arrayForUnite[ARRAY_LENGTH_FOR_UNITE_BTS_RECORD] = {0};
	XS32 arrayLen = (XS32)(sizeof(arrayForUnite));
	
	for(;  nRecCnt < head.usRcdCnt; nRecCnt++)
	{
		SBtsRecord record;			
		if( 0 != LoadFixField(fp,record)) 
		{
			break;
		}

		nFilePos += record.usRrdLen;
		fseek(fp, nFilePos, 0);
		memset(arrayForUnite, 0x00, sizeof(arrayForUnite));
		//sFinalRec = UniteRecord(record);
		sFinalRec = UniteRecord(record, arrayForUnite, arrayLen);
		//bstRecodrList.push_back(record);
		memset(pyBtsRecord,0,sizeof(pyBtsRecord));
		strcpy(pyBtsRecord,sFinalRec.c_str());
		if(funBtsProcessCallback){
			(*funBtsProcessCallback)(pyBtsRecord);
			 cout<< "parse process" <<endl;
			//(*funBtsCdrparseEnd)();
		}	
		else
			(*funBtsCdrparseEnd)();
		if (funBtsCdrparseEnd) (*funBtsCdrparseEnd)();
		fwrite(sFinalRec.c_str(), sFinalRec.length(), 1, wfp);
	}
	if (NULL != wfp)
	{
		fclose(wfp);
		wfp = 0;
	}
	if (NULL != fp)
	{
		fclose(fp);
		fp = 0;
	}
	if (funBtsCdrparseEnd) (*funBtsCdrparseEnd)();
	return 0;
}
/*
PyObject *BtsCDRmanager::setPyCallback(PyObject *dummy, PyObject *args)
{
    PyObject *result = NULL;
    PyObject *temp;

    if (PyArg_ParseTuple(args, "O:set_callback", &temp)) {
        if (!PyCallable_Check(temp)) {
            PyErr_SetString(PyExc_TypeError, "parameter must be callable");
            return NULL;
        }
        Py_XINCREF(temp);         
        Py_XDECREF(my_callback);  
        my_callback = temp;       
        // Boilerplate to return "None" 
        Py_INCREF(Py_None);
        result = Py_None;
    }
    return result;
}
*/