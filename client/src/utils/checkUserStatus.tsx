const checkUserStatus = (): Token | null => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("user Logged in");
    return token;
  } else {
    console.log("user logged out");
    return null;
  }
};

export { checkUserStatus };
