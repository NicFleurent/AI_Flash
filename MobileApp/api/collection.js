import { getLocalUser } from "./secureStore";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getCollections = async (subject_id) => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}getUserCollections?subject_id=${subject_id}`, {
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

export const getTodayCollections = async () => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}collections/today`, {
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

export const createCollection = async (subject_id, collection_name) => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}createCollection`, {
      method: 'POST',
      body: JSON.stringify({ subject_id: subject_id, collection_name: collection_name }),
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

export const updateCollection = async (collection_id, collection_name, collection_isPublic) => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}updateCollection`, {
      method: 'POST',
      body: JSON.stringify({ collection_id: collection_id, collection_name: collection_name, collection_isPublic: collection_isPublic }),
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

export const deleteCollection = async (collection_id) => {
  const user = await getLocalUser()
  const token = user?.token
  try {
    const response = await fetch(`${baseUrl}deleteCollection`, {
      method: 'POST',
      body: JSON.stringify({collection_id: collection_id}),
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

export const getPublicCollections = async () => {
  const user = await getLocalUser();
  const token = user?.token;

  try {
    const response = await fetch(`${baseUrl}collections/public`, {
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

export const copyCollection = async (collection_id, subject_id, user_id) => {
  try {
    const user = await getLocalUser(); // Récupérez l'utilisateur local
    const token = user.token; // Assurez-vous que le token est correctement récupéré

    const response = await fetch(`${baseUrl}collections/copy`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Utilisez le token récupéré
      },
      body: JSON.stringify({
        collection_id: collection_id,
        subject_id: subject_id,
        user_id: user_id,
      }),
    });

    // Vérifiez le statut de la réponse
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la copie de la collection");
    }

    const data = await response.json();
    return data; // Retournez les données de la réponse
  } catch (error) {
    console.error("Erreur dans copyCollection:", error.message);
    throw new Error(error.message);
  }
};

// export const toggleCollectionVisibility = async (collection_id) => {
//   const user = await getLocalUser();
//   const token = user?.token;

//   try {
//     console.log("IN TOGGLE VISIBILITY API REACT NATIVE")
//     const response = await fetch(`${baseUrl}collections/${collection_id}/toggle-visibility`, {
//       method: 'PUT',
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();
//     if (response.status === 200) {
//       return data;
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (error) {
//     console.log(error.message)
//     throw new Error(error.message);
//   }
// };