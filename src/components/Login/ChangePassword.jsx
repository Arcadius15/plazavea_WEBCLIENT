import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth/auth.service";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { Alert, Button } from "@mui/material";
import style from "./Login.module.css"
import changePasswordSchema from './ChangePasswordValidacion';

const ChangePassword = () => {
    let navigate = useNavigate();
    const [show, setShow] = useState(false)
    return (
        <>
            <div className='container-fluid' style={{ margin: '10px' }}>
                <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>Change Password</h1>
                <Formik
                    initialValues={{
                        email: '',
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword:''
                    }}
                    validationSchema={changePasswordSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)
                        const LoginServ = async () => {
                            AuthService.changePassword(values).then((res)=>{
                                if (res.status===200) {
                                    alert("Contraseña cambiada")
                                    setSubmitting(false); resetForm();
                                    navigate('/login')
                                }
                            },(err)=>{
                                console.log(err.response.data)
                                setShow(true)
                                setSubmitting(false)
                            })
                        }
                        LoginServ()
                        
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, isValid }) => (

                        <Form className="mx-auto" onSubmit={handleSubmit}>
                            <Form.Group controlId="formUser">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" name="email" placeholder="Ingrese Correo"
                                    onChange={handleChange} onBlur={handleBlur} value={values.email}
                                    className={touched.email && errors.email ? "error" : null}>
                                </Form.Control>
                                {touched.email && errors.email ?
                                    (<div className={style.error_message}>{errors.email}</div>) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Old Password:</Form.Label>
                                <Form.Control type="password" name="oldPassword" placeholder="Ingrese Old Password"
                                    onChange={handleChange} onBlur={handleBlur} value={values.oldPassword}
                                    className={touched.oldPassword && errors.oldPassword ? "error" : null}>
                                </Form.Control>
                                {touched.oldPassword && errors.oldPassword ?
                                    (<div className={style.error_message}>{errors.oldPassword}</div>) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>New Password:</Form.Label>
                                <Form.Control type="password" name="newPassword" placeholder="Ingrese New Password"
                                    onChange={handleChange} onBlur={handleBlur} value={values.newPassword}
                                    className={touched.newPassword && errors.newPassword ? "error" : null}>
                                </Form.Control>
                                {touched.newPassword && errors.newPassword ?
                                    (<div className={style.error_message}>{errors.newPassword}</div>) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control type="password" name="confirmPassword" placeholder="Ingrese New Password"
                                    onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword}
                                    className={touched.confirmPassword && errors.confirmPassword ? "error" : null}>
                                </Form.Control>
                                {touched.confirmPassword && errors.confirmPassword ?
                                    (<div className={style.error_message}>{errors.confirmPassword}</div>) : null}
                            </Form.Group>
                            <Button style={{ margin: "15px" }}
                                color="success" type='submit' disabled={isSubmitting || !isValid}>
                                Login
                            </Button>
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
    )
}

export default ChangePassword