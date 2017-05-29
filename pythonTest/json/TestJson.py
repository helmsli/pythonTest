#-*- coding: UTF-8 -*-  
import json
jsonStr = json.dumps(['foo', {'bar': ('baz', None, 1.0, 2)}])
print(jsonStr);
jsonObj = json.loads('["foo", {"bar":["baz", null, 1.0, 2]}]')
print(jsonObj);
