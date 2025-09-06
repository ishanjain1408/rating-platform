import React, { useState, useMemo } from "react";
import "./Table.css";

export default function Table({ columns, data }) {
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    if (!filter) return data;
    const q = filter.toLowerCase();
    return data.filter((row) =>
      columns.some((c) =>
        String(row[c.accessor] || "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [filter, data, columns]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortBy] ?? "";
      const bv = b[sortBy] ?? "";
      if (typeof av === "number" && typeof bv === "number")
        return order === "asc" ? av - bv : bv - av;
      return order === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [filtered, sortBy, order]);

  const onHeaderClick = (key) => {
    if (sortBy === key) setOrder((o) => (o === "asc" ? "desc" : "asc"));
    else {
      setSortBy(key);
      setOrder("asc");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table
        border={1}
        cellPadding={8}
        cellSpacing={0}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                onClick={() => onHeaderClick(col.accessor)}
                style={{ cursor: "pointer" }}
              >
                {col.header}
                {sortBy === col.accessor ? (order === "asc" ? " ▲" : " ▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.accessor}>
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
