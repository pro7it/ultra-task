from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from database import (
    get_all_tasks,
    create_task,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


class TaskCreate(BaseModel):
    title: str


@app.get("/tasks/all")
def all_tasks():
    return get_all_tasks()


@app.post("/tasks/new")
def new_task(task: TaskCreate):
    return create_task(task.title)