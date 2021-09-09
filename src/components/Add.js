import React, { useState } from "react";
import { Modal, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import { db } from "../firebase";
import { useHistory } from "react-router";

export default function Add() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const content = (param) => {
    setDescription(param);
  };
  const onChange = (value) => {
    content(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && date && description) {
      e.preventDefault();
      db.collection("UsersCA")
        .add({
          name,
          date,
          description,
        })
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Please fill in all the details!");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Name *"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="date"
            placeholder="Date *"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <ReactSummernote
            value={description}
            options={{
              lang: "en-US",
              height: 350,
              dialogsInBody: true,
              toolbar: [
                ["font", ["bold", "underline"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["insert", ["link", "picture"]],
                ["view", ["codeview"]],
              ],
            }}
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="success" type="submit" block>
          Add New User
        </Button>
      </Form>
    </div>
  );
}
