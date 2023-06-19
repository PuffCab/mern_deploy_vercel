import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
// import { serverURL } from "../utils/serverURL";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<RegistrationCredentials>({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("event", e.target.files?.[0]);
    const file = e.target.files?.[0] || "";
    setSelectedFile(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log([e.target.name], e.target.value);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const submitPicture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/imageUpload",
        requestOptions
      );

      // const response = await fetch(
      //   `https://mern-deploy-vercel-phi.vercel.app/api/users/imageUpload`,
      //   requestOptions
      // );
      // const response = await fetch(
      //   `${serverURL}/api/users/imageUpload`,
      //   requestOptions
      // );
      if (response.ok) {
        const result = await response.json();

        setNewUser({ ...newUser, avatar: result.avatar });
        console.log("result", result);
      }
    } catch (error) {
      console.log("error uploading picture", error);
    }
  };

  const register = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    console.log("newUser", newUser);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append(
      "avatar",
      newUser.avatar
        ? newUser.avatar
        : "https://st4.depositphotos.com/11634452/41441/v/600/depositphotos_414416680-stock-illustration-picture-profile-icon-male-icon.jpg"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/register",
        requestOptions
      );
      // const response = await fetch(
      //   `https://mern-deploy-vercel-phi.vercel.app/api/users/register`,
      //   requestOptions
      // );
      // const response = await fetch(
      //   `${serverURL}/api/users/register`,
      //   requestOptions
      // );
      const result = await response.json();
      console.log("register success>>>", result);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <div>
        <div className="input-container">
          <label htmlFor="userName">user name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            onChange={handleInputChange}
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
          />
        </div>

        <form onSubmit={submitPicture} className="file-upload-container">
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleAttachFile}
          />
          <button type="submit">send picture</button>
          {newUser && (
            <div>
              <img src={newUser.avatar} alt="" className="uploaded-image" />
            </div>
          )}
        </form>
        <button onClick={register}>register</button>
      </div>
    </div>
  );
};

export default Register;
