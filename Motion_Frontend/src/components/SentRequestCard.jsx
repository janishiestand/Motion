import { useEffect, useState } from "react";
import {
  NameAndLocation,
  RequestButtons,
  SentAndReceivedRequestContainer,
} from "../Styles/HeaderStyles";
import defaultProfilePic from "../motion-assets/images/users/jennifer.png";
import pendingIcon from "../motion-assets/svgs/pendingIcon.svg";

export default function SentRequestCard({ request }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const parseUser = () => {
      const parsedUser = {
        avatar: request.receiver.avatar || defaultProfilePic,
        first_name: request.receiver.first_name || "First Name",
        last_name: request.receiver.last_name || "Last Name",
        location: request.receiver.location || "Location Unknown",
      };
      setUser(parsedUser);
    };
    parseUser();
  }, [request]);

  return (
    <SentAndReceivedRequestContainer>
      <img src={user.avatar} />
      <NameAndLocation>
        <span>
          {user.first_name} {user.last_name}
        </span>
        <span>{user.location}</span>
      </NameAndLocation>
      <RequestButtons>
        <img src={pendingIcon} />
      </RequestButtons>
    </SentAndReceivedRequestContainer>
  );
}
