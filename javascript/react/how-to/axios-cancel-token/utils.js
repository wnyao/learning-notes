/**
 * Reference: https://medium.com/@mikjailsalazar/just-another-searchbar-react-axios-lodash-340efec6933d
 */

import axios from "axios";

const resources = {};

/**
 * A debounce that return a request function used for querying api.
 * This debounce will also cancel previous request before making new request.
 *
 * ADVANTAGES:
 * - Help resolve race condition in making requests Eg. onChange search input
 * - Have caching capability on GET request
 *
 * DISADVANTAGES:
 * - No caching capability on POST request
 * - Function return from requestCreator cant be shared with different api query due to shared cancel variable
 *
 * */
const requestCreator = () => {
  let cancel;

  return async (query) => {
    // Cancel the previous request before making a new request
    if (cancel) cancel.cancel();

    // Create a new CancelToken
    cancel = axios.CancelToken.source();

    try {
      // Return result if it exists
      if (resources[query]) return resources[query];
      const res = await axios(query, { cancelToken: cancel.token });

      // Store response
      resources[query] = res;
      return res;
    } catch (error) {
      // Handle if request was cancelled
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        return;
      }

      // Handle usual errors
      console.log("Something went wrong: ", error.message);
    }
  };
};

export default requestCreator();
