import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../api/api.js";
import {
  Container,
  LeftCol,
  Right,
  MotionLogoWhite,
  LogoContent,
  ButtonContainer,
  RightsReserved,
  IconContainer,
  IconWrapper,
  Header,
  SignUpButton,
  NoUnderlineLink,
  Form,
  Input,
  Inputfield,
  StyledInput,
  SignInButton,
  StyledInputButton,
  Congratulation,
} from "../../Styles/LoginStyle.js";
import logowhite from "../../motion-assets/images/logo_white.png";
import apple from "../../motion-assets/svgs/apple.svg";
import google from "../../motion-assets/svgs/google.svg";
import twitter from "../../motion-assets/svgs/twitter_icon.svg";
import facebook from "../../motion-assets/svgs/facebook_icon.svg";
import instagram from "../../motion-assets/svgs/instagram_icon.svg";

function RegisterPage() {
  const [user, setUser] = useState({});
  const [codeSent, setCodeSent] = useState(false);
  const { sendRequest, data, error, isLoading } = Api();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    sendRequest("post", "auth/registration/", user);
  };

  useEffect(() => {
    if (data === "success") {
      setCodeSent(true);
    }
  }, [data]);

  const handleContinue = () => {
    navigate("validation");
  };

  return (
    <Container>
      <LeftCol>
        <LogoContent>
          <MotionLogoWhite>
            <img src={logowhite} />

            <h1>Motion</h1>
          </MotionLogoWhite>
          <p>Connect with friends and the world around you with Motion.</p>
          <ButtonContainer>
            <img src={apple} />
            <img src={google} />
          </ButtonContainer>
        </LogoContent>
        <RightsReserved>
          <IconContainer>
            <IconWrapper>
              <img src={twitter} />
            </IconWrapper>
            <IconWrapper>
              <img src={facebook} />
            </IconWrapper>
            <IconWrapper>
              <img src={instagram} />
            </IconWrapper>
          </IconContainer>
          <p>© Motion 2022. All rights reserved.</p>
        </RightsReserved>
      </LeftCol>

      <Right>
        {codeSent ? (
          // Render the confirmation message if codeSent is true
          <Congratulation>
            <h1>Congratulations!</h1>
            <p>We've sent a confirmation code to your email {user.email}</p>
            <SignInButton>
              <button onClick={handleContinue}>CONTINUE</button>
            </SignInButton>
          </Congratulation>
        ) : (
          // Render the registration form if codeSent is false
          <>
            <Header>
              <p>Don't have an account?</p>

              <NoUnderlineLink to="/register">
                <SignUpButton>SIGN UP</SignUpButton>
              </NoUnderlineLink>
            </Header>

            <Form>
              <Input>
                <h2>Sign up</h2>
                <form onSubmit={registerUser}>
                  <Inputfield>
                    <StyledInput
                      type="text"
                      id="email"
                      placeholder="E-Mail"
                      onChange={inputHandler}
                    />
                    {error?.email && <p>{error.email}</p>}
                  </Inputfield>

                  <SignInButton>
                    <StyledInputButton
                      type="submit"
                      value={"SIGN IN"}
                      onClick={registerUser}
                    />
                    <p>{error?.detail}</p>
                    {isLoading && <p>Request is being processed</p>}
                  </SignInButton>
                </form>
              </Input>
            </Form>
          </>
        )}
      </Right>
    </Container>
  );
}

export default RegisterPage;
