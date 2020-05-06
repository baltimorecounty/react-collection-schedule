import { Config } from "@baltimorecounty/javascript-utilities";
import Fetch from "./Fetch";
const { getValue } = Config;

/**
 *  Get suggestions for a given address query
 * @param {string} query partial address
 */
const GetSuggestions = async (query) => {
  const { suggestions = [] } = await Fetch("address", {
    endpoint: getValue("suggest"),
    queryString: `?partialAddress=${query}`,
  });
  return suggestions.map(({ text }) => text);
};

export { GetSuggestions };
