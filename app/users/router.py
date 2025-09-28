from fastapi import APIRouter, HTTPException, status, Response, Depends

from app.users.dependencies import get_current_user
from app.users.auth import get_password_hash, authenticate_user, create_access_token
from app.users.dao import UsersDAO
from app.users.schemas import SUserID
from app.users.models import Users
from pydantic import BaseModel
from urllib.parse import urlencode
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession
from app.users.schemas import AddUser, SUserID
from app.config import settings
from app.users.dao import UsersDAO
from app.services.auth_dep import get_current_user, get_keycloak_client
from app.services.dao_dep import (
    get_session_with_commit,
    get_session_without_commit,
)
from app.services.keycloak_client import KeycloakClient


router = APIRouter(prefix="/api", tags=["API"])

router = APIRouter(
    prefix="/auth",
    tags=["Auth & Пользователи"],
)

@router.post("/register")
async def register_user(user_data: AddUser):
    existing_user = await UsersDAO.find_one_or_none_by_id(data_id=user_data.id)
    if existing_user:
        raise HTTPException(status_code=500)
    
    await UsersDAO.add(id=user_data.id,
email=user_data.email,
email_verified=user_data.email_verified,
name=user_data.name,
preferred_username=user_data.preferred_username,
given_name=user_data.given_name,
family_name=user_data.family_name)
