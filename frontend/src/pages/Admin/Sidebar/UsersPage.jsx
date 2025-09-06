import React, { useState, useEffect } from "react";
import { adminCreateUser, getAdminUsers } from "../../../services/storeService";
import Table from "../../../components/Table/Table";


export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [uForm, setUForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "Normal User",
  });

  const loadUsers = async () => {
    const data = await getAdminUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    await adminCreateUser(uForm);
    setUForm({ name: "", email: "", password: "", address: "", role: "Normal User" });
    setShowForm(false);
    loadUsers();
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Role", accessor: "role" },
  ];

  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add User"}
      </button>
      {showForm ? (
        <form onSubmit={createUser}>
          <input
            placeholder="Name"
            value={uForm.name}
            onChange={(e) => setUForm({ ...uForm, name: e.target.value })}
            required
          />
          <input
            placeholder="Email"
            value={uForm.email}
            onChange={(e) => setUForm({ ...uForm, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={uForm.password}
            onChange={(e) => setUForm({ ...uForm, password: e.target.value })}
            required
          />
          <select
            value={uForm.role}
            onChange={(e) => setUForm({ ...uForm, role: e.target.value })}
          >
            <option>Normal User</option>
            <option>Store Owner</option>
          </select>
          <button type="submit">Create</button>
        </form>
      ) : (
        <Table columns={columns} data={users} />
      )}
    </div>
  );
}
