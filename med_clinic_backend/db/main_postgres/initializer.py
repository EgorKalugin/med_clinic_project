from typing import Optional

from asyncpg import Pool, create_pool

from core.config import MainPostgresDbSettings
from db.main_postgres.repository import MainPgDatabaseRepository


class MainPostgresInitializer:
    """Class providing methods for initialization of PostgreSQL."""

    def __init__(self, settings: MainPostgresDbSettings) -> None:
        self._settings = settings
        self._pg_connection_pool: Optional[Pool] = None

    async def close_connections(self) -> None:
        """Gracefully close all connections."""
        if self._pg_connection_pool is not None:
            await self._pg_connection_pool.close()

    async def _get_postgres_connection_pool(self) -> Pool:
        """Create connection pool to postgres database."""
        if self._pg_connection_pool is None:
            self._pg_connection_pool = await create_pool(
                host=self._settings.host,
                port=self._settings.port,
                user=self._settings.username,
                password=self._settings.password,
                database=self._settings.database,
            )
        return self._pg_connection_pool

    async def init_main_db_repository(self) -> MainPgDatabaseRepository:
        """Initialize main postgres database for application."""
        connection_pool = await self._get_postgres_connection_pool()
        main_db_repository = MainPgDatabaseRepository(conn=connection_pool)
        await main_db_repository.check_connection()
        return main_db_repository
