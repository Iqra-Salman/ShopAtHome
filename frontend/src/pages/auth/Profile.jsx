import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Container, Col, Row, Toast } from "react-bootstrap";
import { Form, Formik } from "formik";
import { FaPen } from "react-icons/fa6";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addUserInfo } from "../../store/Slices/authSlice";
import TextField from "../../components/TextField";
import AlertMessage from "../../components/AlertMessage.jsx";
import Loader from "../../components/Loader.jsx";
import apiClient from "../../services/api-service.js";
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required.")
    .email("Please enter a valid email"),
  currentPassword: yup.string().required("Enter current password"),
  newPassword: yup
    .string()
    .required("Enter new password")
    .min(6, "Password should be atleast 6 charactor long")
    .max(20, "Password should be atmost 20 charactor long")
    .matches(/[a-z]/, "Password should contain atleast one lowercase")
    .matches(/[A-Z]/, "Password should contain atleast one uppercase")
    .matches(/[0-9]/, "Password should contain atleast one numaric"),
    confirmPassword:yup.string().required("Confirm Password")
});
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(userInfo);
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.put("/auth/profile", values);
      console.log(data);
      dispatch(addUserInfo(data));
      toast.success("Profile Updated");
      navigate("/");
    } catch (err) {
      const message = err.response.data
        ? err.response.data.message
        : err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    name: userInfo.name,
    email: userInfo.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword:""
  };
  return (
    <div className="d-flex align-items-center my-3 ">
      <Container>
        <Col md={12}>
        
          <Card.Header>
            <Card.Title className="text-center mb-3">
             
             <h4> <FaPen />  Edit Profile</h4>
            </Card.Title>
          </Card.Header>
        </Col>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card.Body>
              {error && <AlertMessage>{error}</AlertMessage>}
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                <Form>
                  <TextField name="name" label="Name:" />
                  <TextField name="email" disabled label="Email:" />
                  <TextField
                    name="currentPassword"
                    type="password"
                    label="Password:"
                    placeholder="Enter current password"
                  />
                  <TextField
                    name="newPassword"
                    type="password"
                    label=" New Password:"
                    placeholder="Enter new password"
                  />
                   <TextField
                    name="confirmPassword"
                    type="password"
                    label=" Confirm Password:"
                    placeholder="Enter password again"
                  />
                  <div className="text-center mt-4">
                    <Button
                      className="justify-content-center"
                      variant="primary"
                      type="submit"
                    >
                      Update Profile
                    </Button>
                  </div>
                </Form>
              </Formik>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
