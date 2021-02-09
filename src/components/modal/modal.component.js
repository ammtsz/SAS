import React from "react";
import { PageModal, CardModal, Icon, Message, NextBtn } from "./modal.styles";
import RightIcon from "../../assets/img/right.svg";
import WrongIcon from "../../assets/img/wrong.svg";
import ArrowIcon from "../../assets/img/arrow-right.svg";

const Modal = ({ right }) => {
  return (
    <PageModal>
      <CardModal right={right}>
        <Icon src={right ? RightIcon : WrongIcon} alt="..." />
        <Message>Voce acertou!</Message>
        <NextBtn>
          Avancar 
          <img className="nextButton__icon" src={ArrowIcon} alt="..." />
        </NextBtn>
      </CardModal>
    </PageModal>
  );
};

export default Modal;
