#!/usr/bin/env python
#-*-coding:utf-8-*-
import requests
import json 
import sys
import locale
import os
import codecs
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
def queryCourse(baseUrl,courseId):
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


	
'''
to publish the new course to elasticsearch
'''

reload(sys)
sys.setdefaultencoding('utf8')
'''
print sys.stdout.encoding + " - sys.stdout.encoding:"
sys.stdout = codecs.getwriter('utf8')(sys.stdout) 
print sys.stdout.encoding + " - sys.stdout.encoding:"
'''
#define the request parameters for rest request
payload = {'keyword':'真好','pageNum':1,'pageSize':100}
print(json.dumps(['foo', {'bar': ('baz', None, 1.0, 2)}]))


r = requests.post(url='http://www.chunzeacademy.com:8080/newCourseSearch/search', json=payload)   #带参数的GET请求
print(r.text)
print('hotcourse ')
payload={'userid':'','keyword':'','pageNum':1,'pageSize':100}
r = requests.post(url='http://www.chunzeacademy.com:8080/hotCourseSearch/search', json=payload)   #带参数的GET请求

print('query course :' + r.text)
#print(json.dumps(r))

r=queryCourse('http://www.chunzeacademy.com:8080','10001030001')
if r['retCode']==0:
	print('get course success')
	publishCourseToHot('http://www.chunzeacademy.com:8080',r['responseInfo'])



#配置文件，20各个新课程，
#从课程中心读取课程
#将这些课程的权重提高，更新搜索引擎，更新JS模版；

'''
r = requests.get(url='http://www.itwhy.org')    # 最基本的GET请求
print(r.status_code)    # 获取返回状态
r = requests.get(url='http://dict.baidu.com/s', params={'wd':'python'})   #带参数的GET请求
print(r.url)
print(r.text)   #打印解码后的返回数据
'''