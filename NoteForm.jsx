import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

function NoteForm() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/users/`)
      .then((res) => {
        setUsers(res.data);
        if (res.data.length > 0) setUserId(res.data[0].id);
      })
      .catch(() => setError("Не удалось загрузить пользователей"));
  }, []);

  const handleSubmit = async () => {
    setMessage("");
    setError("");
    if (!text.trim()) {
      setError("Введите текст заметки");
      return;
    }
    try {
      const res = await axios.post(`${API}/notes/`, {
        user_id: Number(userId),
        text: text,
      });
      const user = users.find((u) => u.id === res.data.user_id);
      setMessage(`✅ Заметка создана для ${user ? user.username : "пользователя"}`);
      setText("");
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка отправки");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Аккаунты и заметки</h2>
      <div>Пользователь:</div>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.username}</option>
        ))}
      </select>
      <div style={{ marginTop: 12 }}>Заметка:</div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Не забыть сделать домашку"
        style={{ width: "100%" }}
      />
      <button onClick={handleSubmit} style={{ marginTop: 12 }}>Отправить</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default NoteForm;