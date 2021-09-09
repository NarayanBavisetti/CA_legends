import { Modal, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      db.collection("UsersCA").onSnapshot(function (data) {
        setUsers(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    };
    fetchdata();
  }, []);

  // Delete User
  const deleteUser = (id) => {
    db.collection("UsersCA")
      .doc(id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = () => {};
  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Users</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Link to="/add">
              <Button
                // onClick={handleShow}
                className="btn btn-success"
                data-toggle="modal"
              >
                <i className="material-icons">&#xE147;</i>{" "}
                <span>Add New Users</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => {
            return (
              <>
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.date}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  ></td>
                  <td>
                    <OverlayTrigger
                      overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}
                    >
                      <Link to={`/edit/${data.id}`}>
                      <button
                        // onClick={handleShow}
                        className="btn text-warning btn-act"
                        data-toggle="modal"
                      >
                        <i className="material-icons">&#xE254;</i>
                      </button>
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}
                    >
                      <button
                        onClick={() => deleteUser(data.id)}
                        className="btn text-danger btn-act"
                        data-toggle="modal"
                      >
                        <i className="material-icons">&#xE872;</i>
                      </button>
                    </OverlayTrigger>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
