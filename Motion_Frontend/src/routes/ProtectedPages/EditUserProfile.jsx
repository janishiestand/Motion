import { useEffect, useState } from "react";
import { axiosApi } from "../../api/axiosApi";
import bannerImg from "../../motion-assets/images/feedPics/image1.png";
import userAvatar from "../../motion-assets/images/users/jennifer.png";
import cameraIcon from "../../motion-assets/svgs/camera.svg";
import uploadIcon from "../../motion-assets/svgs/uploadIcon.svg";
import deleteIcon from "../../motion-assets/svgs/deleteIcon.svg";
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
} from "../../Styles/UserProfileStyles";
import {
  DisplayActivity,
  DeleteAndSave,
  EditUserContainer,
  EditUserDetails,
  ProfilePictureDropdownMenu,
  TILInputDiv,
  ThingsILikeField,
  UpdateProfilePicture,
  UpdateUserDataForm,
  UserDataField,
  UserDataFieldRow,
  DisplayActivityContainer,
} from "../../Styles/EditUserProfileStyles";
import { useNavigate } from "react-router-dom";

export default function EditUserProfile() {
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    job: "",
    avatar: "",
    banner: "",
    location: "",
    password: "",
    phone_number: "",
    about_me: "",
    things_user_likes: [],
  });
  const [toggleUploadImage, setToggleUploadImage] = useState(false);
  const [toggleAvatarUpdate, setToggleAvatarUpdate] = useState(false);
  const [toggleBannerUpdate, setToggleBannerUpdate] = useState(false);
  const navigate = useNavigate();

  const retrieveUser = async () => {
    const localAccessToken = localStorage.getItem("accessToken");
    if (localAccessToken) {
      const getUserData = await axiosApi.get("/users/me", {
        headers: {
          Authorization: `Bearer ${localAccessToken}`,
        },
      });
      parseUserData(getUserData.data);
    } else {
      console.log("No User Found.");
    }
  };

  useEffect(() => {
    retrieveUser();
  }, []);

  const parseUserData = (retrievedUser) => {
    const parsedData = {
      email: retrievedUser.email,
      first_name: retrievedUser?.first_name,
      last_name: retrievedUser?.last_name,
      id: retrievedUser.id,
      username: retrievedUser.username,
      job: retrievedUser?.job,
      avatar: retrievedUser?.avatar || userAvatar,
      banner: retrievedUser?.banner || bannerImg,
      location: retrievedUser?.location || "Location Unavailable",
      password: "password",
      phone_number: retrievedUser?.phone_number,
      about_me: retrievedUser?.about_me,
      things_user_likes: retrievedUser?.things_user_likes,
    };
    setUserData(parsedData);
  };

  const toggleUploadImageMenu = () => {
    setToggleUploadImage((prevToggle) => !prevToggle);
  };

  const SaveUserData = async (e) => {
    const updatedData = {
      email: userData.email,
      username: userData.username,
      things_user_likes: userData.things_user_likes,
      first_name: userData.first_name,
      last_name: userData.last_name,
      location: userData.location,
      phone_number: userData.phone_number,
      about_me: userData.about_me,
    };

    if (toggleAvatarUpdate) {
      updatedData.avatar = userData.avatar;
    }

    if (toggleBannerUpdate) {
      updatedData.banner = userData.banner;
    }

    await patchUserData(updatedData);
  };

  async function patchUserData(updatedData) {
    try {
      if (userData) {
        const localAccessToken = localStorage.getItem("accessToken");
        if (toggleAvatarUpdate || toggleBannerUpdate) {
          await axiosApi.patch(
            "/users/me/",
            updatedData,
            {
              headers: {
                Authorization: `Bearer ${localAccessToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          await axiosApi.patch(
            "/users/me/",
            updatedData,
            {
              headers: {
                Authorization: `Bearer ${localAccessToken}`,
              },
            }
          );
        }
        if (toggleAvatarUpdate || toggleBannerUpdate) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  const updateUserField = async (fieldName, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    if (fieldName === "avatar") {
      setToggleAvatarUpdate(true);
    } else if (fieldName === "banner") {
      setToggleBannerUpdate(true);
    }
  };

  useEffect(() => {
    if (toggleBannerUpdate || toggleAvatarUpdate) {
      SaveUserData();
    }
  }, [toggleBannerUpdate, toggleAvatarUpdate]);

  const addToThingsUserLikes = (e) => {
    e.preventDefault();
    let activityToAdd = document.getElementById("activityToAdd").value;
    const tilArray = userData.things_user_likes;
    if (tilArray.includes(activityToAdd) || activityToAdd === "") {
      document.getElementById("activityToAdd").value = "";
      return;
    } else {
      tilArray.push(activityToAdd);
      setUserData((prevData) => ({
        ...prevData,
        things_user_likes: tilArray,
      }));
      document.getElementById("activityToAdd").value = "";
    }
  };

  const removeThingUserLikes = (value) => {
    const filteredArray = userData.things_user_likes.filter((x) => x !== value);
    setUserData((prevData) => ({
      ...prevData,
      things_user_likes: filteredArray,
    }));
  };

  const SaveAndRedirect = (e) => {
    SaveUserData(e);
    navigate("/user");
  };

  if (userData) {
    return (
      <>
        <UserProfilePageContainer>
          <BannerContainer>
            <BannerImage src={userData.banner} />
          </BannerContainer>

          <EditUserContainer>
            <EditUserDetails>
              <UserAndLocation>
                <img src={userData.avatar} alt="" />
                <UpdateProfilePicture onClick={toggleUploadImageMenu}>
                  <span>Update image</span>
                </UpdateProfilePicture>
                {toggleUploadImage && (
                  <ProfilePictureDropdownMenu>
                    <input
                      type="file"
                      name="updateProfilePicture"
                      id="updateProfilePicture"
                      onChange={(e) =>
                        updateUserField("avatar", e.target.files[0])
                      }
                    />
                    <span>
                      <label htmlFor="updateProfilePicture">
                        <img src={uploadIcon} />
                        Upload
                      </label>
                    </span>
                    <span>
                      <img src={deleteIcon} />
                      Remove
                    </span>
                  </ProfilePictureDropdownMenu>
                )}
              </UserAndLocation>

              <DeleteAndSave>
                <button>DELETE ACCOUNT</button>
                <button
                  style={{
                    backgroundColor: "rgba(196, 104, 255, 1)",
                    color: "white",
                  }}
                  onClick={(e) => SaveAndRedirect(e)}
                >
                  SAVE
                </button>
              </DeleteAndSave>
            </EditUserDetails>

            <UpdateUserDataForm
              id="updateUserDataForm"
              onSubmit={(e) => SaveUserData(e)}
            >
              <UserDataField>
                <span>First Name</span>
                <input
                  type="text"
                  value={userData.first_name || ""}
                  onChange={(e) =>
                    updateUserField("first_name", e.target.value)
                  }
                />
              </UserDataField>

              <UserDataField>
                <span>Last Name</span>
                <input
                  type="text"
                  value={userData.last_name || ""}
                  onChange={(e) => updateUserField("last_name", e.target.value)}
                />
              </UserDataField>

              <UserDataField>
                <span>Email</span>
                <input
                  type="text"
                  value={userData.email || ""}
                  onChange={(e) => updateUserField("email", e.target.value)}
                />
              </UserDataField>

              <UserDataField>
                <span>Username</span>
                <input
                  type="text"
                  value={userData.username || ""}
                  onChange={(e) => updateUserField("username", e.target.value)}
                />
              </UserDataField>

              <UserDataField>
                <span>Location</span>
                <input
                  type="location"
                  value={userData.location || ""}
                  onChange={(e) => updateUserField("location", e.target.value)}
                />
              </UserDataField>

              <UserDataField>
                <span>Phone</span>
                <input
                  type="text"
                  value={userData.phone_number || ""}
                  onChange={(e) =>
                    updateUserField("phone_number", e.target.value)
                  }
                />
              </UserDataField>

              <UserDataField>
                <span>About</span>
                <textarea
                  name="text"
                  rows="14"
                  cols="10"
                  wrap="soft"
                  value={userData.about_me}
                  onChange={(e) => updateUserField("about_me", e.target.value)}
                ></textarea>
              </UserDataField>

              <UserDataField>
                <span>Password</span>
                <input
                  type="password"
                  readOnly
                  value={userData.password || ""}
                />
              </UserDataField>

              <ThingsILikeField>
                <span>Things I Like</span>
                <DisplayActivityContainer>
                  {userData.things_user_likes &&
                    userData.things_user_likes.map((activity) => {
                      return (
                        <DisplayActivity key={activity}>
                          {activity}
                          <span
                            onClick={(e) => removeThingUserLikes(activity)}
                            value={activity}
                          >
                            x
                          </span>
                        </DisplayActivity>
                      );
                    })}
                </DisplayActivityContainer>
                <TILInputDiv>
                  <input
                    id="activityToAdd"
                    type="text"
                    placeholder="Type something..."
                  />
                  <button onClick={(e) => addToThingsUserLikes(e)}>ADD</button>
                </TILInputDiv>
              </ThingsILikeField>
            </UpdateUserDataForm>
          </EditUserContainer>
          <UpdateImage>
            <input
              type="file"
              name="updateBannerPicture"
              id="updateBannerPicture"
              onChange={(e) => updateUserField("banner", e.target.files[0])}
            />
            <label htmlFor="updateBannerPicture">
              <img src={cameraIcon} />
              <span>Update image</span>
            </label>
          </UpdateImage>
        </UserProfilePageContainer>
      </>
    );
  } else {
    return <UserProfilePageContainer>Loading...</UserProfilePageContainer>;
  }
}
