import React, { useState } from "react";
import { createProfile } from "../api";

export default function CreateProfile({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
    work: "",
    github: "",
    linkedin: "",
    portfolio: "",
    projects: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      name: form.name,
      email: form.email,
      education: form.education,
      skills: form.skills.split(",").map(s => s.trim()),
      work: form.work.split(",").map(w => w.trim()),
      projects: form.projects.split(",").map(p => ({
        title: p.trim(),
        description: "",
        links: []
      })),
      links: {
        github: form.github,
        linkedin: form.linkedin,
        portfolio: form.portfolio
      }
    };
    await createProfile(formattedData);

    // Reset form
    setForm({
      name: "",
      email: "",
      education: "",
      skills: "",
      work: "",
      github: "",
      linkedin: "",
      portfolio: "",
      projects: "",
    });

    onCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Profile</h2>
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Education" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
      <input placeholder="Skills (comma separated)" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
      <input placeholder="Work Experience (comma separated)" value={form.work} onChange={(e) => setForm({ ...form, work: e.target.value })} />
      <input placeholder="GitHub Link" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
      <input placeholder="LinkedIn Link" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
      <input placeholder="Portfolio Link" value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })} />
      <input placeholder="Projects (comma separated titles)" value={form.projects} onChange={(e) => setForm({ ...form, projects: e.target.value })} />
      <button type="submit">Save</button>
    </form>
  );
}
