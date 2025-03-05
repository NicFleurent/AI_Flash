import { getLocalUser } from "./secureStore";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getSubjects = async () => {
  const user = await getLocalUser()
  const token = user?.token

  try {
    const response = await fetch(`${baseUrl}getUserSubjects?user_id=${encodeURIComponent(user.id)}`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if(response.status === 200)
      return data;
    else
      throw new Error(data.message);

  } catch (error) {
    console.log('In get user subjects -- ERROROROROOROROR')

    throw new Error(error.message);
  }
};

export const createSubject = async (subject_name) => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}createSubject`, {
      method: 'POST',
      body: JSON.stringify({ user_id: user.id, subject_name: subject_name }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

export const updateSubject = async (subject_id, subject_name) => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}updateSubject`, {
      method: 'POST',
      body: JSON.stringify({ subject_id: subject_id, subject_name: subject_name }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

export const deleteSubject = async (subject_id) => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}deleteSubject`, {
      method: 'POST',
      body: JSON.stringify({subject_id: subject_id}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

export const getAIflashcards = async (question) => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    // await fetch(`${baseUrl}getAIflashcards?question=${encodeURIComponent(question)}`
    const response = await fetch(`${baseUrl}getAIflashcards`, {
      method: 'POST',
      body: JSON.stringify({ question: question }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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