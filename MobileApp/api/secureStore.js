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