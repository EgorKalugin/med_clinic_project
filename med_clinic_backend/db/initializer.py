from core.config import settings as main_pg_settings
from db.main_postgres.initializer import MainPostgresInitializer
from db.main_postgres.repository import MainPgDatabaseRepository


class Databases:
    async def __init__(self) -> None:
        self.main_postgres_db = await MainPostgresInitializer(
            settings=main_pg_settings
        ).init_main_db_repository()
