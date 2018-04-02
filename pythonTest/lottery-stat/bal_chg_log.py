import pandas as pd
data_csv = pd.read_csv('E:\\Users\\helmsli\\python\\cootel\\20180108\\20180108_balance_chg_log.csv',names =['subs_id', 'acc_id', 'acc_balance_item_id','bill_item_id','session_id','beforechgamt','chgamt','afterchgamt','chgtime'],sep=',')
#print("data_csv:") subs_id+acct_id+acct_balance_item_id+bill_item_id+session_id+beforechgamt+chgamt+afterchgamt+chgtime
#print(data_csv)
#print(data_csv['PAYMONEY'])

data_chg_plus_data = data_csv[data_csv['chgamt']<0]
sum_plus_today=data_chg_plus_data['chgamt'].sum()
data_chg_reduce_data = data_csv[data_csv['chgamt']>0]

#print(data_chg_plus_data)
print('***************************')
#print(sum_plus_today)

accountGrouped=data_chg_reduce_data.groupby(['acc_id'])['chgamt'].sum()
userIdGrouped=data_chg_reduce_data.groupby(['subs_id','acc_id'])['chgamt'].sum()


userBillDetail=data_csv.sort_values(['subs_id','chgtime'],ascending=[True,True])

#print(userBillDetail);
userBillDetail.to_csv('E:/Users/helmsli/python/20171214/temp201712141800_result1.csv')
userIdGrouped.to_csv('E:/Users/helmsli/python/20171214/temp201712141800_result2.csv')


#print(userIdGrouped);
