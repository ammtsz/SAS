import React from "react";
import CardBody from "./card-body.report.component";

import { render, screen, cleanup, fireEvent } from "@testing-library/react";

describe("Component report-page <CardBody />", () => {

    const categoryId = 2;
    const categoryName = "Sports";

    const mockReports = {
      [categoryId]: {
        category_name: categoryName,
        results: {
            difficulty: {
                easy: { rights: 2, wrongs: 0 },
                medium: { rights: 4, wrongs: 3 },
                hard: { rights: 0, wrongs: 1 },
            },
            rights: 6,
            wrongs: 4,
        },
      },
    };
    const mockCategory = {id: categoryId, name: categoryName}
    const mockFinishQuiz = jest.fn()
    const mockHistory = {push: jest.fn()}
    const mockResetReport = jest.fn()

    const mockProps = {
        reports: mockReports,
        category: mockCategory,
        finishQuiz: mockFinishQuiz,
        history: mockHistory,
        resetReport: mockResetReport
    };

    let component;

    beforeEach(() => {
      component = render(<CardBody {...mockProps} />);
    });

    afterEach(() => {
      cleanup();
    });

    it("should render CardBody", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain report details from the 3 difficulty levels (Easy, Medium, Hard)", () => {
      expect(screen.getAllByTestId("report-level-details").length).toEqual(3);
      expect(screen.getByText("Easy")).toBeInTheDocument();
      expect(screen.getByText("Medium")).toBeInTheDocument();
      expect(screen.getByText("Hard")).toBeInTheDocument();
    });

    it("should get all rights and wrongs correctly", () => {
        // difficulty: {
        //     easy: { rights: 2, wrongs: 0 },
        //     medium: { rights: 4, wrongs: 3 },
        //     hard: { rights: 0, wrongs: 1 },
        //   },
        //   rights: 6,
        //   wrongs: 4,

        expect(screen.getByTestId("report-rights").textContent).toEqual("6");
        expect(screen.getByTestId("report-wrongs").textContent).toEqual("4");
        expect(screen.getByTestId("report-easy-rights").textContent).toEqual("Correct: 2");
        expect(screen.getByTestId("report-easy-wrongs").textContent).toEqual("Incorrect: 0");
        expect(screen.getByTestId("report-medium-rights").textContent).toEqual("Correct: 4");
        expect(screen.getByTestId("report-medium-wrongs").textContent).toEqual("Incorrect: 3");
        expect(screen.getByTestId("report-hard-rights").textContent).toEqual("Correct: 0");
        expect(screen.getByTestId("report-hard-wrongs").textContent).toEqual("Incorrect: 1");
      });

      it("should fire 'finishQuiz' when click on 'Go to Homepage' button", () => {
          const btn = screen.getByText("Go to Homepage")
          expect(btn).toBeInTheDocument()
          
          fireEvent.click(btn)
          expect(mockFinishQuiz).toHaveBeenCalledTimes(1)
          expect(mockFinishQuiz).toHaveBeenCalledWith(mockHistory)
      })
});
