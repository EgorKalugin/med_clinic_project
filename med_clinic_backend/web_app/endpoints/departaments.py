from fastapi import APIRouter, Depends, HTTPException, Response
from models.models import DepartamentWithId, DepartamentWithoutId
from web_app.dependencies.dependencies import get_repositories
from web_app.repository import ApiRepositories

router = APIRouter(prefix="/departments", tags=["department"])


@router.get("/", name="Department:get", response_model=list[DepartamentWithId])
async def get_departaments(
    end_cursor: int = 0,
    amount: int = 10,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_all_departaments_with_pagination(end_cursor, amount)
    if not res:
        raise HTTPException(status_code=404, detail="No departaments found")
    return res


@router.get("/{departament_id}", name="Department:get_by_id", response_model=DepartamentWithId)
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
    departament: DepartamentWithoutId,
    repositories: ApiRepositories = Depends(get_repositories),
) -> Response:
    try:
        await repositories.main_postgres.create_departament(departament)
        return Response(status_code=200)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
