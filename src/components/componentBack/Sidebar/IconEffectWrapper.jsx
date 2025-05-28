import React from "react";
import styled, { keyframes } from "styled-components";

const rotateSmall = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2) translateX(5px);
  }
`;

const IconInner = styled.div`
  display: inline-flex;
  transition: transform 0.3s ease;

  ${IconWrapper}:hover & {
    animation: ${rotateSmall} 0.6s ease-in-out;
  }
`;

export const IconEffectWrapper = ({ children }) => (
  <IconWrapper>
    <IconInner>{children}</IconInner>
  </IconWrapper>
);
