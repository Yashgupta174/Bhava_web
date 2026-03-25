import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";

const CATEGORIES = [
  "Active Challenges",
  "Morning Routine",
  "Daily Practise",
  "Learning Path",
  "Timeless Wisdom"
];

function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("bhava_token"));
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    badgeText: "",
    durationText: ""
  });

  const fetchChallenges = async () => {
    setLoading(true);
    setError("");
    try {
      const BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${BASE}/api/challenges`);
      const data = await res.json();
      if (data.success) {
        setChallenges(data.data);
      } else {
        setError(data.message || "Failed to fetch challenges");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchChallenges();
  }, [isLoggedIn]);

  const handleLoginChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const BASE = import.meta.env.VITE_API_URL || "";

    try {
      const res = await fetch(`${BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return setError(errorData.message || `Server responded with status ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        // We assume any successful login works, but ideally backend checks `isAdmin`
        localStorage.setItem("bhava_token", data.token);
        localStorage.setItem("bhava_user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setSuccess(`Welcome back, Admin ${data.user.name}!`);
      } else {
        setError(data.message || "Invalid Admin Credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(`Connection Failed. Ensure the backend at ${BASE || 'local server'} is reachable. Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bhava_token");
    localStorage.removeItem("bhava_user");
    setIsLoggedIn(false);
    setLoginForm({ email: "", password: "" });
    setSuccess("");
    setError("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTile = async (e) => {
    e.preventDefault();
    if (!formData.title) return setError("Title is required");

    setLoading(true);
    setError("");
    setSuccess("");

    const BASE = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("bhava_token");
    const newChallenge = { ...formData, category: activeTab };

    try {
      const res = await fetch(`${BASE}/api/challenges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newChallenge)
      });
      const data = await res.json();

      if (data.success) {
        setSuccess("Tile saved successfully into MongoDB!");
        setFormData({ title: "", description: "", image: "", badgeText: "", durationText: "" });
        fetchChallenges();
      } else {
        setError(data.message || "Failed to add tile");
      }
    } catch (err) {
      setError("Error adding tile. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tile?")) return;

    setLoading(true);
    setError("");
    setSuccess("");

    const BASE = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("bhava_token");

    try {
      const res = await fetch(`${BASE}/api/challenges/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setSuccess("Tile deleted from MongoDB successfully!");
        fetchChallenges();
      } else {
        setError(data.message || "Failed to delete from database");
      }
    } catch (err) {
      setError("Error deleting tile. Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const filteredChallenges = challenges.filter((c) => c.category === activeTab);

  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h2>Admin Login</h2>
          <p>Sign in to access the dynamic content database.</p>
          {error && <div className={styles.errorAlert}>{error}</div>}
          <form onSubmit={handleAdminLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" name="email" value={loginForm.email} onChange={handleLoginChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label>Administrator Password</label>
              <input type="password" name="password" value={loginForm.password} onChange={handleLoginChange} required />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
        <p>Manage Dynamic Content Tiles directly in MongoDB.</p>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.tabsSection}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.tabBtn} ${activeTab === cat ? styles.activeTab : ""}`}
              onClick={() => { setActiveTab(cat); setError(""); setSuccess(""); }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.panel}>
          <h2>{activeTab} Management</h2>

          {error && <div className={styles.errorAlert}>{error}</div>}
          {success && <div className={styles.successAlert}>{success}</div>}

          <div className={styles.formCard}>
            <h3>Configure Dynamic Content</h3>
            <p className={styles.formHint}>Fill this to generate the Stage 1 (Detail) and Stage 2 (Player) views.</p>
            
            <form onSubmit={handleAddTile} className={styles.form}>
              <div className={styles.formSection}>
                <h4>1. Basic Tile Info</h4>
                <div className={styles.inputGroup}>
                  <label>Content Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Daily Pooja" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Detail Page Subtitle</label>
                  <input type="text" name="fullSubtitle" value={formData.fullSubtitle} onChange={handleChange} placeholder="e.g. Guided Contemplative Prayer · 27 min" />
                </div>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Badge Status</label>
                    <input type="text" name="badgeText" value={formData.badgeText} onChange={handleChange} placeholder="● 1,247 listening now" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Duration Info</label>
                    <input type="text" name="durationText" value={formData.durationText} onChange={handleChange} placeholder="27 min" />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Quick Summary</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="2" placeholder="Brief hint for the main listing card..." />
                </div>
                <div className={styles.inputGroup}>
                  <label>Background Image URL</label>
                  <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                </div>
                <div className={styles.inputGroup}>
                  <label>Full Content Description (Stage 1)</label>
                  <textarea name="detailsLongDescription" value={formData.detailsLongDescription} onChange={handleChange} rows="4" placeholder="The long text that appears on the Stage 1 Detail page..." />
                </div>
              </div>

              <div className={styles.formSection}>
                <h4>2. Mentors / Guides (Stage 1 "Featuring")</h4>
                {hosts.map((host, index) => (
                  <div key={index} className={styles.arrayItem}>
                    <div className={styles.row}>
                      <input type="text" name="name" value={host.name} onChange={(e) => handleHostChange(index, e)} placeholder="Name (e.g. Fr. Thomas)" />
                      <input type="text" name="title" value={host.title} onChange={(e) => handleHostChange(index, e)} placeholder="Title (e.g. Spiritual Director)" />
                      <input type="text" name="initials" value={host.initials} onChange={(e) => handleHostChange(index, e)} placeholder="Initials" style={{width: '80px'}} />
                      <button type="button" onClick={() => removeHost(index)} className={styles.removeBtn}>✕</button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addHost} className={styles.addBtn}>+ Add Mentor</button>
              </div>

              <div className={styles.formSection}>
                <h4>3. Session / Player Tracks (Stage 2)</h4>
                {sessions.map((session, index) => (
                  <div key={index} className={styles.arrayItemCard}>
                    <div className={styles.itemHeader}>
                      <span>Track #{index + 1}</span>
                      <button type="button" onClick={() => removeSession(index)} className={styles.removeBtn}>✕</button>
                    </div>
                    <div className={styles.inputGroup}>
                      <input type="text" name="title" value={session.title} onChange={(e) => handleSessionChange(index, e)} placeholder="Track Title (e.g. Om Namah Shivaya)" />
                    </div>
                    <div className={styles.inputGroup}>
                      <input type="text" name="subtitle" value={session.subtitle} onChange={(e) => handleSessionChange(index, e)} placeholder="Sub-subtitle (e.g. 108 Sacred Chants)" />
                    </div>
                    <div className={styles.row}>
                      <input type="text" name="audioUrl" value={session.audioUrl} onChange={(e) => handleSessionChange(index, e)} placeholder="Audio URL (.mp3)" />
                      <input type="text" name="tags" value={session.tags} onChange={(e) => handleSessionChange(index, e)} placeholder="Tags (comma separated e.g. Mantra, 108 BPM)" />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addSession} className={styles.addBtn}>+ Add Media Track</button>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Syncing with MongoDB..." : "Save Content Tile"}
              </button>
            </form>
          </div>

          <div className={styles.tilesList}>
            <h3>Existing Tiles in MongoDB</h3>
            {loading && !filteredChallenges.length ? (
              <p>Fetching from database...</p>
            ) : filteredChallenges.length === 0 ? (
              <p className={styles.emptyText}>No tiles found for this section.</p>
            ) : (
              <div className={styles.grid}>
                {filteredChallenges.map((tile) => (
                  <div key={tile._id} className={styles.tileCard}>
                    {tile.image ? (
                      <img src={tile.image} alt={tile.title} className={styles.tileImg} />
                    ) : (
                      <div className={styles.tileImgPlaceholder}>No Image</div>
                    )}
                    <div className={styles.tileBody}>
                      <h4>{tile.title}</h4>
                      <p className={styles.tileDesc}>{tile.description?.substring(0, 50)}...</p>
                      <div className={styles.tileMeta}>
                        {tile.badgeText && <span>{tile.badgeText}</span>}
                        {tile.durationText && <span>{tile.durationText}</span>}
                      </div>
                      <button onClick={() => handleDeleteTile(tile._id)} className={styles.deleteBtn} disabled={loading}>
                        Delete Tile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

