const USER_CREDENTIAL = {
  username: "raiakmal",
  password: "@Rai12345",
  name: "Rai Akmal",
};

// Fungsi login
export function login({ username, password }) {
  const existingUser = getUser();

  // Validasi username dan password
  if (username === USER_CREDENTIAL.username && password === USER_CREDENTIAL.password) {
    let userData;

    if (existingUser && existingUser.username === username) {
      // Gunakan data lama (termasuk nama yang sudah diedit)
      userData = {
        ...existingUser,
        isLoggedIn: true,
      };
    } else {
      // Buat user baru dengan nama default
      userData = {
        username,
        name: USER_CREDENTIAL.name,
        isLoggedIn: true,
      };
    }

    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true };
  }

  return { success: false, message: "Username atau password salah" };
}

// Logout user
export function logout() {
  const user = getUser();
  if (user) {
    const updatedUser = { ...user, isLoggedIn: false };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
}

// Ambil data user dari localStorage
export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Cek apakah user sudah login
export function isAuthenticated() {
  const user = getUser();
  return user && user.isLoggedIn;
}

// Update data user yang sedang login
export function updateCurrentUser(updatedFields) {
  const user = getUser();
  if (user) {
    const updatedUser = { ...user, ...updatedFields };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("user-updated"));
  }
}