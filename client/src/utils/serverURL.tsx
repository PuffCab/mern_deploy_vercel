const serverURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://mern-deploy-kangaroos-server.vercel.app/";

export { serverURL };
