from pydantic import BaseModel
from datetime import datetime, date
    
class AddFlight(BaseModel):
   sid: str | None = None
   region: str | None = None
   add: date | None = None
   atd: datetime | None = None
   lat: str | None = None
   long: str | None = None