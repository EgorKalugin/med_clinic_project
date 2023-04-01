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


class Doctor(BaseModel):
    id: int
    departament_id: int
    bio: Optional[str]
    firts_name: str
    second_name: Optional[str]
    last_name: str
    date_of_birth: date


class Service(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: Decimal
    default_duration: time


class Departament(BaseModel):
    id: int
    name: str
    description: Optional[str]


class DoctorService(BaseModel):
    id: int
    doctor_id: int
    service_id: int


class Consumer(BaseModel):
    id: int
    bio: Optional[str]
    date_of_birth: Optional[date]
    firts_name: str
    second_name: Optional[str]
    last_name: str
    phone_number: Optional[str]
    email: Optional[str]
    individual_sale: Optional[Decimal]


class Cabinet(BaseModel):
    number: int
    description: Optional[str]
    departament_id: Optional[int]


class AppointmentRecord(BaseModel):
    """Сущность записи на прием"""
    id: int
    consumer_id: int
    doctor_id: int
    service_id: int
    start_time: time
    end_time: time
    price: Decimal
    state: ScheduleStates
    cabinet_number: int
