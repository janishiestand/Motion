import { useState } from "react";
import axios from "axios";

const Api = () => {
  axios.defaults.baseURL = "https://motion.propulsion-home.ch/backend/api";

  const [data, setData] = useState(null); // To store the response data
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To store any errors that occur during the request

  const sendRequest = (method, url, data) => {
    // Setting loading state to true when the request is initiated
    setIsLoading(true);

    // Making an axios request with the provided method, URL, and data
    axios({ method, url, data })
      .then((response) => {
        // Resetting error state to null.ensure that any previous error from a previous request is cleared.
        //It essentially resets the error state to indicate that the application is attempting a new operation, and there are no errors associated with it yet.
        setError(null);

        // If response has data, set the data state to the response data
        if (response.data) {
          return setData(response.data);
        }
        // If there is no response data, I still want to provide a clear indicator that the request
        // was successful, even if there's no specific data payload.
        return setData("success");
      })
      .catch((error) => {
        return setError(error.response.data);
      })
      .finally(() => {
        // Set loading state to false after the request is complete (whether success or error)
        setIsLoading(false);
      });
  };

  return { sendRequest, data, error, isLoading };
};

export default Api;
