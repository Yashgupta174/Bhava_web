// ── State Management ──────────────────────────────────────────
let challenges = [];
let editingId = null;
let token = localStorage.getItem("bhava_admin_token") || null;

// API Config
const API_URL = "/api"; 

// ── DOM Elements ─────────────────────────────────────────────
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const challengeList = document.getElementById("challenge-list");
const modal = document.getElementById("challenge-modal");
const challengeForm = document.getElementById("challenge-form");
const hostsContainer = document.getElementById("hosts-container");
const sessionsContainer = document.getElementById("sessions-container");

// ── Initial State ────────────────────────────────────────────
if (token) {
    showDashboard();
}

// ── Authentication ───────────────────────────────────────────
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.success) {
            token = data.token;
            localStorage.setItem("bhava_admin_token", token);
            showDashboard();
        } else {
            alert(data.message || "Login failed");
        }
    } catch (err) {
        alert("Server error connecting to API");
    }
});

function showDashboard() {
    loginSection.classList.add("hidden");
    dashboardSection.classList.remove("hidden");
    fetchChallenges();
}

document.getElementById("btn-logout").addEventListener("click", () => {
    token = null;
    localStorage.removeItem("bhava_admin_token");
    dashboardSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
});

// ── CRUD Operations ──────────────────────────────────────────
async function fetchChallenges() {
    challengeList.innerHTML = '<div class="loading">Loading sacred journeys...</div>';
    try {
        const res = await fetch(`${API_URL}/challenges`);
        const data = await res.json();
        if (data.success) {
            challenges = data.data;
            renderChallenges();
        }
    } catch (err) {
        challengeList.innerHTML = '<div class="error">Failed to load challenges.</div>';
    }
}

function renderChallenges() {
    challengeList.innerHTML = challenges.map(c => `
        <div class="challenge-card">
            <img src="${c.image || 'https://via.placeholder.com/400x200'}" class="card-img" alt="${c.title}">
            <div class="card-info">
                <h3 class="card-title">${c.title}</h3>
                <p class="card-meta">${c.category} • ${c.durationText || 'N/A'}</p>
                <div class="card-actions">
                    <button onclick="editChallenge('${c._id}')" class="btn-small">Edit</button>
                    <button onclick="deleteChallenge('${c._id}')" class="btn-small danger">Delete</button>
                </div>
            </div>
        </div>
    `).join("");
}

// ── Form & Modal Logic ───────────────────────────────────────
document.getElementById("btn-add-challenge").addEventListener("click", () => {
    editingId = null;
    challengeForm.reset();
    hostsContainer.innerHTML = "";
    sessionsContainer.innerHTML = "";
    document.getElementById("modal-title").innerText = "Add New Challenge";
    modal.classList.remove("hidden");
});

document.querySelector(".close-modal").addEventListener("click", () => {
    modal.classList.add("hidden");
});

function editChallenge(id) {
    const challenge = challenges.find(c => c._id === id);
    if (!challenge) return;

    editingId = id;
    document.getElementById("modal-title").innerText = "Edit Challenge";
    
    document.getElementById("c-title").value = challenge.title;
    document.getElementById("c-description").value = challenge.description || "";
    document.getElementById("c-image").value = challenge.image || "";
    document.getElementById("c-category").value = challenge.category || "";
    document.getElementById("c-joined").value = challenge.joinedCount || "";
    document.getElementById("c-duration").value = challenge.durationText || "";
    document.getElementById("c-badge").value = challenge.badgeText || "";

    // Clear and Fill Dynamic Sections
    hostsContainer.innerHTML = "";
    (challenge.hosts || []).forEach(h => addHostRow(h));

    sessionsContainer.innerHTML = "";
    (challenge.sessions || []).forEach(s => addSessionRow(s));

    modal.classList.remove("hidden");
}

async function deleteChallenge(id) {
    if (!confirm("Are you sure you want to delete this challenge?")) return;
    try {
        const res = await fetch(`${API_URL}/challenges/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) fetchChallenges();
    } catch (err) {
        alert("Error deleting challenge");
    }
}

// ── Dynamic Dynamic Rows (Add/Remove) ────────────────────────
document.getElementById("add-host").addEventListener("click", () => addHostRow());
document.getElementById("add-session").addEventListener("click", () => addSessionRow());

function addHostRow(data = {}) {
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.innerHTML = `
        <div class="row-header">Host<span class="remove-row" onclick="this.parentElement.parentElement.remove()">Remove</span></div>
        <div class="input-row">
            <input type="text" class="h-name" placeholder="Host Name" value="${data.name || ''}" required>
            <input type="text" class="h-initials" placeholder="Initials (e.g. AR)" value="${data.initials || ''}">
        </div>
        <div class="input-row">
            <input type="text" class="h-title" placeholder="Title (e.g. Vedic Counsellor)" value="${data.title || ''}">
            <input type="color" class="h-color" value="${data.avatarColor || '#FF9800'}">
        </div>
    `;
    hostsContainer.appendChild(div);
}

function addSessionRow(data = {}) {
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.innerHTML = `
        <div class="row-header">Session<span class="remove-row" onclick="this.parentElement.parentElement.remove()">Remove</span></div>
        <div class="input-row">
            <input type="text" class="s-title" placeholder="Session Title" value="${data.title || ''}" required>
            <input type="number" class="s-day" placeholder="Day #" value="${data.day || ''}">
        </div>
        <input type="text" class="s-subtitle" placeholder="Subtitle" value="${data.subtitle || ''}">
        <input type="text" class="s-audio" placeholder="Audio URL" value="${data.audioUrl || ''}">
        <input type="text" class="s-duration" placeholder="Duration (e.g. 19 min)" value="${data.duration || ''}">
    `;
    sessionsContainer.appendChild(div);
}

// ── Form Submission ──────────────────────────────────────────
challengeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        title: document.getElementById("c-title").value,
        description: document.getElementById("c-description").value,
        image: document.getElementById("c-image").value,
        category: document.getElementById("c-category").value || "New",
        joinedCount: document.getElementById("c-joined").value,
        durationText: document.getElementById("c-duration").value,
        badgeText: document.getElementById("c-badge").value,
        hosts: [],
        sessions: []
    };

    // Collect Hosts
    hostsContainer.querySelectorAll(".dynamic-row").forEach(row => {
        payload.hosts.push({
            name: row.querySelector(".h-name").value,
            initials: row.querySelector(".h-initials").value,
            title: row.querySelector(".h-title").value,
            avatarColor: row.querySelector(".h-color").value
        });
    });

    // Collect Sessions
    sessionsContainer.querySelectorAll(".dynamic-row").forEach(row => {
        payload.sessions.push({
            title: row.querySelector(".s-title").value,
            day: row.querySelector(".s-day").value,
            subtitle: row.querySelector(".s-subtitle").value,
            audioUrl: row.querySelector(".s-audio").value,
            duration: row.querySelector(".s-duration").value
        });
    });

    try {
        const method = editingId ? "PATCH" : "POST";
        const url = editingId ? `${API_URL}/challenges/${editingId}` : `${API_URL}/challenges`;
        
        const res = await fetch(url, {
            method: method,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
            modal.classList.add("hidden");
            fetchChallenges();
        } else {
            alert(data.message || "Error saving challenge");
        }
    } catch (err) {
        alert("Server error saving data");
    }
});
