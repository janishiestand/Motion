import styled from "styled-components";
import backgroundImage from "../motion-assets/images/background_image.png";
import { Link, useNavigate } from "react-router-dom";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  object-fit: contain;
`;

export const Col = styled.div`
  width: 60%;
  display: flex;
  flex-flow: column;
`;

export const LeftCol = styled(Col)`
  background-image: url(${backgroundImage}),
    linear-gradient(102deg, #c468ff, #6e91f6);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  width: 40%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  width: 864px;
  padding: 40px;
  flex-direction: column;
  align-items: center;
  gap: 126px;
  align-self: stretch;
  background: #fff;
`;

export const LogoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  p {
    width: 260px;
    color: #fff;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    opacity: 0.6;
  }
`;
export const MotionLogoWhite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  h1 {
    width: 207.36px;
    color: #fff;
    text-align: center;
    font-family: Roboto;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.75px;
  }
  img {
    width: 80px;
    height: 80px;
    fill: #fff;
    filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.07));
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;

  img {
    width: 85.36px;
    height: 15.412px;
    display: flex;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;
export const RightsReserved = styled.div`
  position: absolute;
  bottom: 2.5rem;
  color: white;

  p {
    color: #fff;
    text-align: center;
    font-family: "Roboto";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2.625rem;
  column-gap: 1rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    opacity: 0.35;
    width: 40px;
    height: 40px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 18px;
  align-self: stretch;
`;

export const SignUpButton = styled.div`
  display: flex;
  padding: 14px 38px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-decoration: none;
`;
export const NoUnderlineLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    width: 340px;
    color: black;
    text-align: center;
    font-family: "Roboto";
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const Input = styled.div`
  display: flex;
  height: 407px;
  flex-direction: column;
  align-items: center;
  gap: 53px;
`;
export const Inputfield = styled.div`
  display: flex;
  width: 288px;
  padding-bottom: 0px;
  align-items: center;
  gap: 22px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.17);
  padding: 16px;
  margin-bottom: 53px;

  img {
    margin-right: 30px;
  }
`;
export const StyledInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  &::placeholder {
    width: 75.086px;
    flex-shrink: 0;
    color: #000;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
  }
`;
export const SignInButton = styled.div`
  display: flex;
  margin-top: 170px;
  justify-content: center;
  padding: 23px 120px;
  align-items: flex-start;
  border-radius: 30px;
  background: var(
    --gradient_button,
    linear-gradient(133deg, #c468ff 3.32%, #6e91f6 100%)
  );
`;
export const StyledInputButton = styled.input`
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1px;
  text-transform: uppercase;
  background-color: transparent;
  border: none;
`;

export const Congratulation = styled.div`
  width: 391px;
  height: 261px;
  flex-shrink: 0;

  h1 {
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 207px;
  }
  p {
    width: 391px;
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    opacity: 0.6;
  }
  button {
    color: #fff;
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1px;
    text-transform: uppercase;
    background-color: transparent;
    border: none;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const GridItem = styled.div`
  margin-bottom: 10px;
`;
