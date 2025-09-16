import React, { useState } from "react";
import { createProfile } from "../api";

export default function CreateProfile({ onCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
    work: "",
    projects: [{ title: "", description: "", links: [""] }],
    links: { github: "", linkedin: "", portfolio: "" }
  });

  // Update top-level fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update project fields
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  // Add new project input set
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: "", description: "", links: [""] }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: formData.skills.split(",").map(s => s.trim()),
      work: formData.work.split(",").map(w => w.trim())
    };
    await createProfile(payload);
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="education" placeholder="Education" onChange={handleChange} />
      <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />
      <input name="work" placeholder="Work (comma separated)" onChange={handleChange} />

      <h3>Projects</h3>
{formData.projects.map((proj, i) => (
  <div key={i} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
    <h4>Project {i + 1}</h4>

    <label>
      Title:
      <input
        placeholder="Project Title"
        value={proj.title}
        onChange={(e) => handleProjectChange(i, "title", e.target.value)}
      />
    </label>
    <br />

    <label>
      Description:
      <input
        placeholder="Project Description"
        value={proj.description}
        onChange={(e) => handleProjectChange(i, "description", e.target.value)}
      />
    </label>
    <br />

    <label>
      Links:
      <input
        placeholder="Project Links (comma separated)"
        value={proj.links.join(", ")}
        onChange={(e) =>
          handleProjectChange(
            i,
            "links",
            e.target.value.split(",").map((l) => l.trim())
          )
        }
      />
    </label>
  </div>
))}
<button type="button" onClick={addProject}>+ Add Project</button>


      <h3>Links</h3>
      <input
        placeholder="GitHub"
        value={formData.links.github}
        onChange={(e) => setFormData({ ...formData, links: { ...formData.links, github: e.target.value } })}
      />
      <input
        placeholder="LinkedIn"
        value={formData.links.linkedin}
        onChange={(e) => setFormData({ ...formData, links: { ...formData.links, linkedin: e.target.value } })}
      />
      <input
        placeholder="Portfolio"
        value={formData.links.portfolio}
        onChange={(e) => setFormData({ ...formData, links: { ...formData.links, portfolio: e.target.value } })}
      />

      <button type="submit">Create Profile</button>
    </form>
  );
}
