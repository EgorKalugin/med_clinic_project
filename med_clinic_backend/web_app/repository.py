from dataclasses import dataclass

from db.main_postgres.initializer import MainPostgresInitializer
from db.main_postgres.repository import MainPgDatabaseRepository
from web_app.settings import ApiSettings


class ApiRepositoriesInitializer:
    """Class providing methods for initialization of API repositories."""

    def __init__(self, settings: ApiSettings) -> None:
        self.main_postgres = MainPostgresInitializer(settings)


@dataclass
class ApiRepositories:
    initializer: ApiRepositoriesInitializer

    main_postgres: MainPgDatabaseRepository

    @classmethod
    async def create(cls, initializer: ApiRepositoriesInitializer) -> "ApiRepositories":
        return cls(
            initializer=initializer,
            main_postgres=await initializer.main_postgres.init_main_db_repository(),
        )
