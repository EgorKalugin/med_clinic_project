from datetime import date, time
import datetime
from decimal import Decimal
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class ScheduleStates(Enum):
    DONE = "done"
    CANCELLED = "cancelled"
    IN_PROGRESS = "in_progress"
    NOT_ARRIVED = "not_arrived"


class DoctorWithoutId(BaseModel):
    departament_id: int
    bio: Optional[str]
    first_name: str
    second_name: Optional[str]
    last_name: str
    date_of_birth: date


class DoctorWithId(DoctorWithoutId):
    id: int


class ServiceWithoutId(BaseModel):
    name: str
    description: Optional[str]
    price: Decimal
    default_duration: time


class ServiceWithId(ServiceWithoutId):
    id: int


class DepartamentWithoutId(BaseModel):
    name: str
    description: Optional[str]


class DepartamentWithId(DepartamentWithoutId):
    id: int


class DoctorServiceWithoutId(BaseModel):
    doctor_id: int
    service_id: int


class DoctorServiceWithId(DoctorServiceWithoutId):
    id: int


class ConsumerWithoutId(BaseModel):
    first_name: str
    second_name: Optional[str]
    last_name: str
    bio: Optional[str]
    date_of_birth: Optional[date]
    phone_number: Optional[str]
    email: Optional[str]
    individual_sale: Optional[Decimal]


class ConsumerWithId(ConsumerWithoutId):
    id: int


class Cabinet(BaseModel):
    number: int
    description: Optional[str]
    departament_id: Optional[int]


class AppointmentRecordWithoutId(BaseModel):
    """Сущность записи на прием"""

    consumer_id: int
    doctor_id: int
    service_id: int
    start_time: datetime.datetime
    end_time: datetime.datetime
    price: Decimal
    state: ScheduleStates
    cabinet_number: int


class AppointmentRecordWithId(AppointmentRecordWithoutId):
    id: int
