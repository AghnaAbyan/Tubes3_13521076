import React from "react";

function UserChat(props) {
  return (
    <div
      className="container-fluid mt-3"
      style={{ width: "100%", borderRadius: "10px" }}
    >
      <div className="row no-gutters align-items-start">
        <div
          className="col-md-10 order-2 order-md-1"
          style={{ borderRadius: "10px" }}
        >
          <div className="p-2">
            <div className="chat-box">
              <p className="message">{props.message}</p>
            </div>
          </div>
        </div>
        <div className="col-md-2 order-1 order-md-2 text-right">
          <img
            src="./src/assets/user.png"
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ width: "5.2vw", height: "auto", marginTop: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserChat;
