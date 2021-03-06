import React, { useState, useEffect } from "react";
import { Modal, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import { db } from "../firebase";

class Edit extends React.Component {
  state = {
    key: "",
    name: "",
    date: "",
    description: "",
  };

  componentDidMount() {
    const ref = db.collection("UsersCA").doc(this.props.match.params.id);
    ref.get().then((doc) => {
      const Data = doc.data();
      this.setState({
        key: doc.id,
        name: Data.name,
        date: Data.date,
        description: Data.description,
      });
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ Data: state });
  };
  contentChange = (value) => {
    const currentState = this.state;
    currentState.description = value;
    this.setState(currentState);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, date, description } = this.state;

    const updateRef = db.collection("UsersCA").doc(this.props.match.params.id);
    updateRef
      .set({
        name,
        date,
        description,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          name: "",
          date: "",
          description: "",
        });
        this.props.history
          .push("/")
          .then(() => {
            alert("Updated Successfully");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  // export default function Edit() {

  //     const {id} = useParams()
  //   const history = useHistory();
  //   const [name, setName] = useState("");
  //   const [date, setDate] = useState("");
  //   const [description, setDescription] = useState("");
  //   const content = (param) => {
  //     setDescription(param);
  //   };
  //   const onChange = (value) => {
  //     content(value);
  //   };

  //   const [userData, setUserData] = useState("");
  //   useEffect(() => {
  //     db.collection("UsersCA")
  //       .doc(id)
  //       .get()
  //       .then((doc) => {
  //         if (doc.exists) {
  //           const Test = doc.data();
  //           setUserData({
  //             name: Test.name,
  //             date: Test.date,
  //             description: Test.description
  //           });
  //         } else console.log("Non-existing");
  //       });
  //   }, []);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (name && date && description) {
  //       e.preventDefault();
  //       db.collection("UsersCA").doc(id)
  //         .set({
  //           name,
  //           date,
  //           description,
  //         })
  //         .then(() => {
  //           history.push("/");
  //         })
  //         .catch((error) => {
  //           alert(error.message);
  //         });
  //     } else {
  //       alert("Please fill in all the details!");
  //     }
  //   };
  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <h2>Edit User</h2>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Name *"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="date"
              placeholder="Date *"
              name="date"
              onChange={this.onChange}
              value={this.state.date}
              required
            />
          </Form.Group>
          <Form.Group>
            <ReactSummernote
              value={this.state.description}
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
              name="description"
              onChange={this.contentChange}
            />
          </Form.Group>
          <Button variant="success" type="submit" block>
            Update User
          </Button>
        </Form>
      </div>
    );
  }
}
export default Edit;
// import React, { useState } from "react";
// import "./EditBlogComponent.css";
// import HeaderTitle from "../../HeaderComponents/HeaderTitle";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
// } from "../../BreadcrumbComponent/BreadcrumbComponent";
// import "../../input.css";
// import ReactSummernote from "react-summernote";
// import "react-summernote/dist/react-summernote.css";
// import "bootstrap/js/dist/modal";
// import "bootstrap/js/dist/dropdown";
// import "bootstrap/js/dist/tooltip";
// import "bootstrap/dist/css/bootstrap.css";
// import { db } from "../../../firebase";
// import EditAdd from "./EditAddCategory";
// import { Helmet } from "react-helmet";
// import { render } from "@testing-library/react";
// import { resetWarningCache } from "prop-types";
// import EditAddAuthor from "./EditAddAuthor";

// class Editblog extends React.Component {
//   state = {
//     key: "",
//     blogtitle: "",
//     blogcategory: "",
//     blogauthor: "",
//     blogimageurl: "",
//     blogcontent: "",
//     blogdate: "",
//   };

//   componentDidMount() {
//     const ref = db.collection("Blogs").doc(this.props.match.params.blogname);
//     ref.get().then((doc) => {
//       const Blogs = doc.data();
//       this.setState({
//         key: doc.id,
//         blogtitle: Blogs.blogtitle,
//         blogcategory: Blogs.blogcategory,
//         blogauthor: Blogs.blogauthor,
//         blogimageurl: Blogs.blogimageurl,
//         blogcontent: Blogs.blogcontent,
//         blogdate: Blogs.blogdate,
//       });
//     });
//   }

//   onChange = (e) => {
//     const state = this.state;
//     state[e.target.name] = e.target.value;
//     this.setState({ Blogs: state });
//   };
//   contentChange = (value) => {
//     const currentState = this.state;
//     currentState.blogcontent = value;
//     this.setState(currentState);
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     const {
//       blogtitle,
//       blogcategory,
//       blogauthor,
//       blogimageurl,
//       blogcontent,
//       blogdate,
//     } = this.state;

//     const updateRef = db
//       .collection("Blogs")
//       .doc(this.props.match.params.blogname);
//     updateRef
//       .set({
//         blogtitle,
//         blogcategory,
//         blogauthor,
//         blogimageurl,
//         blogcontent,
//         blogdate,
//       })
//       .then((docRef) => {
//         this.setState({
//           key: "",
//           blogtitle: "",
//           blogcategory: "",
//           blogauthor: "",
//           blogimageurl: "",
//           blogcontent: "",
//           blogdate: "",
//         });
//         this.props.history
//           .push("/blog/")
//           .then(() => {
//             alert("Blog category added");
//           })
//           .catch((error) => {
//             alert(error.message);
//           });
//       })
//       .catch((error) => {
//         console.error("Error adding document: ", error);
//       });
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <Helmet>
//           <title>Edit Blog | TechnoHub BITD</title>
//         </Helmet>
//         <HeaderTitle heading="EDIT BLOG" />
//         <div class="editBlogContainer">
//           <Breadcrumb>
//             <BreadcrumbItem icon="fas fa-home" title="Home" path="/" />
//             <BreadcrumbItem
//               icon="fas fa-pencil-alt"
//               title="Edit Blog"
//               status="active"
//             />
//           </Breadcrumb>
//           <div className="formsCont">
//             <form>
//               <div className="title">
//                 <h3>Edit Blog</h3>
//               </div>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   name="title"
//                   id="title"
//                   name="blogtitle"
//                   onChange={this.onChange}
//                   value={this.state.blogtitle}
//                   placeholder="Blog Title"
//                   required
//                 />
//                 <label for="title">Blog Title</label>
//               </div>
//               <div className="input-group">
//                 <EditAdd
//                   onChange={this.onChange}
//                   value={this.state.blogcategory}
//                 />
//                 {/* <label for="category">Blog Category</label> */}
//               </div>
//               <div className="input-group">
//                 <EditAddAuthor
//                   onChange={this.onChange}
//                   value={this.state.blogauthor}
//                 />
//                 {/* <label for="author">Blog Author</label> */}
//               </div>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   name="image"
//                   id="image"
//                   onChange={this.onChange}
//                   name="blogimageurl"
//                   value={this.state.blogimageurl}
//                   placeholder="Blog Image"
//                   required
//                 />
//                 <label for="image">Blog Image Drive ID(1920x1080)</label>
//               </div>
//               <div className="summernote">
//                 <ReactSummernote
//                   value={this.state.blogcontent}
//                   options={{
//                     lang: "en-US",
//                     height: 350,
//                     dialogsInBody: true,
//                     toolbar: [
//                       ["font", ["bold", "underline"]],
//                       ["para", ["ul", "ol", "paragraph"]],
//                       ["insert", ["link", "picture"]],
//                       ["view", ["codeview"]],
//                     ],
//                   }}
//                   name="blogcontent"
//                   onChange={this.contentChange}
//                 />
//               </div>
//               <div className="input-group w50p">
//                 <button type="submit" onClick={this.onSubmit}>
//                   Update Blog
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default Editblog;
