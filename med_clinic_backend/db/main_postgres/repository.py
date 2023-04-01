import logging
from typing import Optional

import asyncpg
from db.main_postgres.base import BasePostgresqlRepository
from med_clinic_backend.models.models import Cabinet, Departament, DoctorService, Service
from models.models import AppointmentRecord, Consumer, Doctor

logger = logging.getLogger("main")


class MainPgDatabaseRepository(BasePostgresqlRepository):
    # ===================================== AppointmentRecords =====================================
    async def get_all_appointments_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[AppointmentRecord]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM AppointmentRecords ORDER BY id LIMIT $1 OFFSET $2",
                amount,
                end_cursor,
            )
        if res:
            return [AppointmentRecord(**row) for row in res]

    async def get_appointment_records_by_consumer_id(
        self, consumer_id: int
    ) -> Optional[list[AppointmentRecord]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM AppointmentRecords WHERE consumer_id = $1", consumer_id
            )
        if res:
            return [AppointmentRecord(**row) for row in res]

    async def get_appointment_record_by_id(
        self, appointment_id: int
    ) -> Optional[AppointmentRecord]:
        async with self._connection.acquire() as con:
            res = await con.fetchrow(
                "SELECT * FROM AppointmentRecords WHERE id = $1", appointment_id
            )
        if res:
            return AppointmentRecord(**res)

    async def add_new_appointment_record(self, appointment: AppointmentRecord) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """INSERT INTO AppointmentRecords
                    (consumer_id, doctor_id, service_id, start_time, end_time, price, state,
                    cabinet_number)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8)
                """,
                appointment.consumer_id,
                appointment.doctor_id,
                appointment.service_id,
                appointment.start_time,
                appointment.end_time,
                appointment.price,
                appointment.state,
                appointment.cabinet_number,
            )

    # ======================================== Consumers ===========================================
    async def get_all_consumers_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[Consumer]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM Consumers ORDER BY id LIMIT $1 OFFSET $2", amount, end_cursor
            )
        if res:
            return [Consumer(**row) for row in res]

    async def get_consumer_by_id(self, consumer_id: int) -> Optional[Consumer]:
        async with self._connection.acquire() as con:
            res = await con.fetchrow("SELECT * FROM Consumers WHERE id = $1", consumer_id)
        if res:
            return Consumer(**res)

    async def add_new_consumer(self, consumer: Consumer) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """INSERT INTO Consumers
                    (bio, date_of_birth, firts_name, second_name, last_name,
                    phone_number, email, individual_sale)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8)
                """,
                consumer.bio,
                consumer.date_of_birth,
                consumer.firts_name,
                consumer.second_name,
                consumer.last_name,
                consumer.phone_number,
                consumer.email,
                consumer.individual_sale,
            )

    # ===================================== Doctors =====================================
    async def get_all_doctors_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[Doctor]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM Doctors ORDER BY id LIMIT $1 OFFSET $2", amount, end_cursor
            )
        if res:
            return [Doctor(**row) for row in res]

    async def get_doctor_by_id(self, doctor_id: int) -> Optional[Doctor]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow("SELECT * FROM Doctors WHERE id = $1", doctor_id)
        if res:
            return Doctor(**res)

    async def add_new_doctor(self, doctor: Doctor) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """INSERT INTO Doctors
                    (departament_id, bio, firts_name, second_name, last_name,
                    date_of_birth)
                VALUES
                    ($1, $2, $3, $4, $5, $6)
                """,
                doctor.departament_id,
                doctor.bio,
                doctor.firts_name,
                doctor.second_name,
                doctor.last_name,
                doctor.date_of_birth,
            )

    # ===================================== Services =====================================
    async def get_all_services_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[Service]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM Services ORDER BY id LIMIT $1 OFFSET $2", amount, end_cursor
            )
        if res:
            return [Service(**row) for row in res]

    async def get_service_by_id(self, service_id: int) -> Optional[Service]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow("SELECT * FROM Services WHERE id = $1", service_id)
        if res:
            return Service(**res)

    async def add_new_service(self, service: Service) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """INSERT INTO Services
                    (name, price, description, default_duration)
                VALUES
                    ($1, $2, $3, $4)
                """,
                service.name,
                service.price,
                service.description,
                service.default_duration,
            )

    # ===================================== Departaments =====================================
    async def get_all_departaments_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[Departament]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM Departaments ORDER BY id LIMIT $1 OFFSET $2", amount, end_cursor
            )
        if res:
            return [Departament(**row) for row in res]

    async def add_new_departament(self, departament: Departament) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """INSERT INTO Departaments
                    (name, description)
                VALUES
                    ($1, $2)
                """,
                departament.name,
                departament.description,
            )

    # ===================================== DoctorService =====================================
    async def get_doctor_services_by_doctor_id(
        self, doctor_id: int
    ) -> Optional[list[DoctorService]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch("SELECT * FROM DoctorServices WHERE doctor_id = $1", doctor_id)
        if res:
            return [DoctorService(**row) for row in res]

    async def get_doctor_service_by_service_id(
        self, service_id: int
    ) -> Optional[DoctorService]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow("SELECT * FROM DoctorServices WHERE service_id = $1", service_id)
        if res:
            return DoctorService(**res)

    async def add_new_doctor_service(self, doctor_service: DoctorService) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """INSERT INTO DoctorServices
                    (doctor_id, service_id)
                VALUES
                    ($1, $2)
                """,
                doctor_service.doctor_id,
                doctor_service.service_id,
            )

    # =========================================== Cabinet ==========================================
    async def get_cabinets_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[Cabinet]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM Cabinets ORDER BY id LIMIT $1 OFFSET $2", amount, end_cursor
            )
        if res:
            return [Cabinet(**row) for row in res]

    async def get_cabinet_by_number(self, number: int) -> Optional[Cabinet]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow("SELECT * FROM Cabinets WHERE number = $1", number)
        if res:
            return Cabinet(**res)

    async def add_new_cabinet(self, cabinet: Cabinet) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """INSERT INTO Cabinets
                    (number, description)
                VALUES
                    ($1, $2)
                """,
                cabinet.number,
                cabinet.description,
            )
