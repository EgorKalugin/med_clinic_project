from fastapi import APIRouter, Depends, HTTPException
from models.models import DoctorWithID
from web_app.dependencies.dependencies import get_repositories
from web_app.repository import ApiRepositories

router = APIRouter(prefix="/doctor", tags=["doctor"])


@router.get("/", name="Doctor:get", response_model=list[DoctorWithID])
async def get_doctors(
    end_cursor: int = 0,
    amount: int = 10,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_all_doctors_with_pagination(end_cursor, amount)
    if not res:
        raise HTTPException(status_code=404, detail="No doctors found")
    return res


@router.get("/{doctor_id}", name="Doctor:get_by_id", response_model=DoctorWithID)
async def get_doctor_by_id(
    doctor_id: int,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_doctor_by_id(doctor_id)
    if not res:
        raise HTTPException(status_code=404, detail="No doctor found")
    return res


@router.post("/", name="Doctor:create", response_model=str)
async def create_doctor(
    doctor: DoctorWithID,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.create_doctor(doctor)
    return res


@router.put("/{doctor_id}", name="Doctor:update", response_model=str)
async def update_doctor(
    doctor_id: int,
    doctor: DoctorWithID,
    repositories: ApiRepositories = Depends(get_repositories),
):
    if doctor_id != doctor.id:
        raise HTTPException(status_code=400, detail="Doctor id in path and body are not equal")
    res = await repositories.main_postgres.update_doctor(doctor_id, doctor)
    return res
