import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearch } from "../../services/fetchMedia";
import { MediaParamTypes } from "../../services/MediaType";
import { searchAction } from "../../store/search-slice";

const NavbarSearch: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [searchType, setSearchType] = useState<
    MediaParamTypes.Movie | MediaParamTypes.TV | MediaParamTypes.Person | string
  >(MediaParamTypes.Movie);

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const onChangeMediaType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  const onSubmitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (keyword.length > 0) {
        dispatch(searchAction.setKeyword({ searchType, keyword }));
        dispatch(searchAction.getSearchResult(1));

        const data = await fetchSearch(searchType, keyword);

        if (!data.success) {
          dispatch(searchAction.getSearchResultError(data.error));
          return;
        }

        dispatch(
          searchAction.getSearchResultSuccess({
            totalPages: data.results.total_pages,
            results: data.results.results,
          })
        );
        navigate(`/search?keyword=${keyword}`);
      } else {
        inputRef.current!.focus();
      }
    },
    [keyword, searchType, dispatch]
  );

  return (
    <form
      className="d-flex order-2 my-2 col-12 col-md-6 col-lg-7"
      onSubmit={onSubmitHandler}
    >
      <div className="input-group ml-2 pl-2 ">
        <div className="input-group-prepend pl-2">
          <select
            className="custom-select form-select rounded-0 rounded-start"
            id="inputGroupSelect01"
            onChange={onChangeMediaType}
            defaultValue={MediaParamTypes.Movie}
          >
            <option value={MediaParamTypes.Movie}>Movie</option>
            <option value={MediaParamTypes.TV}>TV</option>
            <option value={MediaParamTypes.Person}>People</option>
          </select>
        </div>
        <input
          className="form-control"
          type="search"
          value={keyword}
          placeholder="Search movies, tv series, people"
          aria-describedby="search-button"
          onChange={onChangeKeyword}
          ref={inputRef}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="search-button"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(NavbarSearch);
