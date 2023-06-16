const serverURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5174"
    : "https://mern-auth-demo-backend.vercel.app";

export { serverURL };
