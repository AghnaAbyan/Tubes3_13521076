import React from "react";
import AlgorithmBar from "./AlgorithmBar";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <h2
        style={{
          fontFamily: "Helvetica, sans-serif",
          fontWeight: "bold",
          color: "#FFFFFF",
          fontSize: "3.2vw",
        }}
      >
        {props.title}
      </h2>
      <button
        style={{
          position: "absolute",
          width: "2.2vw",
          height: "3.5vh",
          left: "27.5vw",
          top: "7.7vh",
          background:
            "url(./chat-mcr/src/assets/addbutton.png)  no-repeat center",
          backgroundSize: "cover",
          color: "#00C9B7",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
      ></button>
      <ul
        class="list-group"
        style={{
          height: "75vh",
          overflowX: "hidden",
          overflowY: "scroll",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {props.items.map((item, index) => (
          <li
            class="list-group-item"
            key={index}
            style={{
              fontFamily: "Helvetica, sans-serif",
              fontWeight: "light",
              color: "#000000",
              fontSize: "1.2vw",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <h1> </h1>
      <h1> </h1>
      <AlgorithmBar className="algorithmbar"></AlgorithmBar>
    </div>
  );
}

export default Sidebar;
