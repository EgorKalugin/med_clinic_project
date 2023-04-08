from fastapi import APIRouter, Depends, HTTPException
from models.models import Consumer
from web_app.dependencies.dependencies import get_repositories
from web_app.repository import ApiRepositories

router = APIRouter(prefix="/consumer", tags=["consumer"])


@router.get("/", name="Consumer:get", response_model=list[Consumer])
async def get_consumers(
    end_cursor: int = 0,
    amount: int = 10,
    repositiries: ApiRepositories = Depends(get_repositories),
):
    res = await repositiries.main_postgres.get_all_consumers_with_pagination(end_cursor, amount)
    if not res:
        raise HTTPException(status_code=404, detail="No consumers found")
    return res


@router.get("/{consumer_id}", name="Consumer:get_by_id", response_model=Consumer)
async def get_consumer_by_id(
    consumer_id: int,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_consumer_by_id(consumer_id)
    if not res:
        raise HTTPException(status_code=404, detail="No consumer found")
    return res


@router.post("/", name="Consumer:create", response_model=str)
async def create_consumer(
    consumer: Consumer,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.create_consumer(consumer)
    return res


@router.put("/{consumer_id}", name="Consumer:update", response_model=str)
async def update_consumer(
    consumer_id: int,
    consumer: Consumer,
    repositories: ApiRepositories = Depends(get_repositories),
):
    if consumer_id != consumer.id:
        raise HTTPException(status_code=400, detail="Consumer id in url and body are different")
    res = await repositories.main_postgres.update_consumer(consumer_id, consumer)
    return res
