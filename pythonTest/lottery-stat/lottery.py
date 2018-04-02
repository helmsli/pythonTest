import pandas as pd
data_csv = pd.read_csv('E:/Users/helmsli/python/20171214/temp201712141800.csv',names =['TELNO', 'PERIOD', 'DATETIME','PRODUCT','BUYCONTENT','PAYMONEY','ISWIN','TRANSID'],sep=',')
#print("data_csv:")
#print(data_csv)
#print(data_csv['PAYMONEY'])
payMoneyGroupByProduct = data_csv.groupby(['TELNO','PRODUCT'])['PAYMONEY'].sum()
payMoneyGroupByProduct.to_csv('E:/Users/helmsli/python/20171214/temp201712141800_result.csv')

payMoneyGroupByTelno = data_csv.groupby(['TELNO'])['PAYMONEY'].sum()
payMoneyGroupByTelno = payMoneyGroupByTelno.to_frame()
payMoneyGroupByTelno=payMoneyGroupByTelno.sort_values('PAYMONEY',ascending=True)
#['PAYMONEY'].sum()
#print("payMoneyGroupBy:")
print(payMoneyGroupByTelno)
#centers = np.sort(payMoneyGroupByTelno,order='3')

payMoneyGroupByTelno.to_csv('E:/Users/helmsli/python/20171214/temp201712141800_resultTelno.csv')