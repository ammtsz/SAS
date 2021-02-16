import React from "react";
import ProgressBar from "./progress-bar.categories.component";

import { render, screen, cleanup } from "@testing-library/react";

describe("Component categories-page <ProgressBar />", () => {
  const mockProps = {
    progress: 8,
  };

  let component;

  beforeEach(() => {
    component = render(<ProgressBar {...mockProps} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render ProgressBar", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should print 8 colored units in '<ProgressBar />' component", () => {
    expect(screen.getAllByTestId("progress-bar-colored").length).toBe(8);
  });

});
