// import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar/Sidebar";
// import Table from "../../components/Table/Table";
// import {
//   getAdminUsers,
//   getAdminStores,
//   adminCreateUser,
//   adminCreateStore,
// } from "../../services/storeService";

// export default function AdminDashboard() {
//   const [active, setActive] = useState("users");
//   const [users, setUsers] = useState([]);
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uForm, setUForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     role: "Normal User",
//   });
//   const [sForm, setSForm] = useState({ name: "", email: "", address: "" });

//   const load = async () => {
//     setLoading(true);
//     try {
//       const [us, st] = await Promise.all([getAdminUsers(), getAdminStores()]);
//       setUsers(us);
//       setStores(st);
//     } catch (e) {
//       console.error(e);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const createUser = async (e) => {
//     e.preventDefault();
//     try {
//       await adminCreateUser(uForm);
//       setUForm({ name: "", email: "", password: "", address: "", role: "Normal User" });
//       load();
//       alert("User created");
//     } catch (err) {
//       alert(err.response?.data?.message || "Err");
//     }
//   };

//   const createStore = async (e) => {
//     e.preventDefault();
//     try {
//       await adminCreateStore(sForm);
//       setSForm({ name: "", email: "", address: "" });
//       load();
//       alert("Store created");
//     } catch (err) {
//       alert(err.response?.data?.message || "Err");
//     }
//   };

//   const userCols = [
//     { header: "ID", accessor: "id" },
//     { header: "Name", accessor: "name" },
//     { header: "Email", accessor: "email" },
//     { header: "Address", accessor: "address" },
//     { header: "Role", accessor: "role" },
//   ];

//   const storeCols = [
//     { header: "ID", accessor: "id" },
//     { header: "Name", accessor: "name" },
//     { header: "Email", accessor: "email" },
//     { header: "Address", accessor: "address" },
//   ];

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar setActive={setActive} />

//       <main style={{ flex: 1, padding: "20px" }}>
//         <h2>Admin Dashboard</h2>
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <>
//             {active === "users" && (
//               <>
//                 <h3>Users</h3>
//                 <Table columns={userCols} data={users} />
//               </>
//             )}

//             {active === "addUser" && (
//               <form onSubmit={createUser}>
//                 <h3>Create User</h3>
//                 <input
//                   placeholder="Name"
//                   value={uForm.name}
//                   onChange={(e) => setUForm({ ...uForm, name: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Email"
//                   value={uForm.email}
//                   onChange={(e) => setUForm({ ...uForm, email: e.target.value })}
//                   required
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={uForm.password}
//                   onChange={(e) => setUForm({ ...uForm, password: e.target.value })}
//                   required
//                 />
//                 <select
//                   value={uForm.role}
//                   onChange={(e) => setUForm({ ...uForm, role: e.target.value })}
//                 >
//                   <option>Normal User</option>
//                   <option>Store Owner</option>
//                 </select>
//                 <button type="submit">Create</button>
//               </form>
//             )}

//             {active === "stores" && (
//               <>
//                 <h3>Stores</h3>
//                 <Table columns={storeCols} data={stores} />
//               </>
//             )}

//             {active === "addStore" && (
//               <form onSubmit={createStore}>
//                 <h3>Create Store</h3>
//                 <input
//                   placeholder="Name"
//                   value={sForm.name}
//                   onChange={(e) => setSForm({ ...sForm, name: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Email"
//                   value={sForm.email}
//                   onChange={(e) => setSForm({ ...sForm, email: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Address"
//                   value={sForm.address}
//                   onChange={(e) => setSForm({ ...sForm, address: e.target.value })}
//                 />
//                 <button type="submit">Create Store</button>
//               </form>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import UsersPage from "./Sidebar/UsersPage";
import StoresPage from "./Sidebar/StoresPage";

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="users" replace />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
