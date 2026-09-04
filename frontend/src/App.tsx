import { useEffect, useState } from "react";
import { styles } from "./style";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const url = `/tasks/all`;
      const res = await fetch(url);
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/tasks/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error(`Помилка: ${res.status}`);
      setTitle("");
      fetchTasks();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggle = async (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t,
      ),
    );

    try {
      const res = await fetch(`/tasks/${taskId}/toggle`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error(`Помилка: ${res.status}`);
    } catch (e) {
      console.error(e);
      fetchTasks();
    }
  };

  const handleDelete = async (taskId: number) => {
    const prevTasks = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    try {
      const res = await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Помилка: ${res.status}`);
    } catch (e) {
      console.error(e);
      setTasks(prevTasks);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return a.id - b.id;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Ultra-task</h1>

      <form onSubmit={handleCreate} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Add
        </button>
      </form>

      {loading && <p style={styles.muted}>Loading...</p>}

      <ul style={styles.list}>
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            style={{
              ...styles.listItem,
              ...(task.completed ? styles.listItemDone : {}),
            }}
          >
            <label style={styles.listItemLabel}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span style={styles.taskText}>{task.title}</span>
            </label>
            <button
              style={styles.deleteButton}
              onClick={() => handleDelete(task.id)}
              aria-label="Delete task"
            >
              ✕
            </button>
          </li>
        ))}
        {!loading && tasks.length === 0 && <p style={styles.muted}>No tasks</p>}
      </ul>
    </div>
  );
}

export default App;
