import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Detail from "../Details";
import "./NormalEditor.css";
import { Link } from "react-router-dom";

const content = {
  appid: 1,

  userid: 1,

  contenttypeid: 1,

  statusid: 1,

  isfeebackallowed: 1,

  isvisible: 1,

  datecreated: "2021-07-28 12:12:12",

  datemodified: "2021-07-30 12:12:12",

  datepublished: "2021-08-28 12:12:12",
};
const NormalEditor = () => {
  const clicked = () => {};
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [sessionData, setSessionData] = useState(content);

  const setContent = () => {
    setSessionData({ ...sessionData, body: body });
    setSessionData({ ...sessionData, title: title });
    axios
      .post("http://localhost:8080/content/ins", {
        sessionData,
      })
      .then((res) => {
        if (res.status === 200) setTitle(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="NormalEditor">
        <div className="background">
          <Link to="/editor/template" className="button-usetemplate">
            Use Template
          </Link>
          <h3 className="h3">Title </h3>
          <form>
            <input
              type="text"
              value={title}
              onSubmit={() => setContent()}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
          <img
            className="spell-icon"
            src={process.env.PUBLIC_URL + "/images/spellCheck.png"}
            alt="spelling checker"
          />
          <div className="editor">
            <h3 className="h3">Body Content</h3>
            <CKEditor
              editor={ClassicEditor}
              data={body}
              onSubmit={() => setContent()}
              onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <Detail titles={title} bodys={body} />
      </div>
    </>
  );
};

export default NormalEditor;
