import createRefresh from "react-auth-kit/createRefresh";
import { IUser } from "../types/UserType";
import { firebaseRefreshToken, handleFirebaseLogin } from "./firebase";
import axios from "axios";

export const login = async () => {
  const result = await handleFirebaseLogin();

  // returns existing user if he already signed up

  return res.data as IUser;
};

export const signUp = async () => {
  const result = await handleFirebaseLogin();

  // creates user in UserService, returns 400 if already created
  const res = await axios.post(
    "http://localhost:4040/api/UserService/users",
    {},
    {
      headers: { Authorization: `Bearer ${result.user.accessToken}` },
    }
  );
  // TODO: since 400 means user is already created, maybe log him anyways
  if (res.status == 400) {
    return null;
  }

  return res.data as IUser;
};

export const refresh = createRefresh({
  interval: 10, // The time in sec to refresh the Access token,
  refreshApiCallback: async (param) => {
    try {
      const result = await firebaseRefreshToken(param.refreshToken);
      return {
        isSuccess: true,
        newAuthToken: result?.data.id_token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
        //newRefreshToken: result?.data.refresh_token,
      };
    } catch (error) {
      console.error("ERROR BLA BLA:", error);
      return {
        isSuccess: false,
      };
    }
  },
});
