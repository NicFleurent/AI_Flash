const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const login = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}login`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};