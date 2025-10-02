
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class Users(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(primary_key=True, nullable=True)
    email: Mapped[str] = mapped_column(unique=True, nullable=True)
    email_verified: Mapped[bool] = mapped_column(nullable=True)
    name: Mapped[str] = mapped_column(nullable=True)
    preferred_username: Mapped[str] = mapped_column(nullable=True)
    given_name: Mapped[str] = mapped_column(nullable=True)
    family_name: Mapped[str] = mapped_column(nullable=True)