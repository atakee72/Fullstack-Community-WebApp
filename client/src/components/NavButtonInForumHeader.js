import React from "react";
import { Button } from "react-bootstrap";

function NavButtonInForumHeader({ setCollectionType, collectionType }) {
  const buttonData = [
    { header: "Discussions", collectionType: "topics" },
    { header: "Announcements", collectionType: "announcements" },
    {
      header: "Recommendations",
      collectionType: "recommendations",
    },
  ];

  return (
    <>
      {buttonData.map((button, index) => (
        <Button
          key={index}
          variant="light"
          onClick={() => setCollectionType(button.collectionType)}
          active={collectionType === button.collectionType}
        >
          {button.header}
        </Button>
      ))}
    </>
  );
}

export default NavButtonInForumHeader;
