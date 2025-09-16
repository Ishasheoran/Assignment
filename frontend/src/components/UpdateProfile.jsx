import React, { useState } from "react";
import { updateProfile } from "../api";

export default function UpdateProfile({ profile, onUpdated }) {
  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    skills: profile.skills?.join(", ") || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(profile._id, {
      ...form,
      skills: form.skills.split(",").map(s => s.trim())
    });
    onUpdated();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        value={form.skills}
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
      />
      <button type="submit">Update</button>
    </form>
  );
}
