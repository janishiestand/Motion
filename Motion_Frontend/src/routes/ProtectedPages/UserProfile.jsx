import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cameraIcon from "../../motion-assets/svgs/camera.svg";
import { axiosApi } from "../../api/axiosApi";

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
  UpdateImage,
  PhoneAndEmail,
} from "../../Styles/UserProfileStyles";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUserData] = useState([]);

  const retrieveUser = async () => {
    const localAccessToken = localStorage.getItem("accessToken");
    if (localAccessToken) {
      const getUserData = await axiosApi.get("/users/me", {
        headers: {
          Authorization: `Bearer ${localAccessToken}`,
        },
      });
      setUserData(getUserData.data);
    } else {
      console.log("No User Found.");
      navigate("/login");
    }
  };

  useEffect(() => {
    retrieveUser();
  }, []);

  const redirectToEdit = () => {
    navigate("/editprofile");
  };

  const changeBanner = (e) => {
    console.log(e);
  };

  const loadPosts = () => {};

  const loadFriends = () => {};

  const loadFollowers = () => {};

  const loadFollowing = () => {};

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
              <button onClick={redirectToEdit}>EDIT PROFILE</button>
            </FollowAddFriendButtons>
          </UserDetails>

          <UserAboutAndStats>
            <UserAbout>
              <AboutSection>
                <p style={{ marginBottom: "15px" }}>About</p>
                <textarea readOnly value={user.about_me} />

                <PhoneAndEmail>
                  <div>
                    Email
                    <span>{user.email}</span>
                  </div>
                  <div>
                    Phone Number
                    <span>{user.phone_number}</span>
                  </div>
                </PhoneAndEmail>
              </AboutSection>
              <ThingsILikeSection>
                <p style={{ marginBottom: "15px" }}>Things I Like</p>
                <ThingsUserLikes>
                  {user.things_user_likes &&
                    user.things_user_likes.map((hobby) => {
                      return <span key={hobby}>{hobby}</span>;
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
        <UpdateImage>
          <input
            type="file"
            name="updateImage"
            id="updateImage"
            onChange={(e) => changeBanner(e.target.value)}
          />
          <label htmlFor="updateImage">
            <img src={cameraIcon} />
            <span>Update image</span>
          </label>
        </UpdateImage>
      </UserProfilePageContainer>
    </>
  );
}
