import styled from "styled-components";
import { UserDetails, UserProfileContainer } from "./UserProfileStyles";

export const EditUserContainer = styled(UserProfileContainer)`
  height: 730px;
  min-width: 850px;
`;

export const EditUserDetails = styled(UserDetails)`
  height: 730px;
  justify-content: space-around;
  min-width: 215px;

  img {
    width: 80px;
    height: 80px;
  }
`;

export const UpdateProfilePicture = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  text-align: center;
  justify-content: center;
  width: 40%;
  border-radius: 20px;
  padding: 5px;
  background-color: transparent;
  font-size: 10px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.07);
  height: 40px;
  border-color: transparent;
  font-size: 14px;

  input {
    display: none;
  }
`;

export const DeleteAndSave = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  button {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: 20px;
    background-color: transparent;
    font-size: 10px;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.07);
    height: 40px;
    border-color: transparent;
    font-size: 14px;
  }
`;

export const ProfilePictureDropdownMenu = styled.div`
  width: 125px;
  height: 55px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  border-radius: 20px;
  gap: 5px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.07);

  span {
    display: flex;
    height: 25px;
    padding: 5px;
    align-items: center;
    justify-content: center;
  }
  span:hover {
    background-color: grey;
    width: 100%;
    border-radius: 5px;
  }

  label {
    display: flex;
    align-items: center;
  }

  img {
    display: flex;
    height: 22px;
    width: 22px;
  }
`;

export const UpdateUserDataForm = styled.form`
  flex: 2;
  padding: 40px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
`;

export const UserDataFieldRow = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const UserDataField = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  height: 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    font-size: 12px;
    opacity: 50%;
  }

  input {
    border: none;
    height: 60px;
    word-wrap: break-word;
    word-break: break-all;

  }
  input:focus {
    outline: none;
  }

  textarea {
    border: none;
    resize: none;
    outline: none;
    margin-top: 10px;
    
  }
`;

export const ThingsILikeField = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  span {
    font-size: 14px;
  }

  input {
    border: none;
    height: 25px;
  }
  input:focus {
    outline: none;
  }
`;

export const DisplayActivityContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  width: 550px;
`;

export const DisplayActivity = styled.div`
  display: flex;
  height: 20px;
  padding: 7px;
  background-color: #f2f2f2;
  border-radius: 20px;
  font-size: 14px;
  border: none;
  align-items: center;

  span {
    opacity: 50%;
    padding-left: 10px;
  }
`;

export const TILInputDiv = styled.div`
  display: flex;
  height: 20px;
  align-items: center;
  padding: 5px;
  gap: 5px;
  width: 500px;

  button {
    border-radius: 20px;
    padding: 5px;
    background-color: transparent;
    font-size: 10px;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    border-color: transparent;
    font-size: 14px;
  }
  input {
    width: 90%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
`;
