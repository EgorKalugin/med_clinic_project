from pydantic import BaseSettings, Field


class MainPostgresDbSettings(BaseSettings):
    host: str = Field(..., env="POSTGRES_MAIN_DB_HOST")
    port: int = Field(..., env="POSTGRES_MAIN_DB_PORT")
    username: str = Field(..., env="MED_CLINIC_USER")
    password: str = Field(..., env="MED_CLINIC_USER_PASSWORD")
    database: str = Field(..., env="MED_CLINIC_DB_NAME")


settings = MainPostgresDbSettings()
