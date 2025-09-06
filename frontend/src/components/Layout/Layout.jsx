// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import "./Layout.css";

// export default function Layout({ children }) {
//   const { user, logout } = useAuth();
//   return (
//     <div>
//       <header
//         style={{
//           display: "flex",
//           gap: 12,
//           padding: 12,
//           background: "#222",
//           color: "#fff",
//         }}
//       >
//         <Link to="/stores" style={{ color: "#fff" }}>
//           Stores
//         </Link>
//         {user?.role === "System Administrator" && (
//           <Link to="/admin" style={{ color: "#fff" }}>
//             Admin
//           </Link>
//         )}
//         {user?.role === "Store Owner" && (
//           <Link to="/owner" style={{ color: "#fff" }}>
//             Owner
//           </Link>
//         )}
//         <div style={{ marginLeft: "auto" }}>
//           {user ? (
//             <>
//               <span style={{ marginRight: 12 }}>
//                 {user.name} ({user.role})
//               </span>
//               <button onClick={logout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" style={{ color: "#fff", marginRight: 8 }}>
//                 Login
//               </Link>
//               <Link to="/signup" style={{ color: "#fff" }}>
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </header>
//       <main >{children}</main>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Layout.css";

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="layout-header">
        <nav className="nav-links">
          <Link to="/stores" className="nav-link">
            Stores
          </Link>
          {user?.role === "System Administrator" && (
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          )}
          {user?.role === "Store Owner" && (
            <Link to="/owner" className="nav-link">
              Owner
            </Link>
          )}
        </nav>

        <div className="auth-section">
          {user ? (
            <>
              <span className="user-info">
                {user.name} <span className="user-role">({user.role})</span>
              </span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">
                Login
              </Link>
              <Link to="/signup" className="auth-link">
                Signup
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="layout-main">{children}</main>
    </div>
  );
}
