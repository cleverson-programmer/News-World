import './style.css'
import { useContext } from "react";
import { NewsContext } from "../../../context/newsContext";
import { CiSearch } from "react-icons/ci";

export const SearchBar = () => {
  const { state, dispatch } = useContext(NewsContext);

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  return (
    <div className="containerInputSearch">
      <input
      type="text"
      placeholder="Search notices..."
      value={state.searchTerm}
      onChange={handleSearch}
      />

        <button>
          <CiSearch />
        </button>
    </div>
  );
};
