from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from database import (
    get_all_tasks,
    create_task,
    toggle_task,
    delete_task,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
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


@app.patch("/tasks/{task_id}/toggle")
def toggle(task_id: int):
    result = toggle_task(task_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return result


@app.delete("/tasks/{task_id}")
def remove(task_id: int):
    deleted = delete_task(task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"ok": True}