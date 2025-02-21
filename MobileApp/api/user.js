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

    if(response.status === 200)
      return data;
    else
      throw new Error(data.message);

  } catch (error) {
    throw new Error(error.message);
  }
};

export const signin = async (
  email, 
  firstname,
  lastname,
  password,
  passwordConfirm
) => {
  try {
    const response = await fetch(`${baseUrl}register`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        firstname:firstname,
        lastname:lastname,
        password: password,
        password_confirmation:passwordConfirm
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();

    if(response.status === 200)
      return data;
    else
      throw new Error(data.message);

  } catch (error) {
    throw new Error(error.message);
  }
};