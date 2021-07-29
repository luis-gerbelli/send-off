import json
import pandas as pd
df = pd.read_excel('Send-off.xlsx', usecols="A:P")
df = df[(df.Action == 'Vender') & (df.Who != 'Anônimo')].reset_index(drop=True)
df.Action = 'Disponível'
df.loc[~df.Delivered.isnull(), 'Action'] = 'Entregue'
df.loc[(~df.Who.isnull()) & (df.Action != 'Entregue'), 'Action'] = 'Reservado'
df.drop(['Who','Delivered'], axis=1, inplace=True)
dict_json = df[['RoomCode', 'Room']].drop_duplicates().set_index('RoomCode').to_dict()['Room']
dict_json = {k: {'RoomName': v, 'Item': {}} for k, v in dict_json.items()}
df.drop('Room', axis=1, inplace=True)
df.set_index('RoomCode', inplace=True)
for index, row in df.iterrows():
    dict_json[index]['Item'][row.Code] = row.drop('Code').to_dict()
with open('send-off.json', 'w') as f:
    json.dump(dict_json, f)