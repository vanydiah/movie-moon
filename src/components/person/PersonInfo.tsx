import React from "react";
import { PersonDetailType } from "../../services/MediaType";
import SocialMediaLinks from "../common/SocialMediaLinks";
import noimage from "../../no-image.png";
import { calculateYears, getGenderLabel } from "../../utilities";

const PersonInfo: React.FC<{ personDetails: PersonDetailType }> = (props) => {
  const personDetails = props.personDetails;
  const img_path = "https://image.tmdb.org/t/p/w300_and_h450_face";
  const img_path_face = "https://image.tmdb.org/t/p/w235_and_h235_face";

  let personBirthDate;
  if (personDetails && personDetails.birthday) {
    personBirthDate = calculateYears(personDetails.birthday, null);
  }
  let personDeathDate;
  if (personDetails && personDetails.deathday) {
    personDeathDate = calculateYears(
      personDetails.birthday!,
      personDetails.deathday
    );
  }
  let genderLabel;
  if (personDetails && personDetails.gender) {
    genderLabel = getGenderLabel(+personDetails.gender);
  }

  return (
    <div className="card-poster pb-4">
      <div className="row px-0 mx-0">
        {personDetails.profile_path ? (
          <>
            <img
              className="img-fluid d-none d-md-block d-lg-block px-0"
              src={`${img_path}${personDetails.profile_path}`}
              alt={personDetails.name}
            />
            <img
              className="img-fluid mx-auto d-sm-block d-md-none d-lg-none px-0"
              src={`${img_path_face}${personDetails.profile_path}`}
              alt={personDetails.name}
            />
          </>
        ) : (
          <img
            className="no-image-person img-fluid"
            src={noimage}
            alt={personDetails.name}
          />
        )}
      </div>

      <div className="row justify-content-start pt-3 text-center">
        <h2 className="d-sm-block d-md-none d-lg-none">{personDetails.name}</h2>
        <SocialMediaLinks links={personDetails.socialIds} />
      </div>
      <div className="row justify-content-start pt-3">
        <div className="text-left">
          <h4>Personal Info</h4>
        </div>
        <div className="row mt-1 mb-3">
          <h6>Know For</h6>
          <p className="mb-0">{personDetails.known_for_department}</p>
        </div>
        {genderLabel && (
          <div className="row mb-3">
            <h6>Gender</h6>
            <p className="mb-0">{genderLabel}</p>
          </div>
        )}
        {personBirthDate && (
          <div className={`row ${personDetails.deathday && "mb-3"}`}>
            <h6>Birthday</h6>
            <p className="mb-0">
              {`${personDetails.birthday} 
            ${
              personBirthDate && !personDetails.deathday
                ? `(${personBirthDate} Years)`
                : ""
            }`}
            </p>
          </div>
        )}
        {personDetails.deathday && (
          <div className="row">
            <h6>Day of Death</h6>
            <p className="mb-0">{`${personDetails.deathday} (${personDeathDate} Years)`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonInfo;
