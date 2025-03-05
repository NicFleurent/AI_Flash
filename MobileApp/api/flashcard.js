import { getLocalUser } from "./secureStore";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

/**
 * Récupérer toutes les flashcards d'une collection spécifique.
 * @param {string} collection_id - L'ID de la collection.
 * @returns {Promise<Object>} - Les flashcards de la collection.
 */
export const getFlashCards = async (collection_id) => {
  const user = await getLocalUser();
  const token = user?.token;

  try {
    const response = await fetch(`${baseUrl}flashcards/${collection_id}`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Créer une nouvelle flashcard.
 * @param {Object} flashcardData - Les données de la flashcard à créer.
 * @returns {Promise<Object>} - La flashcard créée.
 */
export const createFlashcard = async (flashcardData) => {
  const user = await getLocalUser();
  const token = user?.token;

  try {
    const response = await fetch(`${baseUrl}flashcards`, {
      method: 'POST',
      body: JSON.stringify(flashcardData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status === 201) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Mettre à jour une flashcard existante.
 * @param {string} id - L'ID de la flashcard à mettre à jour.
 * @param {Object} flashcardData - Les nouvelles données de la flashcard.
 * @returns {Promise<Object>} - La flashcard mise à jour.
 */
export const updateFlashcard = async (id, flashcardData) => {
  const user = await getLocalUser();
  const token = user?.token;

  try {
    const response = await fetch(`${baseUrl}flashcards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(flashcardData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Supprimer une flashcard.
 * @param {string} id - L'ID de la flashcard à supprimer.
 * @returns {Promise<Object>} - Un message de succès ou d'erreur.
 */
export const deleteFlashcard = async (id) => {
  const user = await getLocalUser();
  const token = user?.token;

  try {
    const response = await fetch(`${baseUrl}flashcards/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

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

export const updateRememberedFlashcard = async (id) => {
  try {
    const user = await getLocalUser();

    const response = await fetch(`${baseUrl}flashcards/remembered`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    
    const data = await response.json();

    if(response.status === 200){
      return data;
    }
    else
      throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateForgottenFlashcard = async (id) => {
  try {
    const user = await getLocalUser();

    const response = await fetch(`${baseUrl}flashcards/forgotten`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    
    const data = await response.json();

    if(response.status === 200){
      return data;
    }
    else
      throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};