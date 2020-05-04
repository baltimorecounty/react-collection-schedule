const GetSuggestions = async (
  suggestions = [
    {
      magicKey: "fajklfjasd",
      text: "400 Washington Ave, Towson, MD, 21204",
    },
  ],
  shouldReject
) =>
  console.log("got here ") ||
  new Promise((resolve, reject) =>
    shouldReject
      ? resolve(suggestions)
      : reject({
          error: "Something went wrong",
        })
  );

export { GetSuggestions };
