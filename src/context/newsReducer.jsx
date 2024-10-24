export const initialState = {
  selectedCategory: "top-headlines",
  searchTerm: "",
  result: null,
  filteredNews: [],
  visibleNewsCount: 10, // Exibir inicialmente 10 notícias
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
    case "LOAD_MORE_NEWS":
      return { ...state, visibleNewsCount: state.visibleNewsCount + 10 }; // Incrementa em 10
    default:
      return state;
  }
};