#pragma once
#include <stdio.h>  
#include <string.h>
#include "os.h"
#include "publictype.h"  
#include "btsChargeCommon.h"
#include <list>
#pragma pack(push, 1)

// ��Ϣͷ�ṹ
typedef struct SBtsHead
{
	XU32 uiLen;
	XS8 sVersion[4];
	XU16 usRcdCnt;
	XU16 usChdFldIndx;
	XU8 ucChdFldCnt;
	XS8 cMthd;
	XS32 iChk;
	XS8 sHold[2];
	SBtsHead() {
		memset(this, 0, sizeof(SBtsHead));
	}
} SBtsHead;

// ����ṹ
typedef struct SBtsChdFld
{
	XU16 usNxtChdFldIndx;
	XU8 ucRcdType;
	XU8 ucIndxWidth;
	XS8 sVersion[4];
	XU16 usIndxCnt;
	XU16 usIndxTbl;
	SBtsChdFld() {
		memset(this, 0, sizeof(SBtsChdFld));
	}
} SBtsChdFld;



#pragma pack(pop)


class BtsCDRmanager
{
protected:
	
	XVOID AdjustHead(SBtsHead &sHead);
	// ���������ֽ���
	XVOID AdjustCldFld(SBtsChdFld &sChild);
	// ������Ϣ�ֽ���
	XVOID AdjustRecord(SBtsRecord &record);

	XVOID conver_i642_str(XS8* str_result,XS32 i64value);
	XS32 conver_byte8_i64(const XU8* byte8,XS32 lenth,std::string& result);
	XS8* TransferTime(const XS8 * inTime, const XS32 iLen, XS8 * outTime);
	XVOID convert_byte14_dateTimeStr(const  XS8* byte14,std::string& result);
	//////remarked by zbf at 20120528
	/*const XS8* UniteRecord(const SBtsRecord & record);*/
	const XS8* UniteRecord(const SBtsRecord & record ,XS8 *pArray, XS32 &arrayLen);

	XS32 LoadFixField(FILE * fp, SBtsRecord & obj);
	
public:
	BtsCDRmanager();
	~BtsCDRmanager();
	int ParseBtsCDR(char *FileName, char *sourceDir, char *desDir);
};
