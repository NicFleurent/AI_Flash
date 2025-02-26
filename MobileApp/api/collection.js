const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getCollections = async (subject_id) => {
  try {
    const response = await fetch(`${baseUrl}getUserCollections/${subject_id}`, {
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

export const editSubject = async (id, name) => {
  try {
    const response = await fetch(`${baseUrl}editUserSubject`, {
      method: 'POST',
      body: JSON.stringify({ subject_id: id, subject_name: name }),
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