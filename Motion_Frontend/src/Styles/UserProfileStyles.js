import styled from "styled-components";

export const UserProfilePageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BannerContainer = styled.div`
  height: 320px;
  overflow: hidden;
  width: 100%;
  min-width: 900px;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UpdateImage = styled.div`
  position: absolute;
  display: flex;
  font-size: 14px;
  align-items: center;
  color: white;
  align-self: flex-end;
  margin-right: 5.5%;
  margin-top: 80px;

  img {
    filter: invert(1);
    width: 24px;
    height: 24px;
  }

  input {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const UserProfileContainer = styled.div`
  display: flex;
  border-radius: 5px;
  height: 362px;
  width: 90%;
  background-color: white;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
  top: 199px;
  position: absolute;
  min-width: 1100px;
`;

export const UserDetails = styled.div`
  height: 362px;
  flex: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  max-width: 350px;
`;

export const UserAndLocation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  img {
    width: 80px;
    height: 80px;
  }
`;

export const FollowAddFriendButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 60%;

  button {
    border-radius: 15px;
    padding: 5px;
    background-color: transparent;
    font-size: 10px;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.07);
    height: 40px;
    border-color: transparent;
  }
  button:hover {
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.15);
  }
`;

export const UserAboutAndStats = styled.div`
  flex: 2.5;
  display: flex;
  flex-direction: column;
`;

export const UserAbout = styled.div`
  flex: 2;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 35px;
  font-size: 14px;
`;

export const AboutSection = styled.div`
  height: 175px;
  flex: 1;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  textarea {
    border: none;
    resize: none;
    height: 75px;
    outline: none;
  }
`;

export const PhoneAndEmail = styled.div`
  display: flex;
  height: 40px;
  gap: 50px;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    span {
      font-size: 16px;
      opacity: 75%;
    }
  }
`;

export const ThingsILikeSection = styled.div`
  height: 175px;
  flex: 1;
`;

export const ThingsUserLikes = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  max-height: 125px;
  overflow: scroll;
  span {
    padding: 10px 15px;
    background-color: #f2f2f2;
    border-radius: 20px;
  }
`;

export const UserStats = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 25px;
`;

export const UserStat = styled.div`
  display: flex;
  flex-direction: column;
  height: 55px;
  width: 80px;
  font-size: 24px;

  span {
    color: #808080;
    margin-top: 5px;
    font-size: 16px;
  }
`;
