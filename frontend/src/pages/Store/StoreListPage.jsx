import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { listStores, rateStore } from "../../services/storeService";
import './StoreListPage.css'

export default function StoreListPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const load = async () => {
    setLoading(true);
    try {
      const res = await listStores();
      setStores(res);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const onRate = async (storeId, rating) => {
    try {
      await rateStore(storeId, { rating });
      await load();
      setEditing(null);
      alert("Rating saved");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    {
      header: "Avg Rating",
      accessor: "avgRating",
      cell: (r) => r.avgRating ?? "—",
    },
    { header: "Ratings", accessor: "ratingsCount" },
    {
      header: "Action",
      accessor: "action",
      cell: (r) => (
        <div>
          <button onClick={() => setEditing(r.id)}>Rate</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Stores</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} data={stores} />
      )}

      {editing && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              maxWidth: 400,
              margin: "60px auto",
            }}
          >
            <h3>Rate Store</h3>
            <div>
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  style={{ marginRight: 6 }}
                  onClick={() => onRate(editing, i)}
                >
                  {i}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
