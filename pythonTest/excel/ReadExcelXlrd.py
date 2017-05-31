#-*- coding: UTF-8 -*- 
import xlrd
#支持中文显示
import uniout
from datetime import date,datetime

xlsfile = r'/media/sf_vshare/python/pythonTest/excel/file/report.xls'
book = xlrd.open_workbook(xlsfile,formatting_info=True)     #获得excel的book对象 
sheet_name=book.sheet_names()[0]      
print sheet_name 
sheet=book.sheet_by_name(sheet_name)
print sheet
sheet0=book.sheet_by_index(0)
print sheet0
nrows = sheet.nrows
ncols = sheet.ncols
print nrows 
print ncols
'''
ctype : 0 empty,1 string, 2 number, 3 date, 4 boolean, 5 error
'''
for i in range(nrows):
	
	print "rownumber:",i,sheet.row_values(i)
	for j in range(ncols):
		#print "row:(",i,",",j,")","type is:",sheet.cell(i,j).ctype
		if (sheet.cell(i,j).ctype == 3):
			date_value = xlrd.xldate_as_tuple(sheet.cell_value(i,j),book.datemode)
			date_tmp = date(*date_value[:3]).strftime('%Y/%m/%d')
			print date_tmp
		if(sheet.cell(i,j).value ==  "项目名称".decode("utf8")):
			print "cell value*************************:",sheet.cell(i,j).value
		
	  
row_data = sheet.row_values(0)
print "row 0:"
print row_data

row_data = sheet.row_values(1)
print "row 1:"
print row_data
print "row 1 end "
col_data = sheet.col_values(0)
print col_data
cell_value1 = sheet.cell_value(0,1)
print cell_value1
'''
merged_cells返回的这四个参数的含义是：(row,row_range,col,col_range),其中[row,row_range)包括row,不包括row_range,
col也是一样，即(1, 3, 4, 5)的含义是：第1到2行（不包括3）合并，(7, 8, 2, 5)的含义是：第2到4列合并。
'''

got = sheet0.merged_cells
print got

testObj={}
testObj['got']=got;

#print testObj['got']

merge = []
for (rlow,rhigh,clow,chigh) in sheet.merged_cells:
	merge.append([rlow,clow])
	if((clow==0 and chigh==1)):
		print "row:",rlow,rhigh,clow,chigh
   
print merge
for index in merge:
	print sheet.cell_value(index[0],index[1])
