
import express from "express";
import Profile from "../profileSchema.js"
// const Profile = require("../models/profile");
const router = express.Router();

// Create profile
router.post("/", async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put("/:id", async (req, res) => {
  try {
    const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get projects by skill
router.get("/projects", async (req, res) => {
  try {
    const { skill } = req.query;
    const profiles = await Profile.find({ skills: skill });
    const projects = profiles.flatMap(p => p.projects);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get top skills (count frequency)
router.get("/skills/top", async (req, res) => {
  try {
    const profiles = await Profile.find();
    const skillCount = {};
    profiles.forEach(p => {
      p.skills.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });
    const sorted = Object.entries(skillCount).sort((a,b) => b[1]-a[1]);
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete profile
router.delete("/:id", async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// module.exports = router;
export default router;