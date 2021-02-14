import React from "react";
import Categories from "./categories-page.component";

import { shallow } from "enzyme";

describe("<Categories />", () => {
  const getCategories = jest.fn();
  const categories = [
    { id: 1, name: "Sports" },
    { id: 2, name: "Music" },
  ];
  const userDatas = {};
  const resetReport = jest.fn();
  const resetQuiz = jest.fn();

  const mockProps = {
    getCategories,
    categories,
    userDatas,
    resetReport,
    resetQuiz,
  };

  const wrapper = shallow(<Categories {...mockProps} />);

  it("to have two categories cards", () => {
    expect(wrapper.find("[data-testid='categories-cards']")).toHaveLength(2);
  });

});
