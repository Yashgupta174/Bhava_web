import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";

const CATEGORIES = [
  "Active Challenges",
  "Morning Routine",
  "Daily Practise",
  "Learning Path",
  "Timeless Wisdom",
  "Latest Teachings",
  "Daily Inspiration",
  "Community Campaign",
  "Community Groups",
  "User Queries",
  "Push Notifications"
];

function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("bhava_token"));
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [challenges, setChallenges] = useState([]);
  const [inspirations, setInspirations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    badgeText: "",
    durationText: "",
    fullSubtitle: "",
    detailsLongDescription: ""
  });

  const [hosts, setHosts] = useState([{ name: "", title: "", initials: "" }]);
  const [sessions, setSessions] = useState([{ title: "", subtitle: "", audioUrl: "", tags: "" }]);
  const [contentBlocks, setContentBlocks] = useState([{ type: "text", value: "" }]);

  // ── Host Handlers ──
  const addHost = () => setHosts([...hosts, { name: "", title: "", initials: "" }]);
  const removeHost = (index) => setHosts(hosts.filter((_, i) => i !== index));
  const handleHostChange = (index, e) => {
    const newHosts = [...hosts];
    newHosts[index][e.target.name] = e.target.value;
    setHosts(newHosts);
  };

  // ── Session Handlers ──
  const addSession = () => setSessions([...sessions, { title: "", subtitle: "", audioUrl: "", tags: "" }]);
  const removeSession = (index) => setSessions(sessions.filter((_, i) => i !== index));
  const handleSessionChange = (index, e) => {
    const { name, type, files, value } = e.target;
    const newSessions = [...sessions];
    if (type === "file") {
      newSessions[index][name] = files[0];
    } else {
      newSessions[index][name] = value;
    }
    setSessions(newSessions);
  };

  // ── Community Block Handlers ──
  const addBlock = () => setContentBlocks([...contentBlocks, { type: "text", value: "" }]);
  const removeBlock = (index) => setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  const handleBlockChange = (index, e) => {
    const { name, value } = e.target;
    const newBlocks = [...contentBlocks];
    newBlocks[index][name] = value;
    setContentBlocks(newBlocks);
  };


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

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const BASE = import.meta.env.VITE_API_URL || "";
      const token = localStorage.getItem("bhava_token");
      const res = await fetch(`${BASE}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts || []);
      } else {
        setError(data.message || "Failed to fetch queries");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const fetchInspirations = async () => {
    setLoading(true);
    setError("");
    try {
      const BASE = import.meta.env.VITE_API_URL || "";
      const token = localStorage.getItem("bhava_token");
      const res = await fetch(`${BASE}/api/inspirations/latest`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setInspirations(data.data);
      } else {
        setError(data.message || "Failed to fetch inspirations");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunities = async () => {
    setLoading(true);
    setError("");
    try {
      const BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${BASE}/api/community`);
      const data = await res.json();
      if (data.success) {
        setCommunities(data.data);
      } else {
        setError(data.message || "Failed to fetch communities");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchChallenges();
      fetchInspirations();
      fetchContacts();
      fetchCommunities();
    }
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
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      return setError("Notification Title and Message Body are required");
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const BASE = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("bhava_token");

    try {
      const res = await fetch(`${BASE}/api/notifications/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          body: formData.description
        })
      });
      const resData = await res.json();

      if (resData.success) {
        setSuccess("Push notification sent successfully to all users!");
        setFormData((prev) => ({ ...prev, title: "", description: "" }));
      } else {
        setError(resData.message || "Failed to send notification.");
        if (resData.error) {
          setError(resData.message + ": " + resData.error);
        }
      }
    } catch (err) {
      setError("Error sending notification. Connection failed. " + err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleAddCommunity = async (e) => {
    e.preventDefault();
    if (!formData.title) return setError("Community Name is required");

    setLoading(true);
    setError("");
    setSuccess("");

    const BASE = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("bhava_token");

    try {
      const res = await fetch(`${BASE}/api/community`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.title,
          description: formData.description,
          coverImage: formData.image, // Use URL variant for simplicity for now
          contentBlocks: contentBlocks
        })
      });
      const data = await res.json();

      if (data.success) {
        setSuccess("Community Group created successfully!");
        setFormData({ title: "", description: "", image: "", badgeText: "", durationText: "", fullSubtitle: "", detailsLongDescription: "" });
        setContentBlocks([{ type: "text", value: "" }]);
        fetchCommunities();
      } else {
        setError(data.message || "Failed to create community");
      }
    } catch (err) {
      setError("Error creating community. Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTile = async (e) => {
    e.preventDefault();
    
    if (activeTab === "Community Groups") {
      return handleAddCommunity(e);
    }

    if (activeTab === "Push Notifications") {
      return handleSendNotification(e);
    }

    if (activeTab === "Daily Inspiration") {
      return handleAddInspiration(e);
    }

    if (!formData.title) return setError("Title is required");

    setLoading(true);
    setError("");
    setSuccess("");

    const BASE = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("bhava_token");

    const data = new FormData();
    // Basic fields
    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        data.append(key, formData[key]);
      }
    });

    data.append("category", activeTab);
    data.append("hosts", JSON.stringify(hosts));

    // Sessions metadata and files
    const sessionsMetadata = sessions.map((s) => {
      const { audioUrl, ...rest } = s;
      return { ...rest, audioUrl: typeof audioUrl === "string" ? audioUrl : "" };
    });
    data.append("sessions", JSON.stringify(sessionsMetadata));

    // Main image file
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    } else if (formData.image) {
      data.append("image", formData.image);
    }

    // Audio files
    sessions.forEach((s, i) => {
      if (s.audioUrl instanceof File) {
        data.append(`audio_${i}`, s.audioUrl);
      }
    });

    try {
      const res = await fetch(`${BASE}/api/challenges`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });
      const resData = await res.json();
      console.log("Creation Response:", resData);

      if (resData.success) {
        setSuccess("Tile saved successfully into MongoDB!");
        setFormData({ 
          title: "", description: "", image: "", badgeText: "", durationText: "",
          fullSubtitle: "", detailsLongDescription: "" 
        });
        setHosts([{ name: "", title: "", initials: "" }]);
        setSessions([{ title: "", subtitle: "", audioUrl: "", tags: "" }]);
        fetchChallenges();
      } else {
        setError(resData.message || "Server Error: See console for details");
        console.error("Creation Failure:", resData);
      }
    } catch (err) {
      console.error("Network or Parsing Error:", err);
      setError("Error adding tile. " + err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleAddInspiration = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      return setError("Source (Title) and Content (Description) are required");
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const BASE = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("bhava_token");

    try {
      const res = await fetch(`${BASE}/api/inspirations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          source: formData.title,
          content: formData.description,
          author: formData.fullSubtitle || ""
        })
      });
      const resData = await res.json();

      if (resData.success) {
        setSuccess("Daily Inspiration saved successfully!");
        setFormData({ 
          title: "", description: "", image: "", badgeText: "", durationText: "",
          fullSubtitle: "", detailsLongDescription: "" 
        });
        fetchInspirations();
      } else {
        setError(resData.message || "Failed to add inspiration");
      }
    } catch (err) {
      setError("Error adding inspiration. Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    setLoading(true);
    setError("");
    setSuccess("");

    const BASE = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("bhava_token");

    const endpoint = activeTab === "Daily Inspiration" 
      ? `${BASE}/api/inspirations/${id}` 
      : `${BASE}/api/challenges/${id}`;

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setSuccess("Deleted successfully!");
        if (activeTab === "Daily Inspiration") fetchInspirations();
        else fetchChallenges();
      } else {
        setError(data.message || "Failed to delete");
      }
    } catch (err) {
      setError("Error deleting. Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResolveContact = async (id) => {
    if (!window.confirm("Mark this query as resolved and remove it?")) return;

    setLoading(true);
    setError("");
    setSuccess("");

    const BASE = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("bhava_token");

    try {
      const res = await fetch(`${BASE}/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setSuccess("Query resolved successfully!");
        fetchContacts();
      } else {
        setError(data.message || "Failed to resolve query");
      }
    } catch (err) {
      setError("Error resolving query. Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetHero = async (id) => {
    if (!window.confirm("Set this as the main Home Hero challenge? This will replace the current one.")) return;

    setLoading(true);
    setError("");
    setSuccess("");

    const BASE = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("bhava_token");

    try {
      const res = await fetch(`${BASE}/api/challenges/${id}/hero`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setSuccess("New Home Hero set successfully!");
        fetchChallenges();
      } else {
        setError(data.message || "Failed to set hero");
      }
    } catch (err) {
      setError("Error setting hero. Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const filteredChallenges = activeTab === "Daily Inspiration" 
    ? inspirations 
    : activeTab === "Community Groups"
    ? communities
    : activeTab === "User Queries"
    ? contacts
    : activeTab === "Push Notifications"
    ? []
    : challenges.filter((c) => c.category === activeTab);

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
            <h3>{activeTab === "Daily Inspiration" ? "Add New Quote" : "Configure Dynamic Content"}</h3>
            <p className={styles.formHint}>
              {activeTab === "Daily Inspiration" 
                ? "Manage spiritual quotes that appear in the 'Daily Inspiration' carousel on the app." 
                : activeTab === "Push Notifications"
                ? "Send a real-time push notification to every user who has the Bhava app installed."
                : "Fill this to generate the Stage 1 (Detail) and Stage 2 (Player) views."}
            </p>
            
            {activeTab !== "User Queries" && (
              <form onSubmit={handleAddTile} className={styles.form}>
                <div className={styles.formSection}>
                  <h4>1. {activeTab === "Daily Inspiration" ? "Inspiration Content" : "Basic Tile Info"}</h4>
                  <div className={styles.inputGroup}>
                    <label>{activeTab === "Daily Inspiration" ? "Source/Topic *" : "Content Title *"}</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder={activeTab === "Daily Inspiration" ? "e.g. BHAGAVAD GITA" : "e.g. Daily Pooja"} required />
                  </div>
                  
                  {activeTab === "Community Groups" ? (
                    <>
                      <div className={styles.inputGroup}>
                        <label>Group Name *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Daily Meditation Sangha" required />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Short Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="2" placeholder="Tell people what this group is about..." />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Cover Image URL</label>
                        <input type="text" name="image" value={typeof formData.image === 'string' ? formData.image : ''} onChange={handleChange} placeholder="https://..." />
                      </div>

                      <div className={styles.formSection}>
                        <h4>Content Blocks (Detailed Page)</h4>
                        {contentBlocks.map((block, index) => (
                          <div key={index} className={styles.arrayItemCard}>
                            <div className={styles.itemHeader}>
                              <span>Block #{index + 1}</span>
                              <button type="button" onClick={() => removeBlock(index)} className={styles.removeBtn}>✕</button>
                            </div>
                            <div className={styles.row}>
                              <div className={styles.inputGroup}>
                                <label>Type</label>
                                <select name="type" value={block.type} onChange={(e) => handleBlockChange(index, e)}>
                                  <option value="text">Paragraph / Text</option>
                                  <option value="image">Image URL</option>
                                  <option value="video">Video URL (MP4/YouTube)</option>
                                </select>
                              </div>
                            </div>
                            <div className={styles.inputGroup}>
                              <label>{block.type === 'text' ? 'Content Text' : 'Media URL'}</label>
                              {block.type === 'text' ? (
                                <textarea name="value" value={block.value} onChange={(e) => handleBlockChange(index, e)} rows="3" placeholder="Enter text content..." />
                              ) : (
                                <input type="text" name="value" value={block.value} onChange={(e) => handleBlockChange(index, e)} placeholder="https://..." />
                              )}
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={addBlock} className={styles.addBtn}>+ Add Content Block</button>
                      </div>
                    </>
                  ) : activeTab === "Daily Inspiration" ? (
                    <>
                      <div className={styles.inputGroup}>
                        <label>Source / Script (e.g. BHAGAVAD GITA) *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter source..." required />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Author / Speaker (Optional)</label>
                        <input type="text" name="fullSubtitle" value={formData.fullSubtitle} onChange={handleChange} placeholder="Enter author..." />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Spiritual Quote Content *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Enter the inspiration quote here..." required />
                      </div>
                    </>
                  ) : activeTab === "Push Notifications" ? (
                    <>
                      <div className={styles.inputGroup}>
                        <label>Notification Title *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. New Challenge Available!" required />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Message Body *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Enter the message you want users to see..." required />
                      </div>
                    </>
                  ) : (
                    <>
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
                        <label>Background Image {formData.image instanceof File ? "(Selected)" : "URL"}</label>
                        <div className={styles.row}>
                          <input type="file" name="image" onChange={handleChange} accept="image/*" />
                          <input type="text" name="image" value={typeof formData.image === 'string' ? formData.image : ''} onChange={handleChange} placeholder="Or enter URL..." />
                        </div>
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Full Content Description (Stage 1)</label>
                        <textarea name="detailsLongDescription" value={formData.detailsLongDescription} onChange={handleChange} rows="4" placeholder="The long text that appears on the Stage 1 Detail page..." />
                      </div>
                    </>
                  )}
                  
                  {activeTab === "Daily Inspiration" && (
                    <div className={styles.inputGroup}>
                      <label>Author / Chapter (Optional)</label>
                      <input type="text" name="fullSubtitle" value={formData.fullSubtitle} onChange={handleChange} placeholder="e.g. Lord Krishna" />
                    </div>
                  )}
                </div>

                {activeTab !== "Daily Inspiration" && activeTab !== "Push Notifications" && (
                  <>
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
                            <div className={styles.inputGroup}>
                              <label>Audio File {session.audioUrl instanceof File ? "(Selected)" : ""}</label>
                              <input type="file" name="audioUrl" onChange={(e) => handleSessionChange(index, e)} accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac" />
                            </div>
                            <div className={styles.inputGroup}>
                              <label>Or Audio URL</label>
                              <input type="text" name="audioUrl" value={typeof session.audioUrl === 'string' ? session.audioUrl : ''} onChange={(e) => handleSessionChange(index, e)} placeholder="Audio URL (.mp3)" />
                            </div>
                          </div>
                          <div className={styles.inputGroup}>
                            <input type="text" name="tags" value={session.tags} onChange={(e) => handleSessionChange(index, e)} placeholder="Tags (comma separated e.g. Mantra, 108 BPM)" />
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={addSession} className={styles.addBtn}>+ Add Media Track</button>
                    </div>
                  </>
                )}

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? "Syncing..." : activeTab === "Community Groups" ? "Post Community Group" : activeTab === "Daily Inspiration" ? "Save Inspiration" : activeTab === "Push Notifications" ? "Push to All Users" : "Save Content Tile"}
                </button>
              </form>
            )}
          </div>

          <div className={styles.tilesList}>
            <h3>{activeTab === "User Queries" ? "Pending Customer Queries" : activeTab === "Daily Inspiration" ? "Managed Inspirations" : activeTab === "Push Notifications" ? "" : "Existing Tiles in MongoDB"}</h3>
            {activeTab !== "Push Notifications" && (
              loading && !filteredChallenges.length ? (
                <p>Fetching from database...</p>
              ) : filteredChallenges.length === 0 ? (
                <p className={styles.emptyText}>No content found for this section.</p>
              ) : (
                <div className={activeTab === "User Queries" ? styles.queryList : styles.grid}>
                  {filteredChallenges.map((item) => (
                    <div key={item._id} className={activeTab === "User Queries" ? styles.queryCard : styles.tileCard}>
                      {activeTab === "User Queries" ? (
                        <>
                          <div className={styles.queryHeader}>
                            <span className={styles.queryName}>{item.name}</span>
                            <span className={styles.queryDate}>{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className={styles.queryContact}>
                            <span>{item.mobile}</span> | <span>{item.email}</span>
                          </div>
                          <p className={styles.queryText}>{item.description}</p>
                          <button onClick={() => handleResolveContact(item._id)} className={styles.resolveBtn} disabled={loading}>
                            Mark as Resolved
                          </button>
                        </>
                      ) : (
                        <>
                          {activeTab !== "Daily Inspiration" && (
                            item.image ? (
                              <img src={item.image.startsWith('/') ? `${import.meta.env.VITE_API_URL || ''}${item.image}` : item.image} alt={item.title} className={styles.tileImg} />
                            ) : (
                              <div className={styles.tileImgPlaceholder}>No Image</div>
                            )
                          )}

                          <div className={styles.tileBody}>
                            {activeTab === "Community Groups" ? (
                              <>
                                <h4>{item.name}</h4>
                                <p className={styles.tileDesc}>{item.description}</p>
                                <div className={styles.tileMeta}>
                                  <span>{item.contentBlocks?.length || 0} Content Blocks</span>
                                  <span>Invite Link: {item.shareLink?.substring(0, 8)}...</span>
                                </div>
                                <div className={styles.actionRow}>
                                  <button onClick={() => handleDeleteTile(item._id)} className={styles.deleteBtn} disabled={loading}>
                                    Delete Group
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <h4>{activeTab === "Daily Inspiration" ? item.source : item.title}</h4>
                                <p className={styles.tileDesc}>
                                  {activeTab === "Daily Inspiration" ? item.content : item.description?.substring(0, 50) + "..."}
                                </p>
                                {activeTab === "Daily Inspiration" && item.author && (
                                   <p className={styles.tileAuthor}>— {item.author}</p>
                                )}
                                
                                {activeTab !== "Daily Inspiration" && (
                                  <div className={styles.tileMeta}>
                                    {item.badgeText && <span>{item.badgeText}</span>}
                                    {item.durationText && <span>{item.durationText}</span>}
                                    {item.isHero && <span className={styles.heroBadge}>⭐ MAIN HERO</span>}
                                  </div>
                                )}
                                <div className={styles.actionRow}>
                                  <button onClick={() => handleDeleteTile(item._id)} className={styles.deleteBtn} disabled={loading}>
                                    Delete {activeTab === "Daily Inspiration" ? "Quote" : "Tile"}
                                  </button>
                                  {activeTab === "Active Challenges" && !item.isHero && (
                                    <button onClick={() => handleSetHero(item._id)} className={styles.heroBtn} disabled={loading}>
                                      Set as Main Hero
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

