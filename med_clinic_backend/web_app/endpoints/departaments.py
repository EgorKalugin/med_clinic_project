from fastapi import APIRouter, Depends, HTTPException

from med_clinic_backend.models.models import Departament
from med_clinic_backend.web_app.dependencies.dependencies import get_repositories
from med_clinic_backend.web_app.repository import ApiRepositories

router = APIRouter(prefix="/departments", tags=["department"])


@router.get("/", name="Department:get", response_model=list[Departament])
async def get_departaments(
    end_cursor: int = 0,
    amount: int = 10,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_all_departaments_with_pagination(end_cursor, amount)
    if not res:
        raise HTTPException(status_code=404, detail="No departaments found")
    return res


@router.get("/{departament_id}", name="Department:get_by_id", response_model=Departament)
async def get_departament_by_id(
    departament_id: int,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_departament_by_id(departament_id)
    if not res:
        raise HTTPException(status_code=404, detail="No departament found")
    return res


@router.post("/", name="Department:create", response_model=str)
async def create_departament(
    departament: Departament,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.create_departament(departament)
    return res
