import { Tooltip } from "bootstrap";
import { useEffect } from "react";

export const formatDate = (date: string): string | null => {
  if (!date) {
    return null;
  }
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date(date);
  const newDate = `${monthName[currentDate.getMonth()]} ${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}, ${currentDate.getFullYear()} `;

  return newDate;
};

export const calculateYears = (dob: string, dod: string | null) => {
  if (!dob) {
    return;
  }

  const newDOB = new Date(dob);
  let currentDate = new Date();
  if (dod) {
    currentDate = new Date(dod);
  }
  let calculatedYear = new Date(+currentDate - +newDOB).getFullYear() - 1970;

  return calculatedYear;
};

export const getGenderLabel = (gender: number) => {
  const genderArray = ["Not mentioned", "Female", "Male"];
  if (gender) {
    return genderArray[gender];
  }
  return genderArray[0];
};

export const truncateWords = (str: string, max: number = 10) => {
  const array = str.trim().split(" ");
  const ellipsis = array.length > max ? " ... " : "";

  return array.slice(0, max).join(" ") + ellipsis;
};

export const getVoteColor = (vote: number) => {
  if (!vote) {
    return;
  }
  let voteColor = "";
  if (vote < 25) {
    voteColor = "red";
  } else if (vote >= 25 && vote <= 69) {
    voteColor = "orange";
  } else if (vote > 69) {
    voteColor = "green";
  }
  return voteColor;
};

export const loadNextPage = (
  page: number = 1,
  fetchFN: (page: number) => void,
  last?: boolean,
  totalPages: number = 1
) => {
  last && (page = totalPages);
  fetchFN(page);
};

export const loadPrevPage = (
  page: number = 1,
  fetchFN: (page: number) => void,
  first?: boolean
) => {
  if (first || page === 1) {
    page = 1;
  } else {
    page = page - 1;
  }
  fetchFN(page);
};

export function useTooltips(trigger: any = "hover") {
  useEffect(() => {
    const elements = document.querySelectorAll<Element>(
      `[data-bs-toggle="tooltip"]`
    );
    const el: Element[] = Array.prototype.slice.call(elements);
    const tooltipList = el.map(
      (tooltipTriggerElement) => new Tooltip(tooltipTriggerElement, { trigger })
    );

    return () => tooltipList.forEach((tooltip) => tooltip.dispose());
  });
}
