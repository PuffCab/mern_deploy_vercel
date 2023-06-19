import { MouseEvent, useState } from "react";
import { checkUserStatus } from "../utils/checkUserStatus";
// import { serverURL } from "../utils/serverURL";

const Profile = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [noTokenError, setNoTokenError] = useState<string>("");

  const getProfile = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log("e", e);
    const token = checkUserStatus();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        // const response = await fetch(
        //   "http://localhost:5001/api/users/userProfile",
        //   requestOptions
        // );
        const response = await fetch(
          `https://test-deploy-server-flame.vercel.app/api/users/userProfile`,
          requestOptions
        );
        // const response = await fetch(
        //   `${serverURL}/api/users/userProfile`,
        //   requestOptions
        // );
        console.log("response", response);

        if (response.ok) {
          const result = await response.json();
          console.log("result", result);
          setUserProfile(result.user);
        }
        if (!response.ok && response.statusText === "Unauthorized") {
          setNoTokenError("You aren't authorized to see this profile");
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setNoTokenError("You are logged out, log in again");
    }
  };
  return (
    <div>
      <h1>User Profile</h1>
      <button onClick={getProfile}>Get user Profile</button>
      {userProfile && (
        <div>
          <p>Name: {userProfile.userName}</p>
          <p>email: {userProfile.email}</p>
          <img src={userProfile.avatar} alt="" className="avatar-picture" />
        </div>
      )}
      {noTokenError && <h3>{noTokenError}</h3>}
    </div>
  );
};

export default Profile;
