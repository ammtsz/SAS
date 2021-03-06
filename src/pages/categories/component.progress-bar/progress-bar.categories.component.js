import React from "react";
import { FullBar, ProgressUnit } from "./progress-bar.categories.styles";

const ProgressBar = ({ progress }) => {
  const fullBar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <FullBar
      className="progress-bar"
      data-testid="progress-bar"
      aria-label={`${progress} questions answered`}
    >
      {fullBar.map((unit) => (
        <ProgressUnit
          key={unit}
          data-testid={`${unit <= progress ? "progress-bar-colored" : ""} `}
          className={`${unit <= progress ? "colored" : ""} `}
        />
      ))}
    </FullBar>
  );
};
export default ProgressBar;
