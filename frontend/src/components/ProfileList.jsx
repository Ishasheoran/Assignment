import React, { useEffect, useState } from "react";
import { getProfiles, deleteProfile } from "../api";
import { Link } from "react-router-dom";

export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getProfiles().then(res => setProfiles(res.data));
  }, []);

  const handleDelete = async (id) => {
    await deleteProfile(id);
    setProfiles(profiles.filter(p => p._id !== id));
  };

  return (
    <div className="profile-list" style={{ padding: "20px" }} >
      <h2>All Profiles</h2>
      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {profiles.map((p) => (
            <li key={p._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "15px" }}>
              <h2>{p.name}</h2>
              <p><b>Email:</b> {p.email}</p>
              <p><b>Education:</b> {p.education}</p>
              <p><b>Skills:</b> {p.skills?.join(", ")}</p>
              <p><b>Work Experience:</b> {p.work?.join(", ")}</p>

              <div>
                <b>Projects:</b>
                {p.projects?.length > 0 ? (
                  <ul>
                    {p.projects.map((proj, idx) => (
                      <li key={idx}>
                        <strong>{proj.title}</strong>
                        {proj.description && <p>{proj.description}</p>}
                        {proj.links?.length > 0 && (
                          <p>
                            Links:{" "}
                            {proj.links.map((link, i) => (
                              <a key={i} href={link} target="_blank" rel="noreferrer">{link}</a>
                            ))}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No projects listed.</p>
                )}
              </div>

              <div>
                <b>Links:</b>
                <ul>
                  {p.links?.github && (
                    <li>
                      <a href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>
                    </li>
                  )}
                  {p.links?.linkedin && (
                    <li>
                      <a href={p.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                    </li>
                  )}
                  {p.links?.portfolio && (
                    <li>
                      <a href={p.links.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
                    </li>
                  )}
                </ul>
              </div>

              <div style={{ marginTop: "10px" }}>
                <Link to={`/edit/${p._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(p._id)} style={{ marginLeft: "10px" }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
