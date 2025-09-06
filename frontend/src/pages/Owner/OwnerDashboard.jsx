import React, { useEffect, useState } from "react";
import { myStores } from "../../services/storeService";
import Table from "../../components/Table/Table";

export default function OwnerDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await myStores();
      setStores(res);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Avg", accessor: "avgRating" },
  ];

  return (
    <div>
      <h2>Owner Dashboard</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} data={stores} />
      )}
    </div>
  );
}
