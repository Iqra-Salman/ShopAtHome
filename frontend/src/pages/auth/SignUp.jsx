import React, { useEffect, useState } from "react";
import * as yup from "yup";
import AlertMessage from "../../components/AlertMessage";
import TextField from "../../components/TextField";
import { Card, Button } from "react-bootstrap";
import { Form, Formik } from "formik";
import apiClient from "../../services/api-service";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo } from "../../store/Slices/authSlice";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required "),
  email: yup
    .string()
    .required("email is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be atleast 6 charactor long")
    .max(20, "Password should be atmost 20 charactor long")
    .matches(/[a-z]/, "Password should contain atleast one lowercase")
    .matches(/[A-Z]/, "Password should contain atleast one uppercase")
    .matches(/[0-9]/, "Password should contain atleast one numaric"),
});

const SignUp = () => {
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.post("/auth/signup", values);
      dispatch(addUserInfo(data));

      setRes(data);
    } catch (err) {
      const message = err.response.data
        ? err.response.data.message
        : err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);
  return (
    <>
      <Card.Header>
        <Card.Title className="text-center">SignUp</Card.Title>
      </Card.Header>
      <Card.Body>
        {error && <AlertMessage>{error}</AlertMessage>}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <TextField name="name" label="Name" />
            <TextField name="email" label="Email" />
            <TextField name="password" type="password" label="Password" />
            <Button type="submit" variant="primary">
              {Loading ? "Loading..." : "SignUp"}
            </Button>
          </Form>
        </Formik>
      </Card.Body>
      <Card.Footer>
        Already have an account? <Link to="/auth/login">Login Now!</Link>
      </Card.Footer>
    </>
  );
};

export default SignUp;
