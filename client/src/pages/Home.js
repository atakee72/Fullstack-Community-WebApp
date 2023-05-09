import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../store/AuthContext.js";
import ForumSection from "../components/ForumSection";

function About(selectedTags) {
  const [collectionType, setCollectionType] = useState("topics");
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const searchInputRef = useRef(null);
  const { loggedUser, userId } = useContext(AuthContext);
  // console.log("🚀 ~ About ~ userId:", userId);
  console.log("loggedUser", loggedUser?.userName, loggedUser.picture);
  const [myTags, setMyTags] = useState(selectedTags);
  const [serverMsg, setServerMsg] = useState("");

  const postTitleRef = useRef();
  const postBodyRef = useRef();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    resetPostForm();
  };

  const availableTags = [
    "sports",
    "health",
    "children",
    "school",
    "social",
    "politics",
  ];

  const handleTagsSelected = (selectedTags) => {
    console.log("Selected tags:", selectedTags);
    setMyTags(selectedTags);
  };

  const resetPostForm = () => {
    setPostTitle(null);
    setPostBody(null);
  };

  const fetchData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/${collectionType}/all`,
        requestOptions
      );
      const result = await response.json();
      console.log("result: >>>>", result);

      if (collectionType === "topics") {
        setItems(result.requestedTopics);
        setFilteredData(result.requestedTopics);
      } else if (collectionType === "announcements") {
        setItems(result.requestedAnnouncements);
        setFilteredData(result.requestedAnnouncements);
      } else if (collectionType === "recommendations") {
        setItems(result.requestedRecommendations);
        setFilteredData(result.requestedRecommendations);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handle_InSearch_Input = (e) => {
    // e.preventDefault();
    console.log(searchInputRef.current.value);
  };

  const handle_InSearch_Filter = () => {
    setSearchInputValue(searchInputRef.current.value.toLowerCase());
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchInputValue) ||
        item.body.toLowerCase().includes(searchInputValue)
    );
    setFilteredData(filtered);
    console.log("🚀 ~ setFilteredData:", filteredData);
  };

  const postInForum = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", postTitle);
    urlencoded.append("body", postBody);
    urlencoded.append("author", userId);
    urlencoded.append("date", Date.now());
    urlencoded.append("tags", myTags);
    urlencoded.append("likes", 0);
    urlencoded.append("views", 0);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      // body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/topics/post",
        requestOptions
      );
      const newPost = await response.json();
      console.log("🚀 ~ postInForum ~ newPost:", newPost);

      if (newPost) {
        handleClose();
        fetchData();
      }

      // window.location.reload();
      // alert(`🚀 ~ postInForum ~ New post created: ${JSON.stringify(newPost)}`);
    } catch (error) {
      console.log("Error sending the new post", error);
      console.log("🚀 ~ postInForum ~ error:", error);
    }
  };

  const deleteForumPost = async (e, post) => {
    e.preventDefault();
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/topics/${post._id}`,
        requestOptions
      );
      const deletedPost = await response.json();
      console.log(deletedPost);

      if (deletedPost) {
        fetchData();
      }
      // alert("🚀 ~ Deleted that post!", deletedPost);
    } catch (error) {
      console.log("🚀 ~ deleteForumPost ~ error:", error);
      alert("🚀 ~ Post could not be deleted:", error.msg);
    }
  };

  const postAComment = async (e, commentText, post) => {
    e.preventDefault();
    console.log("commentText", commentText);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("body", commentText);
      urlencoded.append("author", userId);
      urlencoded.append("date", Date.now());
      urlencoded.append("upvotes", "5");
      urlencoded.append("relevantPostId", post._id);
      console.log("🚀 ~ postAComment ~ post:", post);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:5000/api/comments/postComment",
        requestOptions
      );
      const newComment = await response.json();
      console.log("🚀 ~ postAComment ~ newComment:", newComment);
      console.log("🚀 ~ postAComment ~ checkCommends:", post.comments.at(0));

      if (newComment) {
        fetchData();
      }
    } catch (error) {
      console.log("🚀 ~ postAComment ~ error:", error);
    }
  };

  const deleteAComment = async (e, comment) => {
    e.preventDefault();

    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/${comment?._id}`,
        requestOptions
      );
      console.log("🚀 ~ comment?._Id:", comment?._id);

      const deletedComment = await response.json();
      console.log("🚀 ~ deleteAComment ~ deletedComment:", deletedComment);

      if (deletedComment) {
        fetchData();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateLikesCounter = async (e, post) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userId", userId);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/topics/${post._id}`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);

      if (result) {
        fetchData();
      }
    } catch (error) {
      console.log("error", error);
      setServerMsg(error);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      console.log("Freed up memory from the function call!");
    };
  }, [collectionType]);

  return (
    <>
      <main className="main">
        <div className="container">
          <h1 className="text-center mb-4 pb-1">Your Local Forum</h1>
          <div
            style={{
              backgroundColor: "#eccc6e",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ForumSection
              collectionType={collectionType}
              handle_InSearch_Input={handle_InSearch_Input}
              handle_InSearch_Filter={handle_InSearch_Filter}
              handleShow={handleShow}
              handleTagsSelected={handleTagsSelected}
              handleClose={handleClose}
              setCollectionType={setCollectionType}
              setPostBody={setPostBody}
              setPostTitle={setPostTitle}
              postInForum={postInForum}
              postTitle={postTitle}
              postTitleRef={postTitleRef}
              postBodyRef={postBodyRef}
              postBody={postBody}
              searchInputRef={searchInputRef}
              show={show}
              availableTags={availableTags}
              postAComment={postAComment}
              deleteForumPost={deleteForumPost}
              deleteAComment={deleteAComment}
              updateLikesCounter={updateLikesCounter}
              serverMsg={serverMsg}
              loggedUser={loggedUser}
              filteredData={filteredData}
            />
          </div>
        </div>
      </main>
      <div className="footer">
        <p>&copy; 2023 My App. All rights reserved.</p>
      </div>
    </>
  );
}

export default About;
