from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Kanji Map API"
    api_root: Path = Path(__file__).resolve().parents[1]
    repo_root: Path = api_root.parents[1]
    data_dir: Path = repo_root / "data"
    database_url: str = f"sqlite:///{(data_dir / 'app.db').resolve()}"

    model_config = SettingsConfigDict(
        env_prefix="KANJI_API_",
        env_file=".env",
        env_file_encoding="utf-8",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
