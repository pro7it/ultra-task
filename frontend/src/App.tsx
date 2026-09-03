import { useEffect, useState } from "react";
import { styles } from "./style";
import { API_URL } from "./global";

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
      const url = `${API_URL}/tasks`;
      const res = await fetch(url);
      const data = await res.json();
      setTasks(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      setTitle("");
      fetchTasks();
    } catch (e) {}
  };

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
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              ...styles.listItem,
              ...(task.completed ? styles.listItemDone : {}),
            }}
          >
            {task.title}
          </li>
        ))}
        {!loading && tasks.length === 0 && <p style={styles.muted}>No tasks</p>}
      </ul>
    </div>
  );
}

export default App;
