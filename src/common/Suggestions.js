import { Config } from "@baltimorecounty/javascript-utilities";
import Fetch from "./Fetch";
const { getValue } = Config;

const GetSuggestions = async (query) => {
  const { suggestions = [] } = await Fetch("address", {
    endpoint: getValue("suggest"),
    queryString: `?partialAddress=${query}`,
  });
  return suggestions.map(({ text }) => text);
};

export { GetSuggestions };
