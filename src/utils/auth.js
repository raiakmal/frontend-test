const USER_CREDENTIAL = {
  username: "raiakmal",
  password: "@Rai12345",
  name: "Rai Akmal",
};

export function login({ username, password }) {
  if (
    username === USER_CREDENTIAL.username &&
    password === USER_CREDENTIAL.password
  ) {
    const userData = {
      username,
      name: USER_CREDENTIAL.name,
      isLoggedIn: true,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true };
  }
  return { success: false, message: "Username atau password salah" };
}

export function logout() {
  localStorage.removeItem("user");
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  const user = getUser();
  return user && user.isLoggedIn;
}
