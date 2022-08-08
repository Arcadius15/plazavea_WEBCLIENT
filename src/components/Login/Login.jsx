import React, { useState } from "react";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth/auth.service";
import LoginSchema from "./LoginValidacion";
import style from "./Login.module.css"
import { Alert, Button, Link } from "@mui/material";

const Login = () => {
  let navigate = useNavigate();

  const [show, setShow] = useState(false)

  return (
    <>
      <div className='container-fluid' style={{ margin: '10px' }}>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>Login</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            const LoginServ = async () => {
              await AuthService.login(values.email, values.password).then(
                () => {
                  navigate("/home");
                  window.location.reload();
                },
                (error) => {
                  setShow(true)
                  console.log(error);
                }
              );
              setSubmitting(false); resetForm();
            }
            LoginServ()
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, isValid }) => (

            <Form className="mx-auto" onSubmit={handleSubmit}>
              <Form.Group controlId="formUser">
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="text" name="email" placeholder="Ingrese Correo"
                  onChange={handleChange} onBlur={handleBlur} value={values.email}
                  className={touched.email && errors.email ? "error" : null}>
                </Form.Control>
                {touched.email && errors.email ?
                  (<div className={style.error_message}>{errors.email}</div>) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="password" name="password" placeholder="Ingrese Password"
                  onChange={handleChange} onBlur={handleBlur} value={values.password}
                  className={touched.password && errors.password ? "error" : null}>
                </Form.Control>
                {touched.password && errors.password ?
                  (<div className={style.error_message}>{errors.password}</div>) : null}
              </Form.Group>
              <Form.Group style={{display: "flex",alignItems:"center",justifyContent:"center"}}>
                <Button style={{ margin: "15px" }}
                  color="success" type='submit' disabled={isSubmitting || !isValid}>
                  Login
                </Button>
              </Form.Group>
              <Form.Group style={{display: "flex",alignItems:"center",justifyContent:"center"}}>
                <Link href="/changepassword">Change Password</Link>
              </Form.Group>
            </Form>
          )}
        </Formik>
        {show ?
          (
            <Alert variant="outlined" severity="error"
              onClick={() => setShow(false)}>
              Error en Email o Password — Reviselo!
            </Alert>
          )
          : null}
      </div>
    </>

  );
};

export default Login;
