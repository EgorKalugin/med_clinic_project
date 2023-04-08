import logging
from typing import Optional

import asyncpg
from db.main_postgres.base import BasePostgresqlRepository
from models.models import (
    AppointmentRecordWithId,
    AppointmentRecordWithoutId,
    Cabinet,
    ConsumerWithId,
    ConsumerWithoutId,
    DepartamentWithId,
    DepartamentWithoutId,
    DoctorServiceWithId,
    DoctorServiceWithoutId,
    DoctorWithId,
    DoctorWithoutId,
    ServiceWithId,
)

logger = logging.getLogger("main")


class MainPgDatabaseRepository(BasePostgresqlRepository):
    # ===================================== AppointmentRecords =====================================
    async def get_all_appointment_records_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[AppointmentRecordWithId]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM AppointmentRecords ORDER BY id LIMIT $1 OFFSET $2",
                amount,
                end_cursor,
            )
        if res:
            return [AppointmentRecordWithId(**row) for row in res]

    async def get_appointment_records_by_consumer_id(
        self, consumer_id: int
    ) -> Optional[list[AppointmentRecordWithId]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM AppointmentRecords WHERE consumer_id = $1", consumer_id
            )
        if res:
            return [AppointmentRecordWithId(**row) for row in res]

    async def get_appointment_record_by_id(
        self, appointment_id: int
    ) -> Optional[AppointmentRecordWithId]:
        async with self._connection.acquire() as con:
            res = await con.fetchrow(
                "SELECT * FROM AppointmentRecords WHERE id = $1", appointment_id
            )
        if res:
            return AppointmentRecordWithId(**res)

    async def create_appointment_record(self, appointment: AppointmentRecordWithoutId) -> str:
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

    async def update_appointment_record(
        self, appointment_id: int, appointment: AppointmentRecordWithId
    ) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """UPDATE AppointmentRecords
                SET
                    consumer_id = $1,
                    doctor_id = $2,
                    service_id = $3,
                    start_time = $4,
                    end_time = $5,
                    price = $6,
                    state = $7,
                    cabinet_number = $8
                WHERE id = $9
                """,
                appointment.consumer_id,
                appointment.doctor_id,
                appointment.service_id,
                appointment.start_time,
                appointment.end_time,
                appointment.price,
                appointment.state,
                appointment.cabinet_number,
                appointment_id,
            )

    # ======================================== Consumers ===========================================
    async def get_all_consumers_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[ConsumerWithId]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM Consumers ORDER BY id LIMIT $1 OFFSET $2", amount, end_cursor
            )
        if res:
            return [ConsumerWithId(**row) for row in res]

    async def get_consumer_by_id(self, consumer_id: int) -> Optional[ConsumerWithId]:
        async with self._connection.acquire() as con:
            res = await con.fetchrow("SELECT * FROM Consumers WHERE id = $1", consumer_id)
        if res:
            return ConsumerWithId(**res)

    async def create_consumer(self, consumer: ConsumerWithoutId) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """INSERT INTO Consumers
                    (bio, date_of_birth, first_name, second_name, last_name,
                    phone_number, email, individual_sale)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8)
                """,
                consumer.bio,
                consumer.date_of_birth,
                consumer.first_name,
                consumer.second_name,
                consumer.last_name,
                consumer.phone_number,
                consumer.email,
                consumer.individual_sale,
            )

    async def update_consumer(self, consumer_id: int, consumer: ConsumerWithId) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """UPDATE Consumers
                SET
                    bio = $1,
                    date_of_birth = $2,
                    first_name = $3,
                    second_name = $4,
                    last_name = $5,
                    phone_number = $6,
                    email = $7,
                    individual_sale = $8
                WHERE id = $9
                """,
                consumer.bio,
                consumer.date_of_birth,
                consumer.first_name,
                consumer.second_name,
                consumer.last_name,
                consumer.phone_number,
                consumer.email,
                consumer.individual_sale,
                consumer_id,
            )

    # ===================================== Doctors =====================================
    async def get_all_doctors_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[DoctorWithId]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM Doctors ORDER BY id LIMIT $1 OFFSET $2", amount, end_cursor
            )
        if res:
            return [DoctorWithId(**row) for row in res]

    async def get_doctor_by_id(self, doctor_id: int) -> Optional[DoctorWithId]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow("SELECT * FROM Doctors WHERE id = $1", doctor_id)
        if res:
            return DoctorWithId(**res)

    async def create_doctor(self, doctor: DoctorWithoutId) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """INSERT INTO Doctors
                    (departament_id, bio, first_name, second_name, last_name,
                    date_of_birth)
                VALUES
                    ($1, $2, $3, $4, $5, $6)
                """,
                doctor.departament_id,
                doctor.bio,
                doctor.first_name,
                doctor.second_name,
                doctor.last_name,
                doctor.date_of_birth,
            )

    async def update_doctor(self, doctor_id: int, doctor: DoctorWithId) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """UPDATE Doctors
                SET
                    departament_id = $1,
                    bio = $2,
                    first_name = $3,
                    second_name = $4,
                    last_name = $5,
                    date_of_birth = $6
                WHERE id = $7
                """,
                doctor.departament_id,
                doctor.bio,
                doctor.first_name,
                doctor.second_name,
                doctor.last_name,
                doctor.date_of_birth,
                doctor_id,
            )

    # ===================================== Services =====================================
    async def get_all_services_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[ServiceWithId]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM Services ORDER BY id LIMIT $1 OFFSET $2", amount, end_cursor
            )
        if res:
            return [ServiceWithId(**row) for row in res]

    async def get_service_by_id(self, service_id: int) -> Optional[ServiceWithId]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow("SELECT * FROM Services WHERE id = $1", service_id)
        if res:
            return ServiceWithId(**res)

    async def create_service(self, service: ServiceWithId) -> str:
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

    async def update_service(self, service_id: int, service: ServiceWithId) -> str:
        async with self._connection.acquire() as con:
            return await con.execute(
                """UPDATE Services
                SET
                    name = $1,
                    price = $2,
                    description = $3,
                    default_duration = $4
                WHERE id = $5
                """,
                service.name,
                service.price,
                service.description,
                service.default_duration,
                service_id,
            )

    # ===================================== Departaments =====================================
    async def get_all_departaments_with_pagination(
        self, end_cursor: int, amount: int = 10
    ) -> Optional[list[DepartamentWithId]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch(
                "SELECT * FROM Departaments ORDER BY id LIMIT $1 OFFSET $2", amount, end_cursor
            )
        if res:
            return [DepartamentWithId(**row) for row in res]

    async def get_departament_by_id(self, departament_id: int) -> Optional[DepartamentWithId]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow("SELECT * FROM Departaments WHERE id = $1", departament_id)
        if res:
            return DepartamentWithId(**res)

    async def create_departament(self, departament: DepartamentWithoutId) -> str:
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
    ) -> Optional[list[DoctorServiceWithId]]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetch("SELECT * FROM DoctorServices WHERE doctor_id = $1", doctor_id)
        if res:
            return [DoctorServiceWithId(**row) for row in res]

    async def get_doctor_service_by_service_id(
        self, service_id: int
    ) -> Optional[DoctorServiceWithId]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow(
                "SELECT * FROM DoctorServices WHERE service_id = $1", service_id
            )
        if res:
            return DoctorServiceWithId(**res)

    async def create_doctor_service(self, doctor_service: DoctorServiceWithoutId) -> str:
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
    async def get_all_cabinets_with_pagination(
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

    async def create_cabinet(self, cabinet: Cabinet) -> str:
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
