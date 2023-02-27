import { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Cards from "../components/Cards";

function About() {
  // const [activeTab, setActiveTab] = useState("Topics");
  const [collectionType, setCollectionType] = useState("Discussions");
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleInput = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  const fetchData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/topics/all",
        requestOptions
        // `http://localhost:5000/api/${collectionType}/all`,
        // requestOptions
      );
      const result = await response.json();
      console.log("result: >>>>", result);
      setTopics(result.requestedTopics);
      setFilteredData(result.requestedTopics);
      setComments(result.requestedTopics.comments);
      // if (activeTab === "Topics") {
      //   setItems(topics);
      // } else if (activeTab === "Comments") {
      //   setItems(comments);
      // }
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

  const handleFilter = () => {
    setInputValue(inputRef.current.value.toLowerCase());
    const filtered = topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(inputValue) ||
        topic.body.toLowerCase().includes(inputValue)
    );
    setFilteredData(filtered);
    console.log("🚀 ~ setFilteredData:", filteredData);
  };

  function textMarker(text, searchTerm) {
    const regex = new RegExp(searchTerm, "gi");
    return text.prototype.replace(regex, (match) => `<mark>${match}</mark>`);
  }

  return (
    <div>
      {collectionType === "Discussions" && (
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
              <Nav variant="tabs" defaultActiveKey="Discussions">
                <Nav.Item>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("Discussions")}
                    active
                  >
                    Discussions
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("Announcements")}
                  >
                    Announcements
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("Recommendations")}
                  >
                    Recommendations{" "}
                  </Button>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {/* //! ==================SEARCHFORM=================  */}
              <Form
                className="align-items-center"
                onChange={handleInput}
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
                    onChange={handleFilter}
                    ref={inputRef}
                  />
                </Form.Group>
              </Form>
              {/* //! =========CARDS===================== */}
              {filteredData.length > 0 ? (
                filteredData.map((topic, i) => (
                  <Cards key={i} topic={topic} comments={topic.comments} />
                ))
              ) : (
                <h5 className="text-center mb-5 pt-4">
                  Your search brings no result.
                </h5>
              )}
              {() => textMarker(topics, inputValue)}
            </Card.Body>
          </Card>
        </>
      )}

      {collectionType === "Announcements" && (
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
              <Nav variant="tabs" defaultActiveKey="Topics">
                <Nav.Item>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("Discussions")}
                  >
                    Discussions
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("Announcements")}
                    active
                  >
                    Announcements
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("Recommendations")}
                  >
                    Recommendations{" "}
                  </Button>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Form style={{ display: "flex" }}>
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
                  />
                </Form.Group>
              </Form>
              {topics.map((topic, i) => (
                <Cards key={i} topic={topic} comments={topic.comments} />
              ))}
            </Card.Body>
          </Card>
        </>
      )}

      {collectionType === "Recommendations" && (
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
              <Nav variant="tabs" defaultActiveKey="Topics">
                <Nav.Item>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("Discussions")}
                  >
                    Discussions
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("Announcements")}
                  >
                    Announcements
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setCollectionType("Recommendations")}
                    active
                  >
                    Recommendations{" "}
                  </Button>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Form style={{ display: "flex" }}>
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
                  />
                </Form.Group>
              </Form>
              {topics.map((topic, i) => (
                <Cards key={i} topic={topic} comments={topic.comments} />
              ))}
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
}

export default About;
