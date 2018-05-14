#!/usr/bin/env python
#-*-coding:utf-8-*-
import requests
import json 
import sys
import locale
import os
import codecs
from loggerUtils import Logger
def _byteify(data, ignore_dicts = False):
    # if this is a unicode string, return its string representation
    if isinstance(data, unicode):
        return data.encode('utf-8')
    # if this is a list of values, return list of byteified values
    if isinstance(data, list):
        return [ _byteify(item, ignore_dicts=True) for item in data ]
    # if this is a dictionary, return dictionary of byteified keys and values
    # but only if we haven't already byteified it
    if isinstance(data, dict) and not ignore_dicts:
        return {
            _byteify(key, ignore_dicts=True): _byteify(value, ignore_dicts=True)
            for key, value in data.iteritems()
        }
    # if it's anything else, return it in its original form
    return data
def json_loads_byteified(json_text):
    return _byteify(
        json.loads(json_text, object_hook=_byteify),
        ignore_dicts=True
    )

'''
query the course Information 

Args:
	baseUrl : ipaddress or hostName
	courseId: courseId
Returns:
	courseInfo
'''
def queryCourseByCourseId(baseUrl,courseId):
	website = '%s/studentCourse/%s/queryCourse' % (baseUrl, courseId)
	print('******enter queryCourse uri:%s ******' % (baseUrl))

	r = requests.get(url=website)   #带参数的GET请求
	r.encoding = 'utf-8' #这里添加一行
	#r.encoding = 'GBK'
	#response = json.loads(r.text)
	response = json_loads_byteified(r.text)
	#response=r.json()
	print(r.text)
	print('*****************')
	print(type(response['responseInfo']['title']))
	print((response['responseInfo']['title'].decode('utf8')))
	
	print(json.dumps(response['responseInfo']).decode('utf8'))
	
	for key,value in response['responseInfo'].items():
		if isinstance(value,str):
			response[key]=value.decode('utf8')
			print(response[key])
	print(json.dumps(response['responseInfo']))
	print('******leave queryCourse uri:%s ******' % (baseUrl))
	return response

def publishCourseToHot(baseUrl,course):
	website = '%s/hotCourseSearch/saveCourse' % (baseUrl)
	print(website)

	r = requests.post(url=website,json=course)   #带参数的GET请求
	r.encoding = 'utf-8' #这里添加一行
	#r.encoding = 'GBK'
	#response = json.loads(r.text)
	response = json_loads_byteified(r.text)
	#response=r.json()
	print(r.text)	
	return response
def publishCourseToSearch(baseUrl,course):
	website = '%s/courseSearch/saveCourse' % (baseUrl)
	print(website)

	r = requests.post(url=website,json=course)   #带参数的GET请求
	r.encoding = 'utf-8' #这里添加一行
	#r.encoding = 'GBK'
	#response = json.loads(r.text)
	response = json_loads_byteified(r.text)
	#response=r.json()
	print(r.text)	
	return response
'''

isFree: 1 free 0 noFree 2 all
'''
def queryAllFreeCourse(baseUrl,keywords,isFree):
	website = '%s/courseSearch/search' % (baseUrl)
	log.debug('query Free course:' + website)
	searchRequest={'keyword':keywords,'isFree':isFree,'pageNum':1,'pageSize':100}
	log.debug(searchRequest)
	r = requests.post(url=website,json=searchRequest)   #带参数的GET请求
	r.encoding = 'utf-8' #这里添加一行
	#r.encoding = 'GBK'
	#response = json.loads(r.text)
	response = json_loads_byteified(r.text)
	#response=r.json()
	print(r.text)	
	log.debug(r.text)
	return response
def getGBK(chineseString):
	gbk_a = chineseString.decode('utf-8').encode('gbk')
	return (gbk_a.decode('gbk'))
def queryTeacherInfo(baseUrl,teacherUserId):
	website = '%s/userOrderDb/teacher/%s/queryOneOrder' % (baseUrl,teacherUserId)
	log.debug('query Free course:' + website)
	searchRequest={'category':'teacher','userId':teacherUserId,'orderId':teacherUserId,'createTime':'2017-12-30 00:00:00'}
	log.debug(searchRequest)
	r = requests.post(url=website,json=searchRequest)   #带参数的GET请求
	log.debug(r.text)
	r.encoding = 'utf-8' #这里添加一行
	response = json_loads_byteified(r.text)
	#response=r.text
	print(r.text)	
	log.debug(r.text)
	return response
def queryRecommTeacherInfo(baseUrl):
	website = '%s/userOrderDb/Recommteacher/000000/queryUserOrder' % (baseUrl)
	log.debug('query Free course:' + website)
	searchRequest={'category':'teacher','userId':'000000','orderId':teacherUserId,'createTime':'2017-12-30 00:00:00'}
	log.debug(searchRequest)
	r = requests.post(url=website,json=searchRequest)   #带参数的GET请求
	log.debug(r.text)
	r.encoding = 'utf-8' #这里添加一行
	response = json_loads_byteified(r.text)
	#response=r.text
	print(r.text)	
	log.debug(r.text)
	return response
def publishRecommTeacher(baseUrl,teacherInfo):
	website = '%s/userOrderDb/Recommteacher/000000/configUserOrder' % (baseUrl)
	log.debug('query Free course:' + website)
	userOrder={'category':'Recommteacher','userId':'000000','orderId':teacherInfo['userId'],'createTime':'2017-12-30 00:00:00'}
	userOrder['createTime']='2017-12-30 00:00:00'
	userOrder['orderData']=json.dumps(teacherInfo,ensure_ascii=False,indent=2)
	log.debug(userOrder)
	r = requests.post(url=website,json=userOrder)   #带参数的GET请求
	log.debug(r.text)
	r.encoding = 'utf-8' #这里添加一行
	response = json_loads_byteified(r.text)
	print(r.text)	
	log.debug(r.text)
	return response
reload(sys)
sys.setdefaultencoding('utf8')


	#创建日志记录对象
log = Logger('publishRecommTeacher.log');
log.debug(("start program ********************************************"));


serverUrl = 'http://www.chunzeacademy.com:8080'
teacherIdList=['110000000']
for teacherId in teacherIdList:
	r=queryTeacherInfo(serverUrl,'110000000')
	if r['retCode']==0:
		repsonseInfo=json.loads(r['responseInfo'])
		teacharInfo=json.loads(repsonseInfo['orderData'])
		pr=publishRecommTeacher(serverUrl,teacharInfo)
		log.debug(pr)
	else:
		log.debug('query teacherInfo error:'+teacherId)
	
	print('finished query teacher')

