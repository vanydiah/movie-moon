import React, { useState } from "react";
import { PersonDetailType } from "../../services/MediaType";
import { truncateWords } from "../../utilities";
import { AllMediaList } from "../common/AllMediaListing";

const PersonDescription: React.FC<{ personDetails: PersonDetailType }> = (
  props
) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const personDetails = props.personDetails;

  let biography =
    personDetails && personDetails.biography && personDetails.biography;

  const readMoreHandler = () => {
    setIsReadMore(!isReadMore);
  };

  let readMoreButton;

  if (biography) {
    let biographyArray = personDetails.biography!.trim().split(" ");
    if (biographyArray.length > 100) {
      readMoreButton = (
        <a
          role="button"
          className="btn text-primary px-0 ps-1 pt-0 mt-0"
          onClick={readMoreHandler}
        >
          {isReadMore ? "Read more" : "Show less"}
        </a>
      );
    }

    if (!isReadMore) {
      biography = personDetails.biography;
    } else {
      biography = truncateWords(biography!, 100);
    }
  }

  return (
    <div className="card-content">
      <h2 className="d-none d-md-block d-lg-block mb-3">
        {personDetails.name}
      </h2>

      <div className="card-overview">
        <h4>Biography</h4>
        <p className="overview p2-3">
          {biography ? biography : <span>Not available</span>}
          {readMoreButton}
        </p>
        <div className="col pt-2">
          <h4 className="mb-0 pb-0">Filmography</h4>
          <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-start pt-4">
            {personDetails.credits &&
              personDetails.credits.cast &&
              personDetails.credits.cast.length > 0 && (
                <AllMediaList
                  key={personDetails.id}
                  mediaType="movie"
                  items={personDetails.credits.cast}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDescription;
