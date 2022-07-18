import "./Search.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Search() {
  const [releaseNotes, setReleaseNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/searchterm/sel")
      .then((res) => {
        if (res.status === 200) setFilteredNotes(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchStringHandler = (e) => {
    setReleaseNotes(e);
  };

  return (
    <div className="Search">
      <input
        type="text"
        placeholder="Search Here....."
        onChange={(e) => searchStringHandler(e.target.value)}
      />
      <br />
      {filteredNotes
        .filter((content) => {
          if (releaseNotes == "") {
            return content;
          } else if (
            content.Title.toLowerCase().includes(releaseNotes.toLowerCase())
          ) {
            return content;
          }
        })
        .map((content, index) => {
          return (
            <ul key={index}>
              <li>{content.Title}</li>
            </ul>
          );
        })}
    </div>
  );
}
