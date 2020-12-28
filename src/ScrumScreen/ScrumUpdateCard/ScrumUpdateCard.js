import React from "react";
import "./ScrumUpdateCard.css";
import { Card } from "primereact/card";

const ScrumUpdateCard = (props) => {
  const showDelete = props.userName === props.name;
  return (
    <>
      <Card
        title={props.name}
        className="updateCard"
        header={
          showDelete && (
            <i
              className="pi pi-trash"
              onClick={() => props.deleteData(props.id)}
            ></i>
          )
        }
      >
        <p className="p-m-0">{props.comment}</p>
      </Card>
    </>
  );
};

export default ScrumUpdateCard;
