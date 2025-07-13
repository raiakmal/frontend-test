const KEY = "users-data";

// Ambil semua data
export function getUsers() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

// Simpan seluruh data
export function saveUsers(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// Tambah data
export function addUser(user) {
  const users = getUsers();
  const newUser = { id: Date.now(), ...user };
  users.push(newUser);
  saveUsers(users);
}

// Update data
export function updateUser(id, updated) {
  const users = getUsers().map((u) => (u.id === id ? { ...u, ...updated } : u));
  saveUsers(users);
}

// Hapus data
export function deleteUser(id) {
  const users = getUsers().filter((u) => u.id !== id);
  saveUsers(users);
}

// Ambil 1 data by ID
export function getUserById(id) {
  return getUsers().find((u) => u.id === id);
}
