const serverURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://mern-auth-demo-backend.vercel.app";

export { serverURL };
