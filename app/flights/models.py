from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Time
from app.database import Base
from datetime import date, time

class Flight(Base):
    __tablename__ = "flights"
    sid: Mapped[str] = mapped_column(primary_key=True, nullable=True, unique=True)
    region: Mapped[str] = mapped_column(nullable=True)
    add: Mapped[date] = mapped_column(nullable=True)
    atd: Mapped[time] = mapped_column(Time(timezone=False), nullable=True)
    lat: Mapped[str] = mapped_column(nullable=True)
    long: Mapped[str] = mapped_column(nullable=True)