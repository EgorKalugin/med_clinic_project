from fastapi import Request

from web_app.repository import ApiRepositories


async def get_repositories(request: Request) -> ApiRepositories:
    return request.app.state.repository
