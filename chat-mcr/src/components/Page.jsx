import React from "react";
import InputValue from "./InputValue";
import BotChat from "./BotChat";
import UserChat from "./UserChat";
import "./Page.css";

function Page(props) {
  return (
    <>
      <div className="page">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <div className="chat-container">
                {props.items.map((item, index) => {
                  if (index % 2 === 1) {
                    // even index, so it's a bot message
                    return <BotChat message={item} key={index} />;
                  } else {
                    // odd index, so it's a user message
                    return <UserChat message={item} key={index} />;
                  }
                })}
              </div>
            </div>
          </div>
        </div>

        <InputValue />
      </div>
    </>
  );
}

export default Page;
