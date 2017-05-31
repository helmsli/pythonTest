#-*- coding: UTF-8 -*- 
import xlrd
#支持中文显示
import uniout
from datetime import date,datetime

def IsMergeCol(colIndex,mergeCol):
	for(rlow,rhigh,clow,chigh) in mergeCol:
		if((colIndex >= clow and colIndex < chigh)):
			return [True,rlow,rhigh,clow,chigh];
		else:
			return [False];
			
def IsMergeRow(rowIndex,mergeRow):
	for(rlow,rhigh,clow,chigh) in mergeRow:
		if((rowIndex >= rlow and rowIndex < rhigh)):
			return [True,rlow,rhigh,clow,chigh];
		else:
			return [False];			

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
#define the row information for row
titleRowInfo=1;
title_data = sheet.row_values(titleRowInfo)
print "title inforamtion:",title_data

'''
get the merge inforaiton 
'''
mergeRow = [];
mergeCol = [];
for (rlow,rhigh,clow,chigh) in sheet.merged_cells:
	if((clow==0 and chigh==1)):
		mergeRow.append((rlow,rhigh,clow,chigh));
	if((rlow==1 and rhigh==2)):
		mergeCol.append((rlow,rhigh,clow,chigh));

print mergeRow,mergeCol
print sheet.merged_cells
#loop for mergeRow
#loop merge rows
for colRows in range(titleRowInfo+1,nrows):
	for(rlow,rhigh,clow,chigh) in mergeRow:
		#if the column in mergeCol
		for colIndex in range(0,ncols):
			isMergeCol = IsMergeCol(colIndex,mergeCol)
			#merge column 
			if(isMergeCol[0]):
				
			else:
			
			
		
			print isMergeCol