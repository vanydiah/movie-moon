import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedia } from "../services/fetchMedia";
import { FilterTypes, MediaParamTypes } from "../services/MediaType";
import { RootState } from "../store";
import { personAction } from "../store/person-slice";
import { loadNextPage, loadPrevPage } from "../utilities";
import Loader from "../components/Layout/Loader";
import PersonItem from "../components/person/PersonItem";
import PersonListing from "../components/person/PersonListing";
import Button from "../components/Layout/Button";
import Error from "../components/Layout/Error";

const PersonPage: React.FC = () => {
  const dispatch = useDispatch();
  const { popular } = useSelector((state: RootState) => state.person);
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  useEffect(() => {
    if (popular.data.length === 0) {
      fetchPopularPerson();
      setDisablePrev(true);
    }
  }, []);

  const fetchPopularPerson = useCallback(async (page: number = 1) => {
    dispatch(personAction.getPopularPerson({ page }));
    const data = await fetchMedia(
      MediaParamTypes.Person,
      FilterTypes.Popular,
      page
    );
    if (!data.success) {
      dispatch(personAction.getPopularPersonError(data.error));
      return;
    }

    dispatch(
      personAction.getPopularPersonSuccess({
        totalPages: data.results.total_pages,
        results: data.results.results,
      })
    );
  }, []);

  const loadPrev = (first: boolean = false) => {
    setDisableNext(false);
    let page = popular.page;
    loadPrevPage(page, fetchPopularPerson, first);
    first || page - 1 === 1 ? setDisablePrev(true) : setDisablePrev(false);
    page - 1 < popular.totalPages && setDisableNext(false);
  };

  const loadNext = (last: boolean = false) => {
    setDisablePrev(false);
    let page = popular.page + 1;
    if (page === popular.totalPages) {
      last = true;
      page = popular.totalPages;
    }
    loadNextPage(page, fetchPopularPerson, last, popular.totalPages);
    last ? setDisableNext(true) : setDisableNext(false);
  };

  let errorMessage;
  if (popular.error && popular.data && popular.data.length === 0) {
    errorMessage = <Error />;
  }

  return (
    <div className="container py-4">
      <h3>Popular Person</h3>
      {errorMessage}

      {popular.loading && <Loader />}
      {!errorMessage && popular.data && popular.data.length > 0 && (
        <PersonListing data={popular.data} />
      )}
      {!errorMessage && (
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

export default PersonPage;
