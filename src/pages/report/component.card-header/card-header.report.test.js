import React from "react";
import CardHeader from "./card-header.report.component";

import { render, screen, cleanup } from "@testing-library/react";

describe("Component report-page <CardHeader />", () => {
  const mockCategory = { id: 1, name: "Sports" };

  describe("Report created right after a quiz is finished", () => {
    const mockProps = {
      review: false,
      category: mockCategory,
    };

    let component;

    beforeEach(() => {
      component = render(<CardHeader {...mockProps} />);
    });

    afterEach(() => {
      cleanup();
    });

    it("should render CardHeader", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain the 'congratulation' text", () => {
      expect(screen.getByText("Congratulation!")).toBeInTheDocument();
      expect(screen.getByText("You finished the quiz")).toBeInTheDocument();
    });

    it("should NOT contain the category-name text", () => {
      expect(screen.queryByText(mockCategory.name)).toEqual(null);
    });
  });

  describe("Report requested from categories page", () => {
    const mockProps = {
      review: true,
      category: mockCategory,
    };

    let component;

    beforeEach(() => {
      component = render(<CardHeader {...mockProps} />);
    });

    afterEach(() => {
      cleanup();
    });

    it("should render CardHeader", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain the category-name text", () => {
      expect(screen.getByText(mockCategory.name)).toBeInTheDocument();
    });

    it("should NOT contain the 'congratulation' text", () => {
      expect(screen.queryByText("Congratulation!")).toEqual(null);
      expect(screen.queryByText("You finished the quiz")).toEqual(null);
    });
  });
});
