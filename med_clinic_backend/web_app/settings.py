from core.config import MainPostgresDbSettings


class ApiSettings(MainPostgresDbSettings):
    pass


settings = ApiSettings()
