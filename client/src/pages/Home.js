import { useContext, useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Cards from "../components/Cards";
import { AuthContext } from "../store/AuthContext.js";
import TagSelector from "../components/TagSelector";
import Modal from "react-bootstrap/Modal";

function About(selectedTags) {
  const [collectionType, setCollectionType] = useState("topics");
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const searchInputRef = useRef(null);
  const { loggedUser, userId } = useContext(AuthContext);
  console.log("🚀 ~ About ~ userId:", userId);
  console.log("loggedUser", loggedUser?.userName);
  const [myTags, setMyTags] = useState(selectedTags);

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
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    // urlencoded.append("theLastLike", post.likes);

    const requestOptions = {
      method: "POST",
      // headers: myHeaders,
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
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      console.log("Freed up memory from the function call!");
    };
  }, [collectionType]);

  return (
    <div>
      {collectionType === "topics" && (
        <>
          <Card
            style={{
              borderRadius: "5px",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
              padding: "50px",
              margin: "20px 100px 20px 100px",
              gap: "20px",
              backgroundColor: "#4b9aaa",
              maxWidth: "90vw",
              minWidth: "50vw",
              minHeight: "40vh",
              overflow: "auto",
              resize: "vertical",
            }}
          >
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="Discussions">
                <Nav.Item>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("topics")}
                    active
                  >
                    Discussions
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("announcements")}
                  >
                    Announcements
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("recommendations")}
                  >
                    Recommendations{" "}
                  </Button>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {/* //! ==================SEARCHFORM=================  */}
              <div className="d-flex  flex-column ">
                <Form
                  className="align-items-center"
                  onChange={handle_InSearch_Input}
                  style={{ display: "flex" }}
                >
                  <Form.Group
                    className="mb-3 w-100 text-center "
                    controlId="formBasicEmail"
                  >
                    <Form.Label>
                      <h1 className=" text-center mb-5 pt-4">Discussions</h1>
                    </Form.Label>
                    <Form.Control
                      className="w-100 text-center"
                      type="text"
                      placeholder="Search in discussions"
                      onChange={handle_InSearch_Filter}
                      ref={searchInputRef}
                    />
                  </Form.Group>
                </Form>
                {/* //! button and modal for a new post   */}

                {/* //! MODAL =============================================================================================  */}

                <div>
                  {loggedUser && (
                    <Button
                      style={{
                        fontSize: "0.8em",
                        backgroundColor: "#eccc6e",
                        border: "none",
                        right: "10%",
                        bottom: "10%",
                        alignSelf: "center",
                        color: "#814256",
                        fontWeight: "bold",
                      }}
                      className="p-3"
                      variant="secondary"
                      onClick={handleShow}
                    >
                      Start a debate
                    </Button>
                  )}

                  <Modal
                    show={show}
                    onHide={handleClose}
                    style={{ backgroundColor: "#814256" }}
                  >
                    <Modal.Header className="m-1 p-1" closeButton>
                      <Modal.Title>Start a discussion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="m-1 p-1">
                      <Form className="m-1 p-3" onSubmit={postInForum}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Title of Your Text</Form.Label>
                          <Form.Control
                            type="text"
                            value={postTitle}
                            ref={postTitleRef}
                            onChange={(event) =>
                              setPostTitle(event.target.value)
                            }
                            autoFocus
                          />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>
                            Which topic do you think should be discussed here?
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            columns={12}
                            value={postBody}
                            ref={postBodyRef}
                            onChange={(event) =>
                              setPostBody(event.target.value)
                            }
                            className="m-0 p-0"
                          />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    >
                      <TagSelector
                        handleTagsSelected={handleTagsSelected}
                        availableTags={availableTags}
                      />
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>

              {/* //! =========CARDS===================== */}
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      minWidth: "100%",
                    }}
                  >
                    <Cards
                      key={i}
                      post={item}
                      comments={item.comments}
                      author={item.author}
                      postAComment={postAComment}
                      deleteForumPost={deleteForumPost}
                      deleteAComment={deleteAComment}
                      updateLikesCounter={updateLikesCounter}
                    />
                  </div>
                ))
              ) : (
                <h5 className="text-center mb-5 pt-4">
                  Your search brings no result.
                </h5>
              )}
            </Card.Body>
          </Card>
        </>
      )}
      {/* //! ===================================================================== */}
      {collectionType === "announcements" && (
        <>
          <Card
            style={{
              borderRadius: "5px",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
              padding: "50px",
              margin: "20px 100px 20px 100px",
              gap: "20px",

              maxWidth: "90vw",
              minWidth: "50vw",
              minHeight: "40vh",
              overflow: "auto",
              resize: "vertical",
            }}
          >
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="topics">
                <Nav.Item>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("topics")}
                  >
                    Discussions
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("announcements")}
                    active
                  >
                    Announcements
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("recommendations")}
                  >
                    Recommendations{" "}
                  </Button>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {/* //! ================================================== */}
              <Form
                className="align-items-center"
                onChange={handle_InSearch_Input}
                style={{ display: "flex" }}
              >
                <Form.Group
                  className="mb-3 w-100 text-center"
                  controlId="formBasicEmail"
                >
                  <Form.Label>
                    <h1 className="text-center mb-5 pt-4">Announcements</h1>
                  </Form.Label>
                  <Form.Control
                    className="w-100 text-center"
                    type="text"
                    placeholder="Search in announcements"
                    onChange={handle_InSearch_Filter}
                    ref={searchInputRef}
                    width="100%"
                  />
                </Form.Group>
              </Form>
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <Cards
                    key={i}
                    post={item}
                    comments={item.comments}
                    author={item.author}
                  />
                ))
              ) : (
                <h5 className="text-center mb-5 pt-4">
                  Your search brings no result.
                </h5>
              )}
            </Card.Body>
          </Card>
        </>
      )}
      {/* //! =============================================================== */}
      {collectionType === "recommendations" && (
        <>
          <Card
            style={{
              borderRadius: "5px",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
              padding: "50px",
              margin: "20px 100px 20px 100px",
              gap: "20px",
              backgroundColor: "#f4f4f4",
              maxWidth: "90vw",
              minWidth: "50vw",
              minHeight: "40vh",
              overflow: "auto",
              resize: "vertical",
            }}
          >
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="topics">
                <Nav.Item>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("topics")}
                  >
                    Discussions
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("announcements")}
                  >
                    Announcements
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("recommendations")}
                    active
                  >
                    Recommendations{" "}
                  </Button>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {/* //! =================================================== */}
              <Form
                className="align-items-center"
                onChange={handle_InSearch_Input}
                style={{ display: "flex" }}
              >
                <Form.Group
                  className="mb-3 w-100 text-center"
                  controlId="formBasicEmail"
                >
                  <Form.Label>
                    <h1 className="text-center mb-5 pt-4">Recommendations</h1>
                  </Form.Label>
                  <Form.Control
                    className="w-100 text-center"
                    type="text"
                    placeholder="Search in recommendations"
                    onChange={handle_InSearch_Filter}
                    ref={searchInputRef}
                  />
                </Form.Group>
              </Form>
              {/* //! ===================================================== */}
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <Cards
                    key={i}
                    post={item}
                    comments={item.comments}
                    author={item.author}
                  />
                ))
              ) : (
                <h5 className="text-center mb-5 pt-4">
                  Your search brings no result.
                </h5>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
}

export default About;
