import React, { Fragment } from "react";
import PersonItem from "./PersonItem";

const PersonListing: React.FC<{ data: any }> = (props) => {
  return (
    <Fragment>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 justify-content-start pt-4">
        {props.data.map((item: any) => (
          <div
            className="col d-flex pt-4 pb-4 align-items-stretch"
            key={item.id}
          >
            <PersonItem {...item} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default React.memo(PersonListing);
