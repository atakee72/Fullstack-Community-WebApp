import React from "react";
import { Card } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavButtonInForumHeader from "./NavButtonInForumHeader";
import SearchForm from "./SearchForm";
import AddNewPost from "./AddNewPost";
import PostModal from "./PostModal";
import Cards from "./Cards";

function ForumSection({
  collectionType,
  handle_InSearch_Input,
  handle_InSearch_Filter,
  handleShow,
  handleTagsSelected,
  handleClose,
  setCollectionType,
  setPostBody,
  setPostTitle,
  postInForum,
  postTitle,
  postTitleRef,
  postBodyRef,
  postBody,
  searchInputRef,
  show,
  availableTags,
  postAComment,
  deleteForumPost,
  deleteAComment,
  updateLikesCounter,
  serverMsg,
  loggedUser,
  filteredData,
}) {
  const sectionData = [
    { header: "Discussions", collectionType: "topics" },
    { header: "Announcements", collectionType: "announcements" },
    {
      header: "Recommendations",
      collectionType: "recommendations",
    },
  ];

  return (
    <Card className="mainCard">
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey={sectionData[collectionType]}>
          <Nav.Item>
            <NavButtonInForumHeader
              collectionType={collectionType}
              setCollectionType={setCollectionType}
            />
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <div className="d-flex  flex-column justify-items-center">
          <SearchForm
            handle_InSearch_Input={handle_InSearch_Input}
            collectionType={collectionType}
            handle_InSearch_Filter={handle_InSearch_Filter}
            searchInputRef={searchInputRef}
          />

          <div>
            {loggedUser && (
              <AddNewPost
                handleShow={handleShow}
                collectionType={collectionType}
              />
            )}
          </div>

          <div>
            <PostModal
              collectionType={collectionType}
              show={show}
              handleClose={handleClose}
              postInForum={postInForum}
              postTitle={postTitle}
              postTitleRef={postTitleRef}
              postBodyRef={postBodyRef}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleTagsSelected={handleTagsSelected}
              availableTags={availableTags}
            />
          </div>
        </div>

        {filteredData.length > 0 ? (
          filteredData.map((item, i) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              key={i}
            >
              <Cards
                item={item}
                post={item}
                comments={item.comments}
                author={item.author}
                postAComment={postAComment}
                deleteForumPost={deleteForumPost}
                deleteAComment={deleteAComment}
                updateLikesCounter={updateLikesCounter}
                serverMsg={serverMsg}
              />
            </div>
          ))
        ) : (
          <h5 className="text-center mb-5 pt-4">
            Nothing to show here. There probably is an error with the data
            fetching.
          </h5>
        )}
      </Card.Body>
    </Card>
  );
}

export default ForumSection;
