import React from "react";
import { AnswerOptionCard, AnswerText, Question } from "./qa.trivia.styles";

const QATrivia = () => {
  const selectOption = (event) => {
    const option = event.target.dataset.option;
    document.querySelectorAll(".trivia__option").forEach((option) => {
      option.classList.remove("option__selected");
    });
    document
      .querySelector(`.trivia__option[data-option = '${option}']`)
      .classList.add("option__selected");
  };

  return (
    <React.Fragment>
      <Question>
        Sobre a conhecida Idade dos Metais, na transição entre a Pré-História e
        a História, é possível afirmar que:
      </Question>
      <AnswerOptionCard
        className="trivia__option"
        data-option="1"
        onClick={(event) => selectOption(event)}
      >
        <AnswerText data-option="1">
          não existe ligação entre o uso dos metais e a formação de grandes
          impérios
        </AnswerText>
      </AnswerOptionCard>
      <AnswerOptionCard
        className="trivia__option"
        data-option="2"
        onClick={(event) => selectOption(event)}
      >
        <AnswerText data-option="2">
          não existe ligação entre o uso dos metais e a formação de grandes
          impérios
        </AnswerText>
      </AnswerOptionCard>
      <AnswerOptionCard
        className="trivia__option"
        data-option="3"
        onClick={(event) => selectOption(event)}
      >
        <AnswerText data-option="3">
          não existe ligação entre o uso dos metais e a formação de grandes
          impérios
        </AnswerText>
      </AnswerOptionCard>
      <AnswerOptionCard
        className="trivia__option"
        data-option="4"
        onClick={(event) => selectOption(event)}
      >
        <AnswerText data-option="4">
          não existe ligação entre o uso dos metais e a formação de grandes
          impérios
        </AnswerText>
      </AnswerOptionCard>
    </React.Fragment>
  );
};

export default QATrivia;
