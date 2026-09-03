import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: 600,
    minWidth: 400,
    padding: 24,
    fontFamily: "system-ui",
    color: "#222",
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  form: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: "8px 10px",
    border: "1px solid #ccc",
    borderRadius: 6,
    fontSize: 14,
  },
  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: 6,
    background: "#222",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  listItem: {
    padding: "10px 12px",
    border: "1px solid #eee",
    borderRadius: 6,
    fontSize: 14,
  },
  listItemDone: {
    textDecoration: "line-through",
    color: "#999",
    background: "#fafafa",
  },
  muted: {
    color: "#999",
    fontSize: 14,
  },
  error: {
    color: "#c0392b",
    fontSize: 14,
  },
};
