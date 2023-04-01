import uvicorn
from fastapi import FastAPI

# from endpoints import ...


def get_applictaion() -> FastAPI:
    application = FastAPI(title="Test task") #TODO: CHANGE TITLE
    # application.include_router(router)
    return application


app = get_applictaion()

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, host="localhost", reload=True)
