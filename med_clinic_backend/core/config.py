from pydantic import BaseSettings


class MainPostgresDbSettings(BaseSettings):
    host: str
    port: int
    username: str
    password: str
    database: str

    class Config:
        env_prefix = "POSTGRES_MAIN_DB_"
        case_sensitive = False
