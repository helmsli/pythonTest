
#pragma once

//define ����
typedef unsigned char       XU8; 
typedef char                XS8;
typedef unsigned short 	    XU16;
typedef short 			    XS16;
typedef unsigned int 		XU32;
typedef int 				XS32;
typedef unsigned long long	XU64;
typedef long long			XS64;
typedef void                XVOID;
typedef bool                XBOOL;
typedef float 				XF32;
typedef double 				XD64;

/*define time type*/
typedef unsigned int XW_LONG_TIME_T;

#ifndef XBOOLVALUE
typedef enum
{
    XFALSE=0,
    XTRUE  
}XBOOLVALUE;
#endif

#ifndef XCONST
	#define XCONST  const
	#define XSTATIC static
	#define XEXTERN extern
#endif 
#ifndef XPUBLIC
	#define XPUBLIC
#endif



#ifndef XNULL
	#define XNULL				(0)
#endif


#ifndef NULL
	#define NULL				(0)
#endif

/* �ַ��ıȽ�*/
#define XOS_StrCmp(s1, s2)	strcmp((char *)s1,(char *)s2)   /*#���ᳫʹ��*/
#define XOS_StrNcmp(s1,s2,n)		strncmp((char *)s1,(char *)s2,(size_t)(n))

/* �ַ��Ŀ���*/
#define XOS_StrCpy(dest,src)    strcpy((char *)dest , (char *)src)   /*#���ᳫʹ��*/
#define XOS_StrNcpy(dest, src,n )    strncpy((char *)dest,(char *)src,(size_t)(n) )

/*�ַ�������*/
#define XOS_StrCat(dest, src)   strcat((char *)dest, (XCONST XCHAR *)src)   /*#���ᳫʹ��*/
#define XOS_StrNCat(dest,src,n) strncat((XCHAR *)dest, (XCONST XCHAR *)src,(size_t)(n))

/* ȡ�ַ�����*/
#define XOS_StrLen(s)	strlen((char *)s)


/* �ַ��Ĳ���*/
#define XOS_StrChr(s, c)	strchr((char *)s,(int)(c))
#define XOS_StrStr(haystack,needle)	strstr((char *)haystack,(char *)needle)

/* �ڴ�Ŀ�������ֵ*/
#define XOS_MemCpy(dest,src,n)	memcpy(dest,src,n)
#define XOS_MemMove(dest,src,n)  memmove(dest,src,n)
#define XOS_MemSet(dest,src,n)	memset(dest,src,n)
#define XOS_MemCmp(dest,src,n)  memcmp(dest,src,n)

/* �ַ���Сдת��*/
#define XOS_ToLower( c )    tolower( c )
#define XOS_ToUpper( c )    toupper( c )

/* �ֽ���ת��*/
/* 2 �ֽ�������ת������*/
#define XOS_NtoHs(netshort)	ntohs((unsigned short int)(netshort))    

/* 2 �ֽ�������ת������*/
#define XOS_HtoNs(hostshort)	htons((unsigned short int)(hostshort))    

/* 4 �ֽ�������ת����*/
#define XOS_NtoHl(netlong)	ntohl((unsigned long int)(netlong))    

/* 4 �ֽ�������ת������*/
#define XOS_HtoNl(hostlong)	htonl((unsigned long int)(hostlong))    

/* ȡ�����Сֵ*/
#define XOS_MAX(x,y) ((x)>=(y)?(x):(y))
#define XOS_MIN(x,y) ((x)>=(y)?(y):(x))


//����sql������󳤶�
#define MAX_SQL_LENGTH 2048
 
const XU32 MAX_TCP_BUFFER_SIZE = 4096;

#define MAX_LOG_LENGTH 1024

