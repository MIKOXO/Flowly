// Global store for mock data
let Data = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  tasks: JSON.parse(localStorage.getItem("allTasks") || "{}"),
};

// Save to localStorage periodically to persist data
const saveToLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(Data.users));
  localStorage.setItem("allTasks", JSON.stringify(Data.tasks));
};

// Load from localStorage on initialization
const loadFromLocalStorage = () => {
  Data.users = JSON.parse(localStorage.getItem("users") || "[]");
  Data.tasks = JSON.parse(localStorage.getItem("allTasks") || "{}");
};

// Initialize from localStorage
loadFromLocalStorage();

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const storageService = {
  // User-related methods
  async getAllUsers() {
    await delay(50);
    return Data.users;
  },

  async getUserByEmail(email) {
    await delay(50);
    return Data.users.find((user) => user.email === email);
  },

  async createUser(userData) {
    await delay(100);
    const existingUser = Data.users.find(
      (user) => user.email === userData.email
    );
    if (existingUser) {
      throw new Error("User already exists");
    }

    Data.users.push(userData);
    saveToLocalStorage();
    return userData;
  },

  async authenticateUser(email, password) {
    await delay(100);
    const user = Data.users.find(
      (user) => user.email === email && user.password === password
    );
    return user;
  },

  // Task-related methods
  async getUserTasks(email) {
    await delay(50);
    return Data.tasks[email] || [];
  },

  async saveUserTasks(email, tasks) {
    await delay(100);
    if (!Data.tasks[email]) {
      Data.tasks[email] = [];
    }
    Data.tasks[email] = tasks;
    saveToLocalStorage();
    return tasks;
  },

  async updateUserTasks(email, tasks) {
    await delay(100);
    Data.tasks[email] = tasks;
    saveToLocalStorage();
    return tasks;
  },

  async deleteUser(email) {
    await delay(100);
    Data.users = Data.users.filter((user) => user.email !== email);
    delete Data.tasks[email];
    saveToLocalStorage();
  },
};
