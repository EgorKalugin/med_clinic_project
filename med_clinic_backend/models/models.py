from datetime import date, time
from decimal import Decimal
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class ScheduleStates(Enum):
    DONE = "done"
    CANCELLED = "cancelled"
    IN_PROGRESS = "in_progress"
    NOT_ARRIVED = "not_arrived"


class DoctorWithoutID(BaseModel):
    departament_id: int
    bio: Optional[str]
    first_name: str
    second_name: Optional[str]
    last_name: str
    date_of_birth: date


class DoctorWithID(DoctorWithoutID):
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


class ConsumerWithoutID(BaseModel):
    bio: Optional[str]
    date_of_birth: Optional[date]
    first_name: str
    second_name: Optional[str]
    last_name: str
    phone_number: Optional[str]
    email: Optional[str]
    individual_sale: Optional[Decimal]


class ConsumerWithId(ConsumerWithoutID):
    id: int


class Cabinet(BaseModel):
    number: int
    description: Optional[str]
    departament_id: Optional[int]


class AppointmentRecordWithoutID(BaseModel):
    """Сущность записи на прием"""

    consumer_id: int
    doctor_id: int
    service_id: int
    start_time: time
    end_time: time
    price: Decimal
    state: ScheduleStates
    cabinet_number: int


class AppointmentRecordWithID(AppointmentRecordWithoutID):
    id: int
