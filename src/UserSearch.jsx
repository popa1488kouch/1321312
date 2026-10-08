import { useState } from "react";
import axios from "axios";

function UserSearch() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (email.trim()) params.email = email.trim();

      const res = await axios.get("http://127.0.0.1:8000/api/users/", { params });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setSearched(true);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Поиск пользователя:</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="username" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email (бонус)" />
      <button onClick={handleSearch}>Найти</button>
      <hr />
      {searched && users.length === 0 && <p>Пользователи не найдены</p>}
      {users.map((u) => (
        <div key={u.id} style={{ marginBottom: 12 }}>
          <div>👤 {u.username}</div>
          <div>📧 {u.email}</div>
        </div>
      ))}
    </div>
  );
}

export default UserSearch;