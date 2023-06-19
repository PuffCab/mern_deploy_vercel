//REVIEW [epic=deploy, seq=5] to switch between working locally and with deployed URL, we could add some logic to detect in which mode we are
// The deployed URL could also be stored as .env variable, to hide it from the public.
// const serverURL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5001"
//     : "https://mern-deploy-kangaroos-server.vercel.app";

const serverURL = 0;
export { serverURL };
