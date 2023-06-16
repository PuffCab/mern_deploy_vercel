import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { checkUserStatus } from "../utils/checkUserStatus";

type Props = {};
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

const Login = (props: Props) => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

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
      const response = await fetch(
        "http://localhost:5001/api/users/login",
        requestOptions
      );

      if (response.ok) {
        const result: FetchResutl = await response.json();
        console.log("login sucess>>>>", result);

        const { msg, token, user } = result;

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
