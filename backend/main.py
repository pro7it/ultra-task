from fastapi import FastAPI
from pydantic import BaseModel

from database import (
    get_all_tasks,
    get_undone_tasks,
    create_task,
)


app = FastAPI()


class TaskCreate(BaseModel):
    title: str


@app.get("/tasks/all")
def all_tasks():
    return get_all_tasks()


@app.get("/tasks/undone")
def undone_tasks():
    return get_undone_tasks()


@app.post("/tasks/new")
def new_task(task: TaskCreate):
    return create_task(task.title)