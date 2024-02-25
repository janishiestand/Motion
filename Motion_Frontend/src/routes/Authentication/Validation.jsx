import { useEffect, useState } from "react";
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
  GridContainer,
  GridItem,
} from "../../Styles/LoginStyle.js";
import logowhite from "../../motion-assets/images/logo_white.png";
import apple from "../../motion-assets/svgs/apple.svg";
import google from "../../motion-assets/svgs/google.svg";
import twitter from "../../motion-assets/svgs/twitter_icon.svg";
import facebook from "../../motion-assets/svgs/facebook_icon.svg";
import instagram from "../../motion-assets/svgs/instagram_icon.svg";

function ValidationPage() {
  const [user, setUser] = useState({});

  const { sendRequest, data, error, isLoading } = Api();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    sendRequest("patch", "auth/registration/validation/", user);
  };

  useEffect(() => {
    if (data === "success") {
      navigate("/posts");
    }
  }, [data, navigate]);

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
        <h2>Verification</h2>
        <form onSubmit={registerUser}>
          <Inputfield>
            <StyledInput
              id="code"
              placeholder={"Validation Code"}
              type="text"
              onChange={inputHandler}
            />
            {error?.code && <p>{error.code}</p>}
          </Inputfield>
          <GridContainer>
            <Inputfield>
              <StyledInput
                type="text"
                id="email"
                placeholder="E-Mail"
                onChange={inputHandler}
              />
              {error?.email && <p>{error.email}</p>}
            </Inputfield>

            <Inputfield>
              <StyledInput
                type="text"
                id="username"
                placeholder="Username"
                onChange={inputHandler}
              />
              {error?.username && <p>{error.username}</p>}
            </Inputfield>

            <Inputfield>
              <StyledInput
                id="first_name"
                placeholder={"First name"}
                type="text"
                onChange={inputHandler}
              />
              {error?.first_name && <p>{error.first_name}</p>}
            </Inputfield>

            <Inputfield>
              <StyledInput
                id="last_name"
                placeholder={"Last name"}
                type="text"
                onChange={inputHandler}
              />
              {error?.last_name && <p>{error.last_name}</p>}
            </Inputfield>

            <Inputfield>
              <StyledInput
                id="password"
                placeholder={"Password"}
                type="password"
                onChange={inputHandler}
              />
              {error?.password && <p>{error.password}</p>}
            </Inputfield>

            <Inputfield>
              <StyledInput
                id="password_repeat"
                placeholder={"Password repeat"}
                type="password"
                onChange={inputHandler}
              />
              {error?.password_repeat && <p>{error.password_repeat}</p>}
            </Inputfield>
          </GridContainer>

          <SignInButton>
            <StyledInputButton
              type="submit"
              value={"COMPLETE"}
              onClick={registerUser}
            />
            <p>{error?.detail}</p>
            {isLoading && <p>request is being processed</p>}
          </SignInButton>
        </form>
      </Right>
    </Container>
  );
}

export default ValidationPage;
