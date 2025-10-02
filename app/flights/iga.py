# # Import openpyxl
# import openpyxl
# import re
# from datetime import datetime, timezone, timedelta
# # Open the spreadsheet
# workbook = openpyxl.load_workbook("app/data/2025.xlsx")

# # Get the first sheet
# sheet = workbook.worksheets[0]

# SID_pattern = r"SID \d{10}"
# location_pattern = r"ADEPZ \d*[N,S]\d*[W,E]"
# ADD_pattern = r"ADD \d{6}"
# ATD_pattern = r"ATD \d{4}"
# date_format = r"%y%m%d"
# time_format = r"%H%M"
# k = 0

# for row in sheet:
#     if k == 10:
#         break
#     data = row[2].value

#     region = row[0].value
#     print(region)
#     # # поиск даты полета
#     # search = re.search(pattern=ADD_pattern, string=data)
#     # if search:
#     #     soure_date = re.search(pattern=r'\d{6}', string=search[0])[0]
#     #     date = datetime.strptime(soure_date, date_format).date()
#     #     print("date:", date)

#     # # # поиск SID
#     # # search = re.search(pattern=SID_pattern, string=data)
#     # # if search:
#     # #     sid = int(re.search(pattern=r'\d{10}', string=search[0])[0])
#     # #     print("SID:", sid)

#     # # поиск времени вылета
#     # search = re.search(pattern=ATD_pattern, string=data)
#     # if search:
#     #     soure_time = re.search(pattern=r'\d{4}', string=search[0])[0]
#     #     time = (datetime.strptime(soure_time, time_format)).time()
#     #     time = datetime.combine(date=date, time=time).astimezone(timezone(timedelta(hours=3)))
#     #     print("time:", time)

#     # # search = re.search(pattern=location_pattern, string=data)
#     # # if search:
#     # #     coord = re.findall(pattern=r"\d+", string=search[0])
#     # #     lat = coord[0]
#     # #     long = coord[1]
#     # #     print(lat, long)

#     # # print('*'*20)
#     # # print(data)
#     # # print('*'*23)
#     k+=1
# # print(re.search(pattern=pattern, string=text)[0])
import json
r = {'is_claimed': 'True', 'rating': 3.5}
r = json.dumps(r)
loaded_r = json.loads(r)
print(type(loaded_r))