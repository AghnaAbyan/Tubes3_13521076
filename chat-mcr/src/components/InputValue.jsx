import React, { useState } from "react";

function InputValue(props) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Question: ${question}`);
    props.onSendMessage(question);

    setQuestion(""); // clear input field
  };

  return (
    <div
      className="container"
      style={{
        position: "absolute",
        width: "59.8vw",
        height: "6.2vh",
        left: "0vw",
        top: "89.7vh",
      }}
    >
      <form onSubmit={handleSubmit} className="d-flex justify-content-between">
        <div className="form-group" style={{ width: "88%" }}>
          <input
            type="text"
            className="form-control"
            id="question"
            placeholder="Masukkan pertanyaanmu!"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ height: "20%", width: "10%" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default InputValue;
