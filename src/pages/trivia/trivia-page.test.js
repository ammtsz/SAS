import React from "react";
import TriviaRender from "./trivia-page.render.component";
import { shallow } from "enzyme";

describe("<TriviaRender />", () => {

  describe("Modal", () => {
    const setQuizQuestionsDatas = jest.fn();
    const quizQuestionsDatas = [];
    const quizCurrentQuestion = {};
    const quizCurrentOptions = [];
    const checkAnswer = jest.fn();
    const updateQuizReport = jest.fn();

    const mockProps = {
      setQuizQuestionsDatas,
      quizQuestionsDatas,
      quizCurrentQuestion,
      quizCurrentOptions,
      checkAnswer,
      updateQuizReport,
    };

    const wrapper = shallow(
        <TriviaRender {...mockProps} />
    );

    it("should contain 'continue' text", () => {
      
      expect(wrapper.find("#answer-button_").length).toEqual(1);
    //   wrapper.find("#answer-button_").simulate("click");
    //   expect(checkAnswer).toHaveBeenCalled();
    });
  });
});
