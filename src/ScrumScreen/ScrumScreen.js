import React, { useState, useEffect } from "react";
import "./ScrumScreen.css";
import "primeflex/primeflex.css";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import ScrumUpdateCard from "./ScrumUpdateCard/ScrumUpdateCard";
import axios from "axios";

const ScrumScreen = (props) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [scrumComment, setScrumComment] = useState("");
  const [teamScrumUpdates, setTeamScrumUpdates] = useState([]);
  const [scrumUpdates, setScrumUpdates] = useState([]);

  const handleSubmitComment = () => {
    axios
      .post("http://localhost:3001/scrum_data", {
        id: teamScrumUpdates[teamScrumUpdates.length - 1].id + 1,
        name: props.userName,
        comment: scrumComment,
        date: getDateInFormat(today),
      })
      .then((resp) => {
        console.log(resp.data);
        setScrumComment("");
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = (id) => {
    axios
      .delete("http://localhost:3001/scrum_data/" + id)
      .then((res) => {
          console.log(res.data);
          getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = () => {
    axios
      .get("http://localhost:3001/scrum_data")
      .then((res) => setTeamScrumUpdates(res.data));
  };

  const getDateInFormat = (selecteddate) => {
    let date = selecteddate.getDate();
    date = date > 10 ? date : `0${date}`;
    let month = selectedDate.getMonth() + 1;
    month = month > 10 ? month : `0${month}`;

    return `${date}-${month}-${selecteddate.getFullYear()}`;
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let updates = teamScrumUpdates.filter(
      (update) => update.date === getDateInFormat(selectedDate)
    );
    setScrumUpdates(updates);
  }, [teamScrumUpdates, selectedDate]);
  return (
    <>
      <div className="p-grid">
        <div className="p-col-3">
          <div className="panels">
            <div className="userKey">
              <label className="userName">{props.userName}</label>
              <br />
              {props.scrumKey}-{getDateInFormat(selectedDate)}
            </div>
            <Calendar
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.value)}
              inline
              monthNavigator
              yearNavigator
              yearRange={`2010:${today.getFullYear()}`}
            />
          </div>
        </div>
        <div className="p-col-9">
          <div className="header">
            {scrumUpdates.map((update) => (
              <ScrumUpdateCard
                key={update.id}
                id={update.id}
                name={update.name}
                comment={update.comment}
                userName ={props.userName}
                deleteData={deleteData}
              />
            ))}
          </div>
          <div className="footer">
            <InputTextarea
              rows={3}
              value={scrumComment}
              onChange={(e) => setScrumComment(e.target.value)}
            />
            <Button
              className="submitScrumButton"
              label="Submit"
              onClick={handleSubmitComment}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ScrumScreen;
