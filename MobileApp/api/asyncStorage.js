import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLocalData = async (key, object) => {
  const objectJson = JSON.stringify(object);

  try {
    await AsyncStorage.setItem(key, objectJson);
  } catch (e) {
    console.error("asyncStorage.error.save");
  }
};

export const getLocalData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value)
  } catch (e) {
    console.error("asyncStorage.error.save");
  }
};