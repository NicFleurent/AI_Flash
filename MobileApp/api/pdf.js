import { getLocalUser } from "./secureStore";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;


export const sendPdf = async (file) => {
    const user = await getLocalUser();
    const token = user?.token;
  
    const formData = new FormData();
    formData.append('pdf', {
      uri: file.assets[0].uri,
      name: file.assets[0].name,
      type: file.assets[0].mimeType,
    });
  
    try {
      const response = await fetch(`${baseUrl}extract`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier :", error);
      throw error;
    }
};