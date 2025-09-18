// =========================
// AUTH PAGE LOGIC
// =========================

// --- Popup & form switching (existing behavior) ---
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnlogin-popup");
const iconClose = document.querySelector(".icon-close");

if (registerLink) {
  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    const loginBox = wrapper.querySelector(".form-box.login");
    const regBox = wrapper.querySelector(".form-box.register");
    if (loginBox) loginBox.classList.add("active");
    if (regBox) regBox.classList.add("active");
  });
}

if (loginLink) {
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    const loginBox = wrapper.querySelector(".form-box.login");
    const regBox = wrapper.querySelector(".form-box.register");
    if (loginBox) loginBox.classList.remove("active");
    if (regBox) regBox.classList.remove("active");
  });
}

if (btnPopup) {
  btnPopup.addEventListener("click", () => {
    wrapper.style.display = "flex";
    const loginBox = wrapper.querySelector(".form-box.login");
    if (loginBox) loginBox.style.display = "block";
  });
}

if (iconClose) {
  iconClose.addEventListener("click", () => {
    wrapper.style.display = "none"; // hide the entire login container
  });
}

// --- Close popup when clicking outside the box ---
window.addEventListener("click", (e) => {
  if (wrapper && e.target === wrapper) {
    wrapper.style.display = "none";
  }
});

// --- Password visibility toggle (icon only) ---
document.querySelectorAll(".input-box").forEach(inputBox => {
  const pwdInput = inputBox.querySelector('input[type="password"]');
  const iconSpan = inputBox.querySelector(".icon");

  if (pwdInput && iconSpan) {
    const ion = iconSpan.querySelector("ion-icon");

    const toggle = (e) => {
      e.preventDefault();
      if (pwdInput.type === "password") {
        pwdInput.type = "text";
        if (ion) ion.setAttribute("name", "lock-open");
      } else {
        pwdInput.type = "password";
        if (ion) ion.setAttribute("name", "lock-closed");
      }
    };

    iconSpan.style.cursor = "pointer";
    iconSpan.addEventListener("click", toggle);

    iconSpan.tabIndex = 0;
    iconSpan.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        toggle(ev);
      }
    });
  }
});

// --- Dark/Light mode toggle with background overlay ---
const darkModeToggle = document.getElementById("darkModeToggle");
let darkOverlay;

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      if (!darkOverlay) {
        darkOverlay = document.createElement("div");
        darkOverlay.style.position = "fixed";
        darkOverlay.style.top = "0";
        darkOverlay.style.left = "0";
        darkOverlay.style.width = "100%";
        darkOverlay.style.height = "100%";
        darkOverlay.style.background = "rgba(0, 0, 0, 0.6)";
        darkOverlay.style.zIndex = "-1";
        document.body.appendChild(darkOverlay);
      }
      darkModeToggle.textContent = "☀️";
    } else {
      if (darkOverlay) {
        darkOverlay.remove();
        darkOverlay = null;
      }
      darkModeToggle.textContent = "🌙";
    }
  });
}

// --- Registration and Login with localStorage ---
const registerForm = document.querySelector(".form-box.register form");
const loginForm = document.querySelector(".form-box.login form");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    if (!username || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      alert("User already exists with this email.");
    } else {
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! You can now login.");

      const loginBox = document.querySelector(".form-box.login");
      const regBox = document.querySelector(".form-box.register");
      if (loginBox && regBox) {
        loginBox.classList.remove("active");
        regBox.classList.remove("active");
      }
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
      alert("Login successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}

// =========================
// DASHBOARD PAGE LOGIC
// =========================

// --- Logout ---
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// --- Theme Toggle ---
const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

// --- Clock ---
if (document.getElementById("clock")) {
  function updateClock() {
    const now = new Date();
    document.getElementById("clock").textContent = now.toLocaleTimeString();
    document.getElementById("date").textContent = now.toDateString();
  }
  setInterval(updateClock, 1000);
  updateClock();
}

// --- Weather ---
const getWeatherBtn = document.getElementById("getWeather");
if (getWeatherBtn) {
  getWeatherBtn.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;

    fetch(`https://wttr.in/${city}?format=%C+%t`)
      .then(res => res.text())
      .then(data => {
        document.getElementById("weatherResult").textContent = data;
      })
      .catch(() => {
        document.getElementById("weatherResult").textContent = "Error fetching weather.";
      });
  });
}

// --- To-Do List ---
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
if (todoInput && todoList) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((task, i) => {
      const li = document.createElement("li");
      li.textContent = task;
      li.addEventListener("click", () => {
        todos.splice(i, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      });
      todoList.appendChild(li);
    });
  }
  renderTodos();

  const addTodoBtn = document.getElementById("addTodo");
  if (addTodoBtn) {
    addTodoBtn.addEventListener("click", () => {
      if (todoInput.value.trim()) {
        todos.push(todoInput.value.trim());
        localStorage.setItem("todos", JSON.stringify(todos));
        todoInput.value = "";
        renderTodos();
      }
    });
  }
}

// --- Notes ---
const notesArea = document.getElementById("notesArea");
if (notesArea) {
  notesArea.value = localStorage.getItem("notes") || "";

  const saveNotesBtn = document.getElementById("saveNotes");
  if (saveNotesBtn) {
    saveNotesBtn.addEventListener("click", () => {
      localStorage.setItem("notes", notesArea.value);
      alert("Notes saved!");
    });
  }
}

// --- Calculator ---
const calcBtn = document.getElementById("calcBtn");
if (calcBtn) {
  calcBtn.addEventListener("click", () => {
    const expr = document.getElementById("calcInput").value;
    try {
      const result = eval(expr);
      document.getElementById("calcResult").textContent = "= " + result;
    } catch {
      document.getElementById("calcResult").textContent = "Error";
    }
  });
}

// =========================
// DASHBOARD-SPECIFIC LOGIC ADDED
// =========================

// Only run dashboard code if on dashboard page
if (document.body.classList.contains("dashboard-body")) {

  // --- Sidebar Navigation ---
  const sidebarLinks = document.querySelectorAll(".dashboard-sidebar a");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove("active-link"));
      link.classList.add("active-link");
      const target = link.getAttribute("href").substring(1);
      document.querySelectorAll(".dashboard-card").forEach(card => {
        card.style.display = card.id === target ? "block" : "none";
      });
    });
  });

  // Show first card by default
  const firstCard = document.querySelector(".dashboard-card");
  if (firstCard) firstCard.style.display = "block";

  // --- Dashboard Clock (separate from auth page clock) ---
  const dashClock = document.getElementById("dashClock");
  const dashDate = document.getElementById("dashDate");
  if (dashClock && dashDate) {
    function updateDashClock() {
      const now = new Date();
      dashClock.textContent = now.toLocaleTimeString();
      dashDate.textContent = now.toDateString();
    }
    setInterval(updateDashClock, 1000);
    updateDashClock();
  }

  // --- Dashboard Theme Toggle ---
  const dashboardThemeBtn = document.getElementById("dashboardThemeToggle");
  if (dashboardThemeBtn) {
    dashboardThemeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      dashboardThemeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
      localStorage.setItem("dashboardDarkMode", document.body.classList.contains("dark-mode"));
    });

    // Persistent dark mode
    if (localStorage.getItem("dashboardDarkMode") === "true") {
      document.body.classList.add("dark-mode");
      dashboardThemeBtn.textContent = "☀️";
    }
  }
}

// =========================
// SPLASH SCREEN LOGIC
// =========================
window.addEventListener("load", () => {
  const splash = document.querySelector(".splash-screen");
  if (splash) {
    setTimeout(() => {
      splash.classList.add("hidden");
    }, 2500); // logo shows for 2.5 seconds
  }
});
