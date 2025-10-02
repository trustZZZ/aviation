from pydantic import BaseModel


class SUserID(BaseModel):
    user_id: str

    
class AddUser(BaseModel):
    id: str | None = None
    email: str | None = None
    email_verified: bool | None = None
    name: str | None = None
    preferred_username: str | None = None
    given_name: str | None = None
    family_name: str | None = None