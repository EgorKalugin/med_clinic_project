from fastapi import APIRouter, Depends, HTTPException

from med_clinic_backend.models.models import Cabinet
from med_clinic_backend.web_app.dependencies.dependencies import get_repositories
from med_clinic_backend.web_app.repository import ApiRepositories


router = APIRouter(prefix="/cabinet", tags=["cabinet"])


@router.get("/", name="Cabinet:get", response_model=list[Cabinet])
async def get_cabinets(
    end_cursor: int = 0,
    amount: int = 10,
    repositories: ApiRepositories = Depends(get_repositories),
) -> list[Cabinet]:
    res = await repositories.main_postgres.get_all_cabinets_with_pagination(end_cursor, amount)
    if not res:
        raise HTTPException(status_code=404, detail="No cabinets found")
    return res


@router.get("/{cabinet_number}", name="Cabinet:get_by_number", response_model=Cabinet)
async def get_cabinet_by_number(
    cabinet_number: int,
    repositories: ApiRepositories = Depends(get_repositories),
) -> Cabinet:
    res = await repositories.main_postgres.get_cabinet_by_number(cabinet_number)
    if not res:
        raise HTTPException(status_code=404, detail="No cabinet found")
    return res


@router.post("/", name="Cabinet:create", response_model=str)
async def create_cabinet(
    cabinet: Cabinet,
    repositories: ApiRepositories = Depends(get_repositories),
) -> str:
    res = await repositories.main_postgres.create_cabinet(cabinet)
    return res
