from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.flights.schemas import AddFlight
from app.services.dao_dep import (
    get_session_with_commit,
    get_session_without_commit,
)
from app.flights.dao import FlightDAO
from app.config import settings
import openpyxl
import re
from datetime import time, date, datetime, timezone, timedelta

router = APIRouter(prefix="/geo", tags=["parse data"])


@router.post("/change_data")
async def get_data(sid: str, values: AddFlight, session: AsyncSession = Depends(get_session_with_commit)):
    flight_dao = FlightDAO(session=session)
    existing_flight = await flight_dao.find_one_or_none(AddFlight(**{"sid":sid}))
    if not existing_flight:
        raise HTTPException(status_code=404)
    
    await flight_dao.update(filters=AddFlight(**{"sid": sid}), values=values)
    return {"updated": existing_flight}


@router.post("/get_data_from_region")
async def get_data(region: str, session: AsyncSession = Depends(get_session_without_commit)):
    flight_dao = FlightDAO(session=session)
    data = await flight_dao.find_all(filters=AddFlight(**{"region": region}))
    return {"region_data": data}

@router.post("/get_flight")
async def get_data(sid: str, session: AsyncSession = Depends(get_session_without_commit)):
    flight_dao = FlightDAO(session=session)
    data = await flight_dao.find_one_or_none(filters=AddFlight(**{"sid": sid}))
    # response = JSONResponse(content=jsonable_encoder(data))
    return {"flight_data": data}


@router.post("/insert_data")
async def parse_data(session: AsyncSession = Depends(get_session_with_commit)):

    workbook = openpyxl.load_workbook("app/data/2025.xlsx")

    # Get the first sheet
    sheet = workbook.worksheets[0]

    SID_pattern = r"SID \d{10}"
    location_pattern = r"ADEPZ \d*[N,S]\d*[W,E]"
    ADD_pattern = r"ADD \d{6}"
    ATD_pattern = r"ATD \d{4}"
    date_format = r"%y%m%d"
    time_format = r"%H%M"

    date_of_dep: date = None
    time_of_dep: time = None
    sid: str = None
    lat: str = None
    long: str = None

    k = 0

    for row in sheet:

        data = row[2].value
        region = row[0].value
        # поиск даты полета
        search = re.search(pattern=ADD_pattern, string=data)
        if search:
            soure_date = re.search(pattern=r'\d{6}', string=search[0])[0]
            date_of_dep = datetime.strptime(soure_date, date_format).date()

        # поиск SID
        search = re.search(pattern=SID_pattern, string=data)
        if search:
            sid = re.search(pattern=r'\d{10}', string=search[0])[0]

        # поиск времени вылета
        search = re.search(pattern=ATD_pattern, string=data)
        if search:
            soure_time = re.search(pattern=r'\d{4}', string=search[0])[0]
            time_of_dep = (datetime.strptime(soure_time, time_format)).time()
            time_of_dep = datetime.combine(date=date_of_dep, time=time_of_dep).astimezone(timezone(timedelta(hours=3)))

        search = re.search(pattern=location_pattern, string=data)
        if search:
            coord = re.findall(pattern=r"\d+", string=search[0])
            lat = coord[0]
            long = coord[1]
        flights_dao = FlightDAO(session=session)

        if sid:
            existing_flight = await flights_dao.find_one_or_none(AddFlight(**{"sid":sid}))
            if not existing_flight:
                await flights_dao.add(values=AddFlight(**{"sid":sid, "lat": lat, "long": long, "add": date_of_dep, "atd": time_of_dep}))
            else:
                await flights_dao.update(filters=AddFlight(**{"sid":sid}), values=AddFlight(**{"region":region}))

        if k == 74837:
            break