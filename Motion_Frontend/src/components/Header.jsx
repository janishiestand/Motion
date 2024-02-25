import { useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  StyledNavLink,
  LeftContainer,
  RightContainer,
  Logo,
  StyledNav,
  PostsNavItem,
  FindFriendsDiv,
  Notifications,
  Menu,
  NotificationsDropDownMenu,
  NotificationIconDiv,
  NumberOfNotifications,
  DropDownMenu,
  AvatarSize,
  RequestsContainer,
} from "../Styles/HeaderStyles";
import { useEffect, useState } from "react";
import logo from "../motion-assets/images/logo.png";
import posts from "../motion-assets/svgs/postsSelected.svg";
import findFriendsIcon from "../motion-assets/svgs/icon-friends.svg";
import notificationBell from "../motion-assets/svgs/notification_bell.svg";
import menuIcon from "../motion-assets/svgs/menu.svg";
import { axiosApi } from "../api/axiosApi";
import { useDispatch, useSelector } from "react-redux";
import { logout_user } from "../store/slices/userSlice";
import ReceivedRequestCard from "./ReceivedRequestCard";
import SentRequestCard from "./SentRequestCard";
import defaultProfilePicture from "../motion-assets/images/users/jennifer.png";

export default function Header() {
  const [dropdownNotifications, setDropDownNotifications] = useState(false);
  const [receivedRequest, setReceivedRequest] = useState([]);
  const [sentRequest, setSentRequest] = useState([]);
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const userId = localStorage.getItem("userId");
  const userAvatar = useSelector((state) => state.user.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localAccessToken = localStorage.getItem("accessToken");

  const authorization = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };

  useEffect(() => {
    const retrieveNotifications = async () => {
      
      if (localAccessToken) {
        const getRequests = await axiosApi.get(
          "/social/friends/requests/",
          authorization
        );
        const setreceivedRequests = getRequests.data.results.filter(
          (request) => request.receiver.id == userId
        );
        const setsentRequests = getRequests.data.results.filter(
          (request) => request.requester.id == userId
        );
        setNumberOfNotifications(getRequests.data.count);
        setReceivedRequest(setreceivedRequests);
        setSentRequest(setsentRequests);
          
      } else {
        console.log("No Notifications Found.");
      }
    };
    retrieveNotifications();
  }, []);

  const toggleDropDownNotifications = () => {
    setDropDownNotifications((dropdownNotifications) => !dropdownNotifications);
    if (dropDownMenu) {
      toggleDropDownMenu();
    }
  };

  const toggleDropDownMenu = () => {
    setDropDownMenu((dropDownMenu) => !dropDownMenu);
    if (dropdownNotifications) {
      toggleDropDownNotifications();
    }
  };

  const redirectToProfile = () => {
    toggleDropDownMenu();
    navigate("/user");
  };

  const logout = () => {
    dispatch(logout_user());
    navigate("/login");
  };

  const declineRequest = async (requestId) => {
    try {
      const deleteRequest = await axiosApi.delete(
        `/social/friends/requests/${requestId}`,
        authorization
      );
      console.log(deleteRequest);
    } catch (error) {
      console.log(error.message);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const acceptRequest = await axiosApi.patch(
        `/social/friends/requests/${requestId}`,
        authorization
      );
      console.log(acceptRequest);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <HeaderContainer>
        <LeftContainer>
          <Logo>
            <img src={logo} />
            <div>Motion</div>
          </Logo>
          <StyledNav>
            <StyledNavLink to="/posts">
              <PostsNavItem>
                <img src={posts} />
                Posts
              </PostsNavItem>
            </StyledNavLink>

            <StyledNavLink to="/findfriends">
              <FindFriendsDiv>
                <img src={findFriendsIcon} />
                Find Friends
              </FindFriendsDiv>
            </StyledNavLink>
          </StyledNav>
        </LeftContainer>
        <RightContainer>
          <Notifications>
            <NotificationIconDiv>
              <img
                src={notificationBell}
                onClick={toggleDropDownNotifications}
              />
              {numberOfNotifications > 0 && (
                <NumberOfNotifications>
                  {numberOfNotifications}
                </NumberOfNotifications>
              )}
            </NotificationIconDiv>
            {dropdownNotifications && (
              <NotificationsDropDownMenu>
                <RequestsContainer>
                  <span>Received Requests</span>
                  {receivedRequest &&
                    receivedRequest.map((request) => (
                      <ReceivedRequestCard
                        key={request.id}
                        request={request}
                        declineRequest={() => declineRequest(request.id)}
                        acceptRequest={() => acceptRequest(request.id)}
                      />
                    ))}
                </RequestsContainer>
                <RequestsContainer>
                  <span>Sent Requests</span>
                  {sentRequest &&
                    sentRequest.map((request) => (
                      <SentRequestCard key={request.id} request={request} />
                    ))}
                </RequestsContainer>
              </NotificationsDropDownMenu>
            )}
          </Notifications>
          <StyledNavLink to="/user">
            {userAvatar ? (
              <AvatarSize src={userAvatar} />
            ) : (
              <AvatarSize src={defaultProfilePicture} />
            )}
          </StyledNavLink>
          <Menu onClick={toggleDropDownMenu}>
            <img src={menuIcon} />
          </Menu>
          {dropDownMenu && (
            <DropDownMenu>
              <span onClick={redirectToProfile}>Profile</span>
              <span onClick={logout}>Logout</span>
            </DropDownMenu>
          )}
        </RightContainer>
      </HeaderContainer>
    </>
  );
}
