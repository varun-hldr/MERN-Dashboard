import { publicFetch } from "./fetch";

export async function login(user) {
  const { data } = await publicFetch.post("auth/login", user);
  return data;
}

export async function register(user) {
  const { data } = await publicFetch.post("auth/register", user);
  return data;
}
export async function getAllUser() {
  // const response = await fetch(URL + "users", {
  //   method: "GET",
  // })
  //   .then((res) => res.json())
  //   .then((data) => data);
  // console.log(response);
  // try {
  //   await fetch(URL + "session", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // } catch (error) {
  //   console.log(error);
  // }
  const { data } = await publicFetch.get("signup");
  console.log(data);
}

export const getSessionUser = async (token) => {
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMjg0NjUxYTRiZjExMjUwYzIxOTk5YyIsIm5hbWUiOiJWYXJ1biBIYWxkaGFyIiwiZW1haWwiOiJ2YXJ1bkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJdU9HbDFHUzlTWFBaU3dLTTlmUnB1NlZsbjR1b2Jyb1RBbTNtaWpzRUVjekxOSUxPWllqZSIsImRhdGUiOiIyMDIxLTAyLTEzVDIxOjM2OjE3LjQ4OVoiLCJfX3YiOjB9LCJpYXQiOjE2MTMyODY5MjF9.lG6odBcPp6i9arZCUX1iFypm1vwkSa0vv8UtCPWWw2U";
  try {
    const response = await fetch(URL + "post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => data);
    console.log(response.user);
  } catch (error) {
    console.log(error);
  }
};
