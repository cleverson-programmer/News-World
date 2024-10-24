
export const initialState = {
  selectedCategory: "top-headlines",
  searchTerm: "",
  result: null,
  filteredNews: [],
};

export const newsReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload, searchTerm: "" };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_RESULT":
      return { ...state, result: action.payload };
    case "SET_FILTERED_NEWS":
      return { ...state, filteredNews: action.payload };
    default:
      return state;
  }
};
