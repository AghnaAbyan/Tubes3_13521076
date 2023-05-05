import React from "react";
function BotChat(props) {
  return (
    <div
      className="container-fluid mt-3"
      style={{ width: "100%", borderRadius: "10px" }}
    >
      <div className="row no-gutters align-items-start">
        <div className="col-md-2">
          <img
            src="./src/assets/bot.png"
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ width: "5.2vw", height: "auto", marginTop: "20px" }}
          />
        </div>
        <div className="col-md-10" style={{ borderRadius: "10px" }}>
          <div className="p-2">
            <div className="chat-box">
              <p className="message">{props.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotChat;
