import React from "react";
import { Form } from "react-bootstrap";

function SearchForm({
  handle_InSearch_Input,
  collectionType,
  handle_InSearch_Filter,
  searchInputRef,
}) {
  const collectionTypes = {
    topics: "Discussions",
    announcements: "Announcements",
    recommendations: "Recommendations",
  };

  return (
    <Form
      className="align-items-center"
      onChange={handle_InSearch_Input}
      style={{ display: "flex" }}
    >
      <Form.Group className="mb-3 w-100 text-center" controlId="formBasicEmail">
        <Form.Label>
          <h1 className=" text-center mb-5 pt-4">
            {collectionTypes[collectionType]}
          </h1>
        </Form.Label>
        <Form.Control
          className="w-100 text-center"
          type="text"
          placeholder={`Search in ${collectionTypes[
            collectionType
          ].toLowerCase()}`}
          onChange={handle_InSearch_Filter}
          ref={searchInputRef}
        />
      </Form.Group>
    </Form>
  );
}

export default SearchForm;
