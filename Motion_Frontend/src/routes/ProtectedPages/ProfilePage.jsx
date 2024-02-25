import { useParams } from "react-router-dom";
import { axiosApi } from "../../api/axiosApi";
import { useEffect, useState } from "react";
import {
  BannerContainer,
  BannerImage,
  UserProfilePageContainer,
  UserProfileContainer,
  UserDetails,
  UserAboutAndStats,
  UserAbout,
  UserStats,
  UserAndLocation,
  FollowAddFriendButtons,
  AboutSection,
  ThingsILikeSection,
  ThingsUserLikes,
  UserStat,
} from "../../Styles/UserProfileStyles";
import defaultProfilePicture from "../../motion-assets/images/users/jennifer.png"
import checkMarkIcon from "../../motion-assets/svgs/checkMarkIcon.svg"

export default function ProfilePage() {
  const [user, setUserData] = useState([]);
  const { userId } = useParams();
  const [following, setFollowing] = useState(false);
  const [friend, setFriend] = useState("");
  const [loading, setLoading] = useState(true);
  const localAccessToken = localStorage.getItem("accessToken");
  const authorization = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };
  // const receiverApiData = {
  //   email: userData.email,
  //   username: userData.email,
  //   things_user_likes: userData.things_user_likes,
  // };
  // const requesterApiData = {
  //   email: me.email,
  //   username: me.username,
  //   things_user_likes: me.things_user_likes,
  // };

  
  const retrieveUserData = async () => {
    const localAccessToken = localStorage.getItem("accessToken");
    if (localAccessToken) {
      const getUser = await axiosApi.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localAccessToken}`,
        },
      });
      const parsedUser = {
        id: getUser.data.id,
        avatar: getUser.data.avatar || defaultProfilePicture,
        first_name: getUser.data.first_name || "FirstName",
        last_name: getUser.data.last_name || "LastName",
        location: getUser.data.location || "Location",
        about_me: getUser.data.about_me || "Enter 'About Me' Text",
        things_user_likes: getUser.data.things_user_likes || [],
        amount_following: getUser.data.amount_following,
        amount_of_followers: getUser.data.amount_of_followers,
        amount_of_friends: getUser.data.amount_of_friends,
        amount_of_likes: getUser.data.amount_of_likes,
        amount_of_posts: getUser.data.amount_of_posts,
      };
      setUserData(parsedUser);
    }
  };

  useEffect(() => {
    retrieveUserData();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserProfilePageContainer>
        <BannerContainer>
          <BannerImage src={user.banner} />
        </BannerContainer>

        <UserProfileContainer>
          <UserDetails>
            <UserAndLocation>
              <img src={user.avatar} />
              <p style={{ fontSize: "24px", marginTop: "5px" }}>
                {user.first_name} {user.last_name}
              </p>
              <p style={{ fontSize: "14px" }}>{user.location}</p>
            </UserAndLocation>
            <FollowAddFriendButtons>
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
            </FollowAddFriendButtons>
          </UserDetails>

          <UserAboutAndStats>
            <UserAbout>
              <AboutSection>
                <p style={{ marginBottom: "15px" }}>About</p>
                <p>{user.about_me}</p>
              </AboutSection>
              <ThingsILikeSection>
                <p style={{ marginBottom: "15px" }}>Things I Like</p>
                <ThingsUserLikes>
                  {user.things_user_likes &&
                    user.things_user_likes.map((thing) => {
                      return <span key={thing.title}>{thing.title}</span>;
                    })}
                </ThingsUserLikes>
              </ThingsILikeSection>
            </UserAbout>

            <UserStats>
              <UserStat>
                {user.amount_of_posts}
                <span>Posts</span>
              </UserStat>
              <UserStat>
                {user.amount_of_likes}
                <span>Likes</span>
              </UserStat>
              <UserStat>
                {user.amount_of_friends}
                <span>Friends</span>
              </UserStat>
              <UserStat>
                {user.amount_of_followers}
                <span>Followers</span>
              </UserStat>
              <UserStat>
                {user.amount_following}
                <span>Following</span>
              </UserStat>
            </UserStats>
          </UserAboutAndStats>
        </UserProfileContainer>
      </UserProfilePageContainer>
    </>
  );
}
