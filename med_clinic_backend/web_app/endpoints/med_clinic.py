from fastapi import APIRouter, Depends, HTTPException
from models.models import AppointmentRecord
from web_app.dependencies.dependencies import get_repositories
from web_app.repository import ApiRepositories

router = APIRouter(prefix="/med_clinic", tags=["med_clinic"])


@router.get(
    "/appointment_record", name="AppointmentRecord:get", response_model=list[AppointmentRecord]
)
async def get_appointment_record(
    repositories: ApiRepositories = Depends(get_repositories),
    *,
    end_cursor: int = 0,
    amount: int = 10,
):
    res = await repositories.main_postgres.get_all_appointments_with_pagination(end_cursor, amount)
    if not res:
        raise HTTPException(status_code=404, detail="No appointment records found")
    return res
