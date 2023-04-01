import logging

from asyncpg import Pool

logger = logging.getLogger("main")


class BasePostgresqlRepository:
    def __init__(self, conn: Pool) -> None:
        self._connection = conn

    async def check_connection(self) -> None:
        """Check if database connection is active"""
        async with self._connection.acquire() as con:
            try:
                res = await con.fetchrow("SELECT 1")
                if res[0] == 1:
                    logger.info("%s: database connection is OK", self.__class__.__name__)
                else:
                    raise ValueError("Empty response from Postgres")
            except Exception as err:
                logger.error("%s: database connection failed", self.__class__.__name__)
                logger.exception(err)
                raise err
