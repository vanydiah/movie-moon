import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/Layout/Button";
import Loader from "../components/Layout/Loader";
import Error from "../components/Layout/Error";
import PersonListing from "../components/person/PersonListing";
import { fetchSearch } from "../services/fetchMedia";
import {
  MediaItemType,
  MediaParamTypes,
  PersonItemType,
} from "../services/MediaType";
import { RootState } from "../store";
import { searchAction } from "../store/search-slice";
import { loadNextPage, loadPrevPage } from "../utilities";
import { AllMediaList } from "../components/common/AllMediaListing";
import { useSearchParams } from "react-router-dom";

const SearchPage: React.FC = () => {
  const searchState = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const [query] = useSearchParams();
  let mediaItem: MediaItemType[] = searchState.data;
  let personItem: PersonItemType[] | any = searchState.data;
  const searchQuery = query.get("keyword");

  useEffect(() => {
    searchState.page === 1 ? setDisablePrev(true) : setDisablePrev(false);
    searchState.totalPages === 1 ? setDisableNext(true) : setDisableNext(false);

    if (searchQuery && !searchState.keyword) {
      fetchSearchResult(1);
    }
  }, [searchState.totalPages]);

  let mediaListing, personListing;
  if (
    searchState.searchType === MediaParamTypes.Movie ||
    searchState.searchType === MediaParamTypes.TV
  ) {
    mediaListing = (
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 justify-content-start pt-4">
        <AllMediaList mediaType={searchState.searchType} items={mediaItem} />
      </div>
    );
  }
  if (searchState.searchType === MediaParamTypes.Person) {
    personListing = <PersonListing data={personItem} />;
  }

  const fetchSearchResult = async (page: number = 1) => {
    let { keyword } = searchState;
    const { searchType } = searchState;
    if (!keyword && searchQuery) {
      dispatch(
        searchAction.setKeyword({ searchType: MediaParamTypes.Movie, keyword })
      );
      keyword = searchQuery;
    }

    dispatch(searchAction.getSearchResult(page));
    const data = await fetchSearch(searchType!, keyword!, page);
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
  };

  const loadNext = (last?: boolean) => {
    setDisablePrev(false);
    let page = searchState.page + 1;
    if (page === searchState.totalPages) {
      page = searchState.totalPages;
      last = true;
    }
    loadNextPage(page, fetchSearchResult, last, searchState.totalPages);
    last ? setDisableNext(true) : setDisableNext(false);
  };

  const loadPrev = (first?: boolean) => {
    setDisableNext(false);
    let page = searchState.page;
    loadPrevPage(page, fetchSearchResult, first);
    first || page - 1 === 1 ? setDisablePrev(true) : setDisablePrev(false);
    page - 1 < searchState.totalPages && setDisableNext(false);
  };

  let loading = searchState.loading;
  let errorMessage = searchState.error;

  let load =
    (mediaItem && mediaItem.length > 0 && !errorMessage) ||
    (personItem && personItem.length > 0 && !errorMessage);

  return (
    <div className="container py-4">
      <h3>Search Results</h3>
      {loading && <Loader />}
      {errorMessage && <Error />}
      {!loading &&
        !errorMessage &&
        mediaItem.length === 0 &&
        personItem.length === 0 && (
          <p>There are no results that matched your query.</p>
        )}
      {!errorMessage &&
        !loading &&
        (searchState.searchType === MediaParamTypes.Movie ||
          searchState.searchType === MediaParamTypes.TV) &&
        mediaListing}

      {!errorMessage &&
        !loading &&
        searchState.searchType === MediaParamTypes.Person &&
        personListing}

      {load && (
        <div className="col-12 text-center">
          <Button onClick={() => loadPrev(true)} disabled={disablePrev}>
            <i className="fa-solid fa-angles-left"></i> First
          </Button>
          <Button onClick={() => loadPrev(false)} disabled={disablePrev}>
            <i className="fa-solid fa-chevron-left"></i> Previous
          </Button>
          <Button onClick={() => loadNext(false)} disabled={disableNext}>
            Next <i className="fa-solid fa-chevron-right"></i>
          </Button>
          <Button onClick={() => loadNext(true)} disabled={disableNext}>
            Last <i className="fa-solid fa-angles-right"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchPage);
