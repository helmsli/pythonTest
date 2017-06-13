#pragma once
#include "publictype.h"
#pragma pack(push, 1)
#define MCWILL_DATA_ACCESS_WIRELESS 1  //����
#define MCWILL_DATA_ACCESS_WIRE     2  //����
typedef struct _BTSCfRecord
{
	XS32 accessMode;//������ʽ
}BtsRfRecord;

typedef struct SDateTime
{
	XS32 lYear;
	XS32 lMonth;
	XS32 lDay;
	XS32 lHour;
	XS32 lMinute;
	XS32 lSecond;
	void print(XS8* data_time)
	{
		sprintf(data_time,"%04d-%02d-%02d %02d:%02d:%02d", lYear, lMonth, lDay, lHour, lMinute, lSecond);
	}
	void printRfTime(XS8* data_time)
	{
		sprintf(data_time,"%04d%02d%02d%02d%02d%02d", lYear, lMonth, lDay, lHour, lMinute, lSecond);
	}
	SDateTime()
	{
		memset(this,0,sizeof(SDateTime));
	}
	
} SDateTime;


// ����������Ϣ�ṹ
typedef struct SBtsRecord
{
	XU16 usRrdLen;//����2�ֽ�1-2
	XU16 usSheetType; //��¼����0��ͨ1�м�,2�ֽ�3-4
	XU32 uiSeqID;//�������к�4�ֽ�5-8
	XU32 uiPID;//�ն�PID 4�ֽ�9-12
	XU32 uiUID;//�ն�UID 4�ֽ�13-16
	XU8 ucUserType;//�û�����1�ֽ�17
	XU32 uiHomeProv;//�û�����ʡ4�ֽ�18-21
	XU32 uiRoamProv;//�û�����ʡ4�ֽ�22-25
	XU16 usAuthType;//��֤����2�ֽ�26-27	
	XU8 sStartTime[7];//��ʼʱ��7�ֽ�28-34 YYYYMMDDHHMISS
	XU8 sEndTime[7];//����ʱ��7�ֽ�35-41 YYYYMMDDHHMISS
	XU32   uiDuration;//����ʱ��(��) 4�ֽ�42-45
	XU8 sDataFlowUp[8];//������������(�ֽ���)8�ֽ�,46-53
	XU8 sDataFlowDown[8];//������������(�ֽ���)8�ֽ�,54-61
	XU32   uiBtsID;//��վ��4�ֽ�62-65		
	XU16 usCauseClose;//����ԭ��2�ֽ�66-67
	XU16 usULMAXBW;//68-69
	XU16 usULMINBW;//70-71
	XU16 usDLMAXBW;//72-73
	XU16 usDLMINBW;//74-75
	XU32 uiWiFiUID;//	WiFi UID	76-79	4
	XU32 uiWiFiIP;//	WiFi IP	80-83	4
	XU8 sWiFiMAC[6];//	WiFi MAC	84-89	6
	XU16 SegmentID;//ʵʱ�Ʒ������
	XU8 softWareType;//92Ԥ���ն��������
	XU16 hardWareType;//93-94Ԥ���ն�Ӳ������
	XU8 sHold[5];//�����ֶ�95-99
	//XU8 sHold[8];//����68-83
	SBtsRecord() {
		memset(this, 0, sizeof(SBtsRecord));
	}
} SBtsRecord;
#pragma pack(pop)
