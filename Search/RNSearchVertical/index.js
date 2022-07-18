import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function RNSearchVertical() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchRNVertical, setSearchRNVertical] = useState([]);
  const [listReleaseNotes, setListReleaseNotes] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/searchterm/sel")
      .then((res) => {
        if (res.status === 200) setSearchRNVertical(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/releasenotes/list")
      .then((res) => {
        if (res.status === 200) setListReleaseNotes(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //filtering keywords
  const handleChange = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = searchRNVertical.filter((content) => {
      return content.Body.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  //<div className="BodySearchVertical">
  return (
    <div className="content">
      <div className="BodySearchVertical">
        <div className="VerticalLine"></div>
        <div className="Search">
          <form className="SearchBar">
            <button type="submit" className="searchIcon">
              <img src={process.env.PUBLIC_URL + "/images/search.png"}></img>
            </button>
            <input
              type="text"
              placeholder="Search.."
              value={wordEntered}
              name="search"
              onChange={handleChange}
            />
            {filteredData.length != 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 15).map((searchRNVertical) => {
                  return (
                    <a className="dataItem" href="#" target="_blank">
                      <p>{searchRNVertical.Title} </p>
                    </a>
                  );
                })}
              </div>
            )}
          </form>
        </div>
        <div className="releaseNoteList">
          {listReleaseNotes.map((listReleaseNotes) => {
            return (
              <ul>
                <li>
                  <a href="#">{listReleaseNotes.Title}</a>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RNSearchVertical;
