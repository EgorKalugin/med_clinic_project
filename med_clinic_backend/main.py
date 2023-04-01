import logging
from typing import Callable

import uvicorn
from fastapi import FastAPI
from web_app.repository import ApiRepositories, ApiRepositoriesInitializer
from web_app.settings import settings

logger = logging.getLogger("main")


def create_start_app_handler(app: FastAPI) -> Callable:
    async def start_app() -> None:
        logger.info("Starting up application")
        initializer = ApiRepositoriesInitializer(settings)
        app.state.repository = await ApiRepositories.create(initializer)

    return start_app


def get_applictaion() -> FastAPI:
    application = FastAPI(title="Med clinic backend")

    app.add_event_handler("startup", create_start_app_handler(app))
    # application.include_router(router)
    return application


app = get_applictaion()

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, host="localhost", reload=True)
