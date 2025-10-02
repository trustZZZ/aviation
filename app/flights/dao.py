from app.dao.base import BaseDAO
from app.flights.models import Flight


class FlightDAO(BaseDAO):
    model = Flight