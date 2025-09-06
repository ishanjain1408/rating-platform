import React, { useState, useEffect } from "react";
import { adminCreateStore, getAdminStores } from "../../../services/storeService";
import Table from "../../../components/Table/Table";


export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sForm, setSForm] = useState({ name: "", email: "", address: "" });

  const loadStores = async () => {
    const data = await getAdminStores();
    setStores(data);
  };

  useEffect(() => {
    loadStores();
  }, []);

  const createStore = async (e) => {
    e.preventDefault();
    await adminCreateStore(sForm);
    setSForm({ name: "", email: "", address: "" });
    setShowForm(false);
    loadStores();
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
  ];

  return (
    <div>
      <h2>Stores</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Store"}
      </button>
      {showForm ? (
        <form onSubmit={createStore}>
          <input
            placeholder="Name"
            value={sForm.name}
            onChange={(e) => setSForm({ ...sForm, name: e.target.value })}
            required
          />
          <input
            placeholder="Email"
            value={sForm.email}
            onChange={(e) => setSForm({ ...sForm, email: e.target.value })}
            required
          />
          <input
            placeholder="Address"
            value={sForm.address}
            onChange={(e) => setSForm({ ...sForm, address: e.target.value })}
          />
          <button type="submit">Create Store</button>
        </form>
      ) : (
        <Table columns={columns} data={stores} />
      )}
    </div>
  );
}
