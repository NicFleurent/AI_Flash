import { getLocalUser } from "./secureStore";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getTodayFlashcardsCount = async () => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}flashcards/todayCount`, {
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
    throw new Error(error.message);
  }
};

export const getTodayFlashcards = async () => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}flashcards/today`, {
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
    throw new Error(error.message);
  }
};

export const getCollectionTodayFlashCards = async (collection_id) => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}flashcards/today/${collection_id}`, {
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
    throw new Error(error.message);
  }
};