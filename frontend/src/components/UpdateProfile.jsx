import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfiles, updateProfile } from "../api";

export default function UpdateProfile({ onUpdated }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    getProfiles().then(res => {
      const found = res.data.find(p => p._id === id);
      setProfile(found);
      setForm({
        name: found.name,
        email: found.email,
        skills: found.skills?.join(", ") || ""
      });
    });
  }, [id]);

  if (!form) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(profile._id, {
      ...form,
      skills: form.skills.split(",").map(s => s.trim())
    });
    onUpdated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
      <button type="submit">Update</button>
    </form>
  );
}
