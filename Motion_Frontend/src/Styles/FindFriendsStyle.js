import styled from "styled-components";

export const FindFriendsPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px;
`;

export const FindFriendsContainer = styled.div`
  display: flex;
  width: 80%;
  gap: 20px;
  flex-wrap: wrap;
  min-width: 1125px;
`;

export const UserProfileCard = styled.div`
  width: 310px;
  height: 489px;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  padding: 25px;
  gap: 25px;

  span {
    font-size: 14px;
  }

  img {
    width: 70px;
    height: 70px;
  }
`;

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  button {
    height: 45px;
    display: flex;
    padding: 10px;
    border: 0.5px black solid;
    border-radius: 20px;
    width: 140px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    background-color: transparent;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

export const NameAndLocation = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

export const AboutMe = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  min-height: 75px;
  max-height: 120px;
  overflow: scroll;
  margin-top: 15px;
`;

export const ThingsUserLikesDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  span {
    padding: 12px;
    background-color: #f2f2f2;
    border-radius: 15px;
  }
`;
