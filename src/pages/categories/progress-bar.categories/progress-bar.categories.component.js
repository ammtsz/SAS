import React from "react";
import { FullBar, ProgressUnit } from "./progress-bar.categories.styles";

const ProgressBar = ({ progress }) => {
  const fullBar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <FullBar className="progress-bar" data-testid="progress-bar">
      {fullBar.map((unit) => (
        <ProgressUnit key={unit} className={`${unit <= progress ? "colored" : ""} `} />
      ))}
    </FullBar>
  );
};
export default ProgressBar;
