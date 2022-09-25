import { useEffect, useState } from "react";
import axios from "axios"

const useFlip = () => {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const flipCard = () => {
    setIsFacingUp(isUp => !isUp);
  };
  return [isFacingUp, flipCard]
}

function useLocalStorage(key, initialValue = []) {
  // if key in storage, grab it to set initialValue in state
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key))
  }
  const [value, setValue] = useState(initialValue);

  // when value or key changes, set new values in local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  // return state value and setValue function
  return [value, setValue]
}

function useAxios(keyInLS, baseUrl) {
  // use local storage key to get responses in storage and state function
  const [responses, setResponses] = useLocalStorage(keyInLS);

  // make function to add response data based on provided data and URL endpoint
  const addResponseData = async (formatter = data => data, restOfUrl = "") => {
    const response = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponses(data => [...data, formatter(response.data)]);
  };

  // make function to clear response data
  const clearResponses = () => setResponses([]);

  // return responses and functions to add/clear data
  return [responses, addResponseData, clearResponses]
}


export { useFlip, useAxios };
