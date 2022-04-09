import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import './FormStyle.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from '../../firebase.init';


const auth = getAuth(app)

const PassWordEmail = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [seeInfo, setSeeInfo] = useState({});
    const [validated, setValidated] = useState(false);
    const [registerd, setregisterd] = useState(false);
    console.log(seeInfo.displayName);

    const getEmailFun = (e) => {
        setEmail(e.target.value);
    }
    const getPasswordFun = (e) => {
        setPassword(e.target.value);
    }
    const getName = (e) => {
        setName(e.target.value);
    }

    const submitFromFun = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            // return;
        }
        setValidated(true);

        if (form.checkValidity() === true) {
            if (registerd) {
                signInWithEmailAndPassword(auth, email, password)
                    .then(res => {
                        console.log(res.user)
                        setSeeInfo(res.user);
                    })
                    .catch(err => {
                        setError(err.message)
                        console.log(err.message)
                    })
            }
            else {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(res => {
                        const user = res.user;
                        console.log(user);
                        sendVarificatonMail();
                        updateName();
                    })
                    .catch(err => {
                        setError(err.message)
                        console.log(err.message)
                    })
            }
        }
        // event.preventDefault();
        // console.log(email, password);
    }

    const forgetPassWord = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError("check your Email")
            })
            .catch(err => {
                console.error(err)
            })
    }

    const checkRegistered = (e) => {
        const value = e.target.checked;
        setregisterd(value);
    }

    const sendVarificatonMail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                setError("sent a verified mail")
            })
    }
    const updateName = () => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
    }

    return (
        <div>
            <div className='w-50 m-4 form-style'>
                <h3>Please  {registerd ? "Log in" : 'Register'} Here</h3>
                <Form noValidate validated={validated} onSubmit={submitFromFun}>

                    {!registerd && <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onBlur={getName} type="text" placeholder="Enter Name" required />
                        <Form.Text className="text-muted">
                            Enter Your valid Name
                        </Form.Text>
                    </Form.Group>}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={getEmailFun} type="email" placeholder="Enter email" required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={getPasswordFun} type="password" placeholder="Password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check onClick={checkRegistered} type="checkbox" label="r u registerd...?" />
                    </Form.Group>

                    <Button onClick={forgetPassWord} variant="link">Forget PassWord</Button>

                    <p>{error}</p>
                    <Button variant="primary" type="submit">
                        {registerd ? "Log in" : 'Register'}
                    </Button>
                </Form>
            </div>

            <div>
                {
                    seeInfo.displayName &&  <div><h3>Name : {seeInfo.displayName}</h3>
                        <p>Email : {seeInfo.email}</p></div>
                }
            </div>
        </div>
    );
};

export default PassWordEmail;