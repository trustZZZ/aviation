from fastapi import FastAPI
import uvicorn


from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.services.keycloak_client import KeycloakClient

from app.api.router import router as api_router
from app.pages.router import router as pages_router
from app.flights.router import router as flight_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    #Создаем и сохраняем shared httpx клиент
    http_client = httpx.AsyncClient()
    app.state.keycloak_client = KeycloakClient(http_client)

    #Подключаем роутеры и статику
    app.include_router(pages_router)
    app.include_router(api_router)
    app.include_router(flight_router)
    
    app.mount("/ui/src", StaticFiles(directory="app/ui/src"), name="src")
    app.mount("/ui/node_modules", StaticFiles(directory="app/ui/node_modules"), name="node_modules")

    yield

    #акрываем httpx клиент
    await http_client.aclose()

app = FastAPI(lifespan=lifespan)

@app.exception_handler(HTTPException)
async def auth_exception_handler(request: Request, exc: HTTPException):
    if exc.status_code == 401:
        return RedirectResponse(
            f"{settings.auth_url}"
            f"?client_id={settings.CLIENT_ID}"
            f"&response_type=code"
            f"&scope=openid"
            f"&redirect_uri={settings.redirect_uri}"
        )
    raise exc

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app="app.main:app", reload=True, port=8000, host="localhost")

