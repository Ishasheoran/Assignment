import React, { useEffect, useState } from "react";
import { getTopSkills } from "../api";

export default function TopSkills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getTopSkills().then(res => setSkills(res.data));
  }, []);

  return (
    <div className="top-skills">
      <h2>Top Skills</h2>
      <ul>
        {skills.map(([skill, count], i) => (
          <li key={i}>{skill} – {count} profiles</li>
        ))}
      </ul>
    </div>
  );
}