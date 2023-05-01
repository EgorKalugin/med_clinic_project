from fastapi import APIRouter, Depends, HTTPException, Response
from models.models import ServiceWithId
from web_app.dependencies.dependencies import get_repositories
from web_app.repository import ApiRepositories

router = APIRouter(prefix="/service", tags=["service"])


@router.get("/", name="Service:get", response_model=list[ServiceWithId])
async def get_service(
    end_cursor: int = 0,
    amount: int = 10,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_all_services_with_pagination(end_cursor, amount)
    if not res:
        raise HTTPException(status_code=404, detail="No services found")
    return res


@router.get("/{service_id}", name="Service:get_by_id", response_model=ServiceWithId)
async def get_service_by_id(
    service_id: int,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_service_by_id(service_id)
    if not res:
        raise HTTPException(status_code=404, detail="No service found")
    return res


@router.post("/", name="Service:create", response_model=str)
async def create_service(
    service: ServiceWithId,
    repositories: ApiRepositories = Depends(get_repositories),
) -> Response:
    try:
        await repositories.main_postgres.create_service(service)
        return Response(status_code=200)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{service_id}", name="Service:update", response_model=str)
async def update_service(
    service_id: int,
    service: ServiceWithId,
    repositories: ApiRepositories = Depends(get_repositories),
):
    if service_id != service.id:
        raise HTTPException(
            status_code=400, detail="Service id and service id in request body are not equal"
        )
    res = await repositories.main_postgres.update_service(service_id, service)
    return res
