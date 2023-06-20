//REVIEW[epic=deploy, seq=1] Get rid of all errors and warnings (unused import of react in ln2, unused state var in ln 23)
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { checkUserStatus } from "../utils/checkUserStatus";
// import { serverURL } from "../utils/serverURL";

type User = {
  userName: string;
  email: string;
  avatar?: string;
};

interface FetchResutl {
  msg: string;
  token: Token;
  user: User;
}

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [foo, setFoo] = useState(null);

  const [user, setUser] = useState<User | null>({
    userName: "",
    email: "",
    avatar: "",
  });
  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("loginCredentials>>>>", loginCredentials);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginCredentials.email);
    urlencoded.append("password", loginCredentials.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      //!fetching ONLY with local host
      const response = await fetch(
        "http://localhost:5001/api/users/login",
        requestOptions
      );

      //REVIEW[epic=deploy, seq=5] Once we deployed the server, we fetch the data from our API using vercel's URL+Endpoint
      //! fetching ONLY with deployed (server) URL
      // const response = await fetch(
      //   "https://mern-deploy-vercel-phi.vercel.app/api/users/login",
      //   requestOptions
      // );

      //! Fetching with either local or deployed URL.
      // const response = await fetch(
      //   `${serverURL}/api/users/login`,
      //   requestOptions
      // );
      console.log("response", response);

      if (response.ok) {
        const result: FetchResutl = await response.json();
        console.log("login sucess>>>>", result);

        const { token } = result;

        if (result.user && result.token) {
          localStorage.setItem("token", token);
          setUser(result.user);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    console.log("logged out");
  };

  useEffect(() => {
    checkUserStatus();
  }, [user]);

  return (
    <div>
      <h1>Login</h1>

      <div>
        <form onSubmit={submitLogin}>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="login-email"
            onChange={handleLoginInput}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="login-password"
            onChange={handleLoginInput}
          />
          <button type="submit">Login</button>
        </form>
        <button style={{ backgroundColor: "red" }} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Login;
