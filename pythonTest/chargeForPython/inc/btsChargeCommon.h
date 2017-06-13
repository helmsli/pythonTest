#pragma once
#include "publictype.h"
#pragma pack(push, 1)
#define MCWILL_DATA_ACCESS_WIRELESS 1  //无线
#define MCWILL_DATA_ACCESS_WIRE     2  //有线
typedef struct _BTSCfRecord
{
	XS32 accessMode;//上网方式
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


// 话单单条消息结构
typedef struct SBtsRecord
{
	XU16 usRrdLen;//长度2字节1-2
	XU16 usSheetType; //记录类型0普通1中间,2字节3-4
	XU32 uiSeqID;//话单序列号4字节5-8
	XU32 uiPID;//终端PID 4字节9-12
	XU32 uiUID;//终端UID 4字节13-16
	XU8 ucUserType;//用户类型1字节17
	XU32 uiHomeProv;//用户归属省4字节18-21
	XU32 uiRoamProv;//用户漫游省4字节22-25
	XU16 usAuthType;//认证类型2字节26-27	
	XU8 sStartTime[7];//起始时间7字节28-34 YYYYMMDDHHMISS
	XU8 sEndTime[7];//结束时间7字节35-41 YYYYMMDDHHMISS
	XU32   uiDuration;//持续时间(秒) 4字节42-45
	XU8 sDataFlowUp[8];//上行数据流量(字节数)8字节,46-53
	XU8 sDataFlowDown[8];//下行数据流量(字节数)8字节,54-61
	XU32   uiBtsID;//基站号4字节62-65		
	XU16 usCauseClose;//断线原因2字节66-67
	XU16 usULMAXBW;//68-69
	XU16 usULMINBW;//70-71
	XU16 usDLMAXBW;//72-73
	XU16 usDLMINBW;//74-75
	XU32 uiWiFiUID;//	WiFi UID	76-79	4
	XU32 uiWiFiIP;//	WiFi IP	80-83	4
	XU8 sWiFiMAC[6];//	WiFi MAC	84-89	6
	XU16 SegmentID;//实时计费子序号
	XU8 softWareType;//92预留终端软件类型
	XU16 hardWareType;//93-94预留终端硬件类型
	XU8 sHold[5];//保留字段95-99
	//XU8 sHold[8];//保留68-83
	SBtsRecord() {
		memset(this, 0, sizeof(SBtsRecord));
	}
} SBtsRecord;
#pragma pack(pop)
