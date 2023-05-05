import React from "react";
import Page from "./components/Page";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
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
        items={[
          "This is a long message that should wrap to the next line when it exceeds the width of the chat box",
          "This is another long message that should wrap to the next line when it exceeds the width of the chat box.",
          "his is a short message.",
        ]}
      ></Page>
    </div>
  );
}

export default App;
