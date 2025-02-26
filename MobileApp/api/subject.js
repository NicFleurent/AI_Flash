const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getSubjects = async () => {
  try {
    const response = await fetch(`${baseUrl}getUserSubjects`, {
      method: 'GET',
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

export const createSubject = async (name) => {
  try {
    const response = await fetch(`${baseUrl}createUserSubject`, {
      method: 'POST',
      body: JSON.stringify({ subject_name: name }),
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