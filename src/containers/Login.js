import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {Auth} from "aws-amplify";
import {useAppContext} from "../libs/contextLib";
// import {useHistory} from "react-router-dom";
import {LoaderButton} from "./LoaderButton";
import {onError} from "../libs/errorLib";
import {useFormFields} from "../libs/hooksLib";

export default function Login() {

  // const history = useHistory();

  const {userHasAuthenticated} = useAppContext();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email:'',
    password:''
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
    // return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try{

        let data = await Auth.signIn(fields.email, fields.password);
        console.log("Logged In Data",data);
        userHasAuthenticated(true);
        // history.push("/");

    }catch(e){

        // alert(e.message);
        onError(e);
        setIsLoading(false);

    }


  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        {/* <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button> */}
        <LoaderButton
          block
          type='submit'
          bsSize='large'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}