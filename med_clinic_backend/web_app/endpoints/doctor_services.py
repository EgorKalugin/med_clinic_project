from fastapi import APIRouter, Depends, HTTPException, Response
from models.models import DoctorServiceWithId, DoctorServiceWithoutId
from web_app.dependencies.dependencies import get_repositories
from web_app.repository import ApiRepositories

router = APIRouter(prefix="/doctor_service", tags=["doctor_service"])


@router.get("/", name="DoctorService:get_all", response_model=list[DoctorServiceWithId])
async def get_all_doctor_services(
    repositories: ApiRepositories = Depends(get_repositories),
) -> list[DoctorServiceWithId]:
    res = await repositories.main_postgres.get_all_doctor_services()
    if not res:
        raise HTTPException(status_code=404, detail="No doctor services found")
    return res


@router.get(
    "/by_doctor_id/{doctor_id}",
    name="DoctorService:get_by_doctor_id",
    response_model=list[DoctorServiceWithId],
)
async def get_doctor_services_by_doctor_id(
    doctor_id: int, repositories: ApiRepositories = Depends(get_repositories)
) -> list[DoctorServiceWithId]:
    res = await repositories.main_postgres.get_doctor_services_by_doctor_id(doctor_id)
    if not res:
        raise HTTPException(status_code=404, detail="No doctor services found")
    return res


@router.get("/{service_id}", name="DoctorService:get_by_id", response_model=DoctorServiceWithId)
async def get_doctor_service_by_id(
    service_id: int, repositories: ApiRepositories = Depends(get_repositories)
) -> DoctorServiceWithId:
    res = await repositories.main_postgres.get_doctor_service_by_service_id(service_id)
    if not res:
        raise HTTPException(status_code=404, detail="No doctor service found")
    return res


@router.post("/", name="DoctorService:create", response_model=str)
async def create_doctor_service(
    doctor_service: DoctorServiceWithoutId,
    repositories: ApiRepositories = Depends(get_repositories),
) -> Response:
    try:
        await repositories.main_postgres.create_doctor_service(doctor_service)
        return Response(status_code=200)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{doctor_service_id}", name="DoctorService:delete", response_model=str)
async def delete_doctor_service(
    doctor_service_id: int,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.delete_doctor_service_by_id(doctor_service_id)
    return res
