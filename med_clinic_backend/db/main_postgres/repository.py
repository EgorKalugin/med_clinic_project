import logging
from typing import Optional

import asyncpg

from db.main_postgres.base import BasePostgresqlRepository
from models.models import Consumer, ConsumerSchedule, Doctor

logger = logging.getLogger("main")


class MainPgDatabaseRepository(BasePostgresqlRepository):
    async def get_consumer_schedule_by_consumer_id(
        self, consumer_id: int
    ) -> list[ConsumerSchedule]:
        pass
        # async with self._connection.acquire() as con:
        #     await con.fetch("SELECT * FROM some_table")

    # async def get_consumer_schedule_by_id()
    # TODO

    async def get_consumer_by_id(self, consumer_id: int) -> Optional[Consumer]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow("SELECT * FROM Consumers WHERE id = $1", consumer_id)
        if res:
            return Consumer(**res)

    async def add_new_consumer(self, consumer: Consumer) -> str:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            return await con.execute(
                """INSERT INTO Consumers
                    (id, bio, date_of_birth, firts_name, second_name, last_name,
                    phone_number, email, individual_sale)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                """,
                consumer.id,
                consumer.bio,
                consumer.date_of_birth,
                consumer.firts_name,
                consumer.second_name,
                consumer.last_name,
                consumer.phone_number,
                consumer.email,
                consumer.individual_sale,
            )

    async def get_doctor_by_id(self, doctor_id: int) -> Optional[Doctor]:
        async with self._connection.acquire() as con:
            con: asyncpg.Connection
            res = await con.fetchrow("SELECT * FROM Doctors WHERE id = $1", doctor_id)
        if res:
            return Doctor(**res)
