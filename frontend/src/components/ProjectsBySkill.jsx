import React, { useState } from "react";
import { getProjectsBySkill } from "../api";

export default function ProjectsBySkill() {
  const [skill, setSkill] = useState("");
  const [projects, setProjects] = useState([]);

  const search = async () => {
    const res = await getProjectsBySkill(skill);
    setProjects(res.data);
  };

  return (
    <div className="projects-by-skill">
      <h2>Search Projects by Skill</h2>
      <div className="search-container">
        <input 
          value={skill} 
          onChange={(e) => setSkill(e.target.value)} 
          placeholder="Enter skill" 
        />
        <button onClick={search}>Search</button>
      </div>
      <ul>
        {projects.map((p, i) => (
          <li key={i}>{p.title} - {p.description}</li>
        ))}
      </ul>
    </div>
  );
}