import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const LOGIN_URL = API_URL + "/api/auth/login";

export type User = {
  confirmPassword: string;
  username: string;
  password: string;
  email: string;
  roles?: string[];
};

export type UserToUpdate = {
  username: string;
  email: string;
  roles?: string[];
};

interface LoginResponse {
  username: string;
  token: string;
  roles: Array<string>;
}

interface CreateRequest {
  username: string;
  password: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export type CinemaToUpdate = {
  name: string;
}

const authProvider = {
  isAuthenticated: false,
  async signIn(user_: LoginRequest): Promise<LoginResponse> {
    const options = makeOptions("POST", user_);
    const res = await fetch(LOGIN_URL, options);
    return handleHttpErrors(res);
  },
  async create(user_: User): Promise<LoginResponse> {
    const options = makeOptions("POST", user_);
    const CREATE_URL = API_URL + "/api/user-with-role";
    const res = await fetch(CREATE_URL, options);
    return handleHttpErrors(res);
  },
};

export type { LoginResponse, LoginRequest, CreateRequest };
export { authProvider };
