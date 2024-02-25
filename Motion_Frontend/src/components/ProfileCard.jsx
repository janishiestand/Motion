import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AboutMe,
  ButtonsDiv,
  NameAndLocation,
  ThingsUserLikesDiv,
  UserProfileCard,
} from "../Styles/FindFriendsStyle";
import defaultProfilePicture from "../motion-assets/images/users/jennifer.png";
import checkMarkIcon from "../motion-assets/svgs/checkMarkIcon.svg";
import { axiosApi } from "../api/axiosApi";

export default function ProfileCard({ userData, me }) {
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState(false);
  const [friend, setFriend] = useState("");
  const [loading, setLoading] = useState(true);
  const localAccessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const authorization = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };
  const receiverApiData = {
    email: userData.email,
    username: userData.email,
    things_user_likes: userData.things_user_likes,
  };
  const requesterApiData = {
    email: me.email,
    username: me.username,
    things_user_likes: me.things_user_likes,
  };

  useEffect(() => {
    const checkUserData = () => {
      const parsedUser = {
        id: userData.id,
        first_name: userData.first_name || "FirstName",
        last_name: userData.last_name || "LastName",
        location: userData.location || "Location",
        about_me: userData.about_me || "Enter 'About Me' Text",
        things_user_likes: userData.things_user_likes,
      };
      setUser(parsedUser);
    };
    checkUserData();
  }, [userData]);

  useEffect(() => {
    const checkFollowing = async () => {
      const following = await axiosApi.get(
        "/social/followers/following",
        authorization
      );
      const ids = following.data.results;
      if (ids.some((item) => item.id === userData.id)) {
        setFollowing(true);
      }
    };
    checkFollowing();
  }, [userData.id, localAccessToken]);

  const toggleFollow = async () => {
    try {
      if (localAccessToken) {
        await axiosApi.post(
          `/social/followers/toggle-follow/${user.id}/`,
          receiverApiData,
          authorization
        );
        setFollowing((prevData) => !prevData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const checkFriend = async () => {
      try {
        if (localAccessToken) {
          const friendsListData = await axiosApi.get(
            "/social/friends/",
            authorization
          );
          const pendingData = await axiosApi.get(
            "/social/friends/requests/",
            authorization
          );
          const friendsList = friendsListData.data.results;
          const pending = pendingData.data.results;
          if (friendsList.some((item) => item.id === userData.id)) {
            setFriend("friend");
          } else if (pending.some((item) => item.receiver.id === userData.id)) {
            setFriend("pending");
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    checkFriend();
  }, []);

  const navigateToUser = () => {
    navigate(`/users/${userData.id}`);
  };

const sendFriendRequest = async () => {
    const Friend = {
      requester: requesterApiData,
      receiver: receiverApiData,
    };
    console.log(Friend);
    try {
      const sendRequest = await axiosApi.post(
        `/social/friends/request/${userData.id}/`,
        Friend,
        authorization
      );
      console.log("Success!", sendRequest);
      setFriend("pending");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserProfileCard>
        {userData.avatar ? (
          <img src={userData.avatar} />
        ) : (
          <img src={defaultProfilePicture} />
        )}
        <NameAndLocation onClick={navigateToUser}>
          <p style={{ fontSize: "22px" }}>
            {user.first_name} {user.last_name}
          </p>
          {userData.location ? (
            <span>{user.location}</span>
          ) : (
            <span>No Location</span>
          )}
        </NameAndLocation>
        <ButtonsDiv>
          {following ? (
            <button
              onClick={toggleFollow}
              style={{
                background:
                  "linear-gradient(to right bottom, rgba(196, 104, 255, 1), rgba(110, 145, 246, 1))",
                border: "none",
              }}
            >
              FOLLOWING
            </button>
          ) : (
            <button onClick={toggleFollow}>FOLLOW</button>
          )}

          {friend === "friend" ? (
            <button>
              <img src={checkMarkIcon} />
              FRIEND
            </button>
          ) : friend === "pending" ? (
            <button disabled>PENDING</button>
          ) : (
            <button onClick={sendFriendRequest}>ADD FRIEND</button>
          )}
        </ButtonsDiv>
        <AboutMe>{user.about_me}</AboutMe>
        <ThingsUserLikesDiv>
          {user.things_user_likes &&
            user.things_user_likes.map((hobby) => (
              <span key={hobby}>{hobby}</span>
            ))}
        </ThingsUserLikesDiv>
      </UserProfileCard>
    </>
  );
}
