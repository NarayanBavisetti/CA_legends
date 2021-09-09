import React, { useState,useEffect } from "react";
import { Modal, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import { db } from "../firebase";
import { useHistory, useParams } from "react-router";

export default function Edit() {

    const {id} = useParams()
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



  const [userData, setUserData] = useState("");
  useEffect(() => {
    db.collection("UsersCA")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const Test = doc.data();
          setUserData({
            name: Test.name,
            date: Test.date,
            description: Test.description
          });
        } else console.log("Non-existing");
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && date && description) {
      e.preventDefault();
      db.collection("UsersCA").doc(id)
        .set({
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
        <h2>Edit User</h2>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Name *"
            name="name"
            value={userData.name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="date"
            placeholder="Date *"
            name="date"
            value={userData.date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <ReactSummernote
            value={userData.description}
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
          Update User
        </Button>
      </Form>
    </div>
  );
}
