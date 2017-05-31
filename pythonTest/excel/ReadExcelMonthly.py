#-*- coding: UTF-8 -*- 
import xlrd
#支持中文显示
import uniout
from datetime import date,datetime

def IsMergeCol(colIndex,mergeCol):
	for(rlow,rhigh,clow,chigh) in mergeCol:
		
		if((colIndex >= clow and colIndex < chigh)):
			print "(((((((((((((((((((((((((((((((((((((((((("
			return [True,rlow,rhigh,clow,chigh];
			
		
	return [False];
			
def IsMergeRow(rowIndex,colIndex,mergeRow):
	for(rlow,rhigh,clow,chigh) in mergeRow:
		if((rowIndex >= rlow and rowIndex < rhigh) and (colIndex>=clow and colIndex< chigh)):
			return [True,rlow,rhigh,clow,chigh];
	return [False];			
def getSingleCellValue(colRows,colIndex):
	return ["single",colRows,colIndex,sheet.cell_value(colRows,colIndex)]
def getMergeCellValue(sRow,eRow,sCol,eCol):
	tableData = []
	for sRowIndex in range(sRow,eRow):
		rowData=[]
		for sColIndex in range(sCol,eCol):
			if (sheet.cell(sRowIndex,sColIndex).ctype == 3):
				date_value = xlrd.xldate_as_tuple(sheet.cell_value(sRowIndex,sColIndex),book.datemode)
				date_tmp = date(*date_value[:3]).strftime('%Y/%m/%d')
				rowData.append(date_tmp)
			else:
				rowData.append(sheet.cell_value(sRowIndex,sColIndex))
		tableData.append(rowData);
	return ["list",colRows,colIndex,tableData]

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
#loop for row
sheet_data = {}
sheet_data["header"]=title_data;
sheet_data["data"]=[];
colRows = titleRowInfo+1
while(colRows<nrows):
#for colRows in range(titleRowInfo+1,nrows):
   #loop column for the row of 0 column
	isMergeRow = IsMergeRow(colRows,0,mergeRow)
	mergeStartRow = colRows
	mergeEndRow = colRows
	row_data=[]
	#get the merge information
	if(isMergeRow[0]):
		mergeStartRow=isMergeRow[1];
		mergeEndRow=isMergeRow[2];
	else:
		colRows=colRows+1
		continue
	print "mergeEndRow",colRows,mergeEndRow,nrows
	colIndex=0;
	while(colIndex<ncols):
	#for colIndex in range(0,ncols):
		#get the merge row,if merge read
		isMergeRow = IsMergeRow(colRows,colIndex,sheet.merged_cells)
		print "ismergeRow:",colRows,colIndex,isMergeRow
		if(isMergeRow[0]):
			row_data.append(getSingleCellValue(colRows,colIndex));
			colIndex=colIndex+1
		#no row merge ,only column merge
		else:
			#if the col is the merge column
			isMergeCol = IsMergeCol(colIndex,mergeCol)
			#merge columns 
			mergeStartCol = colIndex
			mergeEndCol = colIndex
			if(isMergeCol[0]):
				mergeStartCol=isMergeCol[3];
				mergeEndCol=isMergeCol[4]
				print "mergeEndCol:",mergeStartRow,mergeEndRow,mergeStartCol,mergeEndCol
			row_data.append(getMergeCellValue(mergeStartRow,mergeEndRow,mergeStartCol,mergeEndCol));
			colIndex = mergeEndCol
		print "colindex:",colIndex
		
	colRows=mergeEndRow
	print row_data
	sheet_data["data"].append(row_data)
print sheet_data
