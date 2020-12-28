import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./Login.css";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";

const Login = (props) => {
  const [scrumKey, setScrumKey] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/scrum_key")
      .then((res) => {
        setScrumKey(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = () => {
    if (props.userName && scrumKey.indexOf(props.scrumKey) !== -1) {
      props.setIsAuth(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Please Enter Correct ScrumKey");
    }
  };
  return (
    <div>
      <div className="fieldDiv">
        <label className="label">Username</label>
        <InputText
          value={props.userName}
          onChange={(e) => props.setUserName(e.target.value)}
        />
      </div>
      <div className="fieldDiv">
        <label className="label">ScrumKey</label>
        <Dropdown
          value={props.scrumKey}
          options={scrumKey}
          onChange={(e) => props.setscrumKey(e.target.value)}
          placeholder="Select a Scrum"
        />
      </div>
      <div className="submitButton">
        <Button label="Submit" onClick={handleSubmit} />
        <br />
        <label>{errorMessage}</label>
      </div>
    </div>
  );
};
export default Login;
