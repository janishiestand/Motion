import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
  padding: 0px 32px;
  background-color: white;
  min-width: 1150px;
`;

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
`;

export const DarkModeButton = styled.button`
  border-radius: 1px solid black;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  height: 80px;
  color: black;
  align-items: center;
`;

export const LeftContainer = styled.div`
  display: flex;
  width: 536px;
  align-items: center;
  gap: 144px;
  height: 80px;
`;

export const Logo = styled.div`
  width: 108px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 22px;

  img {
    width: 26px;
    height: 26px;
  }
`;

export const FindFriendsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  img {
    padding: 6px, 4px;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  width: 284px;
  gap: 72px;
  align-items: center;

  .active {
    border-bottom: 2px solid rgba(173, 115, 253, 1);
  }
`;

export const PostsNavItem = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;

  img {
    width: 18px;
    height: 18px;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  height: 40px;
  width: 166px;
  align-items: center;
  gap: 32px;
  
    img {
        border-radius: 50px;
    }

`;

export const Notifications = styled.div`
  display: flex;
  padding-left: 15px;
`;

export const Menu = styled.div`
  display: flex;
  color: beige;
  width: 20px;
  height: 20px;
  padding: 5px;
  justify-content: center;
  margin-left: -7px;
`;

export const NotificationsDropDownMenu = styled.div`
  height: 368px;
  width: 300px;
  z-index: 1000;
  background-color: white;
  position: absolute;
  padding: 10px;
  right: 80px;
  top: 80px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

export const RequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  gap: 10px;
`;

export const SentAndReceivedRequestContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    max-width: 35px;
    max-height: 35px;
  }
`;

export const NameAndLocation = styled.div`
  display: flex;
  flex-direction: column;
  width: 125px;
  margin-left: 10px;
  justify-content: center;
  gap: 2px;
  span {
    font-size: 12px;
  }
`;

export const RequestButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  button {
    border: none;
    padding: 10px;
    border-radius: 20px;
    width: 35px;
  }

  span {
    border: none;
    padding: 7px;
    border-radius: 20px;
    width: 20px;
    text-align: center;
    color: white;
    background: linear-gradient(
      to bottom right,
      rgba(196, 104, 255, 1),
      rgba(110, 145, 246, 1)
    );
  }
`;

export const NotificationIconDiv = styled.div`
  display: flex;
`;

export const NumberOfNotifications = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  padding: 5px;
  background: linear-gradient(
    to bottom right,
    rgba(196, 104, 255, 1),
    rgba(110, 145, 246, 1)
  );
  border-radius: 30px;
  color: white;
  min-width: 15px;
`;

export const DropDownMenu = styled.div`
  height: 96px;
  width: 150px;
  top: 80px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  text-align: center;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 35px;
  }
  span:hover {
    background-color: gray;
  }
`;

export const AvatarSize = styled.img`
  width: 38px;
  height: 38px;
`;
