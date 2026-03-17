// import the types for the forms
// that means that we are waiting for datas that are built with loginFormData type, make sure all fileds are filled with the right type

// →→→  LOGIN FORM  ←←←

import type { LoginFormData } from "../types/forms";

export const loginUser = async (dataForm: LoginFormData) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataForm),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }
  return data;
};

// →→→  REGISTER FORM  ←←←

import type { RegisterFormData } from "../types/forms";

export const registerUser = async (dataForm: RegisterFormData) => {
  const API_URL = import.meta.env.VITE_API_URL;

  // from the DOM we can't send a JSON with the file, we need to use FormData

  // it's pure JavaScript to handle the multipart/form-data content type, we can't type it with TypeScript, but we can use it in our function to send the data to the server

  const formData = new FormData();
  formData.append("email", dataForm.email);
  formData.append("username", dataForm.username);
  formData.append("password", dataForm.password);
  formData.append("acceptPolicy", String(dataForm.acceptPolicy));
  // we can add the avatar only if the user has uploaded one, because it's optional
  if (dataForm.avatar) {
    formData.append("avatar", dataForm.avatar);
  }

  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

//  →→→  GET ME  ←←←

export const getMe = async (token: string) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Impossible de récupérer l'utilisateur.");
  }

  return data;
};
