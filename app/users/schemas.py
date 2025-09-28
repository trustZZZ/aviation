from pydantic import BaseModel


class SUserID(BaseModel):
    user_id: str

    
class AddUser(BaseModel):
    id: str
    email: str
    email_verified: bool
    name: str
    preferred_username: str
    given_name: str
    family_name: str