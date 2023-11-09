import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCredits, fetchDetails } from "../../services/fetchMedia";
import { CreditTypes, MediaParamTypes } from "../../services/MediaType";
import { RootState } from "../../store";
import { personAction } from "../../store/person-slice";
import Loader from "../Layout/Loader";
import classes from "./PersonDetails.module.css";
import PersonInfo from "./PersonInfo";
import PersonDescription from "./PersonDescription";

const PersonDetails: React.FC = () => {
  const { personId }: any = useParams();

  const dispatch = useDispatch();
  const person = useSelector((state: RootState) => state.person.details);

  useEffect(() => {
    if (person && person.data) {
      const personIds = Object.keys(person.data);
      if (!personIds.includes(personId)) {
        fetchPersonDetails(personId);
      }
    }
  }, [personId]);

  const fetchPersonDetails = useCallback(
    async (personId: number) => {
      dispatch(personAction.getPersonDetails({ personId }));
      const data = await fetchDetails(MediaParamTypes.Person, personId);

      if (!data.success) {
        dispatch(personAction.getPersonDetailsError(data.error));
        return;
      }
      dispatch(
        personAction.getPersonDetailsSuccess({
          personId,
          results: data.results,
        })
      );
      fetchPersonCredit(personId);
      fetchSocialIds(personId);
    },
    [personId]
  );

  const fetchPersonCredit = useCallback(
    async (personId: number) => {
      dispatch(personAction.getCombineCredits({ personId }));
      const data = await fetchCredits(
        MediaParamTypes.Person,
        personId,
        CreditTypes.CumbineCredit
      );

      if (!data.success) {
        dispatch(personAction.getCombineCreditsError());
        return;
      }

      dispatch(
        personAction.getCombineCreditsSuccess({
          personId,
          results: data.results,
        })
      );
    },
    [personId]
  );

  const fetchSocialIds = useCallback(
    async (personId: number) => {
      dispatch(personAction.getSocialDetails({ personId }));
      const data = await fetchCredits(
        MediaParamTypes.Person,
        personId,
        CreditTypes.ExternalId
      );

      if (!data.success) {
        dispatch(personAction.getSocialDetailsError());
        return;
      }

      dispatch(
        personAction.getSocialDetailsSuccess({
          personId,
          results: data.results,
        })
      );
    },
    [personId]
  );

  const personDetails = person.data[personId];

  return (
    <div className="container py-4">
      {person.loading && <Loader />}
      {!person.loading && personDetails && (
        <div className="px-0 mx-0">
          <div className={`card-headers px-0 mx-0 ${classes["card-headers"]}`}>
            <PersonInfo personDetails={personDetails} />

            <PersonDescription personDetails={personDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonDetails;
