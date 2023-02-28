import { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Cards from "../components/Cards";

function About() {
  const [collectionType, setCollectionType] = useState("topics");
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

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

  useEffect(() => {
    fetchData();
    return () => {
      console.log("Freed up memory from the function call!");
    };
  }, [collectionType]);

  const handleInput = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  const handleFilter = () => {
    setInputValue(inputRef.current.value.toLowerCase());
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(inputValue) ||
        item.body.toLowerCase().includes(inputValue)
    );
    setFilteredData(filtered);
    console.log("🚀 ~ setFilteredData:", filteredData);
  };

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
                filteredData.map((item, i) => (
                  <Cards key={i} post={item} comments={item.comments} />
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
                onChange={handleInput}
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
                    onChange={handleFilter}
                    ref={inputRef}
                  />
                </Form.Group>
              </Form>
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <Cards key={i} post={item} comments={item.comments} />
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
                onChange={handleInput}
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
                    onChange={handleFilter}
                    ref={inputRef}
                  />
                </Form.Group>
              </Form>
              {/* //! ===================================================== */}
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <Cards key={i} post={item} comments={item.comments} />
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
