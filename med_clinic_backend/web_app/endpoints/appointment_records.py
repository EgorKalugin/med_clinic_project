from fastapi import APIRouter, Depends, HTTPException
from models.models import AppointmentRecord
from web_app.dependencies.dependencies import get_repositories
from web_app.repository import ApiRepositories

router = APIRouter(prefix="/appointment_record", tags=["appointment_record"])


@router.get("/", name="AppointmentRecord:get", response_model=list[AppointmentRecord])
async def get_appointment_record(
    end_cursor: int = 0,
    amount: int = 10,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_all_appointment_records_with_pagination(
        end_cursor, amount
    )
    if not res:
        raise HTTPException(status_code=404, detail="No appointment records found")
    return res


@router.get(
    "/by_consumer_id/{consumer_id}",
    name="AppointmentRecord:get_by_consumer_id",
    response_model=list[AppointmentRecord],
)
async def get_appointment_records_by_consumer_id(
    consumer_id: int,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_appointment_records_by_consumer_id(consumer_id)
    if not res:
        raise HTTPException(status_code=404, detail="No appointment records found")
    return res


@router.get(
    "/{appointment_id}",
    name="AppointmentRecord:get_by_id",
    response_model=AppointmentRecord,
)
async def get_appointment_record_by_id(
    appointment_id: int,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.get_appointment_record_by_id(appointment_id)
    if not res:
        raise HTTPException(status_code=404, detail="No appointment record found")
    return res


@router.post("/", name="AppointmentRecord:create", response_model=str)
async def create_appointment_record(
    appointment_record: AppointmentRecord,
    repositories: ApiRepositories = Depends(get_repositories),
):
    res = await repositories.main_postgres.create_appointment_record(appointment_record)
    return res


@router.put("/{appointment_id}", name="AppointmentRecord:update", response_model=str)
async def update_appointment_record(
    appointment_id: int,
    appointment_record: AppointmentRecord,
    repositories: ApiRepositories = Depends(get_repositories),
):
    if appointment_id != appointment_record.id:
        raise HTTPException(status_code=400, detail="Appointment id in url and body are different")
    return await repositories.main_postgres.update_appointment_record(
        appointment_id, appointment_record
    )
