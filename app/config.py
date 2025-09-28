from dotenv import load_dotenv
from pydantic import ConfigDict
from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    DB_HOST: str | None = None
    DB_PORT: int | None = None
    DB_USER: str | None = None
    DB_PASS: str | None = None
    DB_NAME: str | None = None

    URL: str | None = None
    SECRET_KEY: str | None = None
    ALGORYTHM: str | None = None

    KEYCLOAK_BASE_URL: str
    BASE_URL: str
    REALM: str
    CLIENT_ID: str
    CLIENT_SECRET: str
    BASE_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    @property
    def database_url(self) -> str:
        return f"sqlite+aiosqlite:///{self.BASE_DIR}/data/db.sqlite3"

    @property
    def token_url(self) -> str:
        return f"{self.KEYCLOAK_BASE_URL}/realms/{self.REALM}/protocol/openid-connect/token"

    @property
    def auth_url(self) -> str:
        return (
            f"{self.KEYCLOAK_BASE_URL}/realms/{self.REALM}/protocol/openid-connect/auth"
        )

    @property
    def logout_url(self) -> str:
        return f"{self.KEYCLOAK_BASE_URL}/realms/{self.REALM}/protocol/openid-connect/logout"

    @property
    def userinfo_url(self) -> str:
        return f"{self.KEYCLOAK_BASE_URL}/realms/{self.REALM}/protocol/openid-connect/userinfo"

    @property
    def redirect_uri(self) -> str:
        return f"{self.BASE_URL}/api/login/callback"

    model_config = ConfigDict(env_file=f"{BASE_DIR}/.env", extra='allow')

settings = Settings()

print(settings.ALGORYTHM)