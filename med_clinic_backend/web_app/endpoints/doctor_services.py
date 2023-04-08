from fastapi import APIRouter, Depends, HTTPException
from models.models import DoctorServiceWithId, DoctorServiceWithoutId
from web_app.dependencies.dependencies import get_repositories
from web_app.repository import ApiRepositories

router = APIRouter(prefix="/doctor_service", tags=["doctor_service"])


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
) -> str:
    res = await repositories.main_postgres.create_doctor_service(doctor_service)
    return res
