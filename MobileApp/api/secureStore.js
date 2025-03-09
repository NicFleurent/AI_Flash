import * as SecureStore from "expo-secure-store";

export const saveLocalUser = async (user) => {
      try {
        user_json = JSON.stringify(user);
        await SecureStore.setItemAsync("user", user_json);
      } catch (e) {
        console.error("secureStore.error.save");
      }
};

export const getLocalUser = async () => {
  try {
    const user_json = await SecureStore.getItemAsync("user");
    const user = JSON.parse(user_json)
    if (user !== null) {
      return user;
    }
  } catch (e) {
    console.error("secureStore.error.get");
  }
};

export const deleteLocalUser = async () => {
  try {
    await SecureStore.deleteItemAsync("user");
  } catch (e) {
    console.error("secureStore.error.delete");
  }
}

export const saveToStorage = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`Saved ${key}: ${value}`);
  } catch (error) {
    console.error("Error saving to Secure Store:", error);
  }
};


export const getFromStorage = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    console.log(`Retrieved ${key}: ${value}`);
    return value;
  } catch (error) {
    console.error("Error retrieving from Secure Store:", error);
    return null;
  }
};

export const deleteFromStorage = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`Deleted ${key}`);
  } catch (error) {
    console.error("Error deleting from Secure Store:", error);
  }
};