import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateProfile from "./components/CreateProfile";
import ProfileList from "./components/ProfileList";
import TopSkills from "./components/TopSkills";
import ProjectsBySkill from "./components/ProjectsBySkill";
import UpdateProfile from "./components/UpdateProfile"; // 👈 don’t forget to import it
import "./App.css";

function App() {
  const [reload, setReload] = useState(false);

  return (
    <Router>
      <div className="container">
        <h1>Me-API Playground</h1>

        {/* ✅ Add navigation */}
        <nav>
          <Link to="/">Profiles</Link> |{" "}
          <Link to="/create">Create Profile</Link>
        </nav>

        <Routes>
          {/* Home Page shows profiles + skills */}
          <Route
            path="/"
            element={
              <div className="components-grid">
                <div className="wide-column">
                  <ProfileList reload={reload} />
                </div>
                <div>
                  <TopSkills />
                </div>
                <div>
                  <ProjectsBySkill />
                </div>
              </div>
            }
          />

          {/* Create Profile Page */}
          <Route
            path="/create"
            element={<CreateProfile onCreated={() => setReload(!reload)} />}
          />

          {/* Update Profile Page */}
          <Route path="/edit/:id" element={<UpdateProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
