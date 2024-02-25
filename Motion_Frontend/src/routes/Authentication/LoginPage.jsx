import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login_user, setAvatar, setId } from "../../store/slices/userSlice";
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
} from "../../Styles/LoginStyle.js";
import logowhite from "../../motion-assets/images/logo_white.png";
import apple from "../../motion-assets/svgs/apple.svg";
import google from "../../motion-assets/svgs/google.svg";
import twitter from "../../motion-assets/svgs/twitter_icon.svg";
import facebook from "../../motion-assets/svgs/facebook_icon.svg";
import instagram from "../../motion-assets/svgs/instagram_icon.svg";
import avatar from "../../motion-assets/svgs/avatar.svg";
import password from "../../motion-assets/svgs/password.svg";
import defaultAvatar from "../../motion-assets/images/users/jennifer.png"

function LoginPage() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const { sendRequest, data, error, isLoading } = Api();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    sendRequest("post", "auth/token/", user);
  };

  useEffect(() => {
    if (data) {
      const userId = data.user.id;
      const userAvatar = data.user.avatar || defaultAvatar;
      const accessToken = data.access;
      const username = data.user.username;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
      dispatch(login_user(data));
      dispatch(setId(userId));
      dispatch(setAvatar(userAvatar));
      navigate("/posts");
    }
  }, [data, dispatch, navigate]);

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
        <Header>
          <p>Don't have an account?</p>

          <NoUnderlineLink to="/register">
            <SignUpButton>SIGN UP</SignUpButton>
          </NoUnderlineLink>
        </Header>
        <Form>
          <Input>
            <h2>Sign In</h2>
            <form onSubmit={loginUser}>
              <Inputfield>
                <img src={avatar} />
                <StyledInput
                  type="text"
                  id="email"
                  placeholder="E-Mail"
                  value={user.email}
                  onChange={inputHandler}
                />
                {error?.email && <p>{error.email}</p>}
              </Inputfield>

              <Inputfield>
                <img src={password} />
                <StyledInput
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={user.password}
                  onChange={inputHandler}
                />
                {error?.password && <p>{error.password}</p>}
              </Inputfield>
              <SignInButton>
                <StyledInputButton type="submit" value="SIGN IN" />
                <p>{error?.detail}</p>
                {isLoading && <p>Request is being processed</p>}
              </SignInButton>
            </form>
          </Input>
        </Form>
      </Right>
    </Container>
  );
}

export default LoginPage;
