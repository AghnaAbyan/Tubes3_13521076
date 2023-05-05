import React, { useState } from "react";
import Page from "./components/Page";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    "This is a long message that should wrap to the next line when it exceeds the width of the chat box",
    "This is another long message that should wrap to the next line when it exceeds the width of the chat box.",
    "This is a short message.",
  ]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="app">
      <Sidebar
        title="Riwayat"
        items={[
          "q1",
          "q2",
          "skjhkjsdfds",
          "???",
          "kind",
          "q1",
          "q2",
          "skjhkjsdfds",
          "???",
          "kind",
          "dhcvbsdjgsdlkvchbsdln;vjkdhnvkl;dsbnvskl;vbdslv",
          "q2",
          "skjhkjsdfds",
          "???",
          "kind",
          "dhcvbsdjgsdlkvchbsdln;vjkdhnvkl;dsbnvskl;vbdslv",
        ]}
      />
      <Page
        title="Welcome"
        items={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;
