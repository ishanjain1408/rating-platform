import React, { useState } from "react";
import { signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function validatePassword(p) {
  if (p.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(p)) return "At least one lowercase required";
  if (!/[A-Z]/.test(p)) return "At least one uppercase required";
  if (!/[0-9]/.test(p)) return "At least one number required";
  if (!/[^A-Za-z0-9]/.test(p)) return "At least one special char required";
  return null;
}

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const passErr = validatePassword(form.password);
    if (passErr) return setError(passErr);
    try {
      await signup(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <div>
          <label>Name</label>
          <br />
          <input name="name" value={form.name} onChange={onChange} required />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            type="email"
            required
          />
        </div>
        <div>
          <label>Address</label>
          <br />
          <input name="address" value={form.address} onChange={onChange} />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            name="password"
            value={form.password}
            onChange={onChange}
            type="password"
            required
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
}
