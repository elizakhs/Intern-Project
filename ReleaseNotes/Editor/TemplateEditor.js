import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TemplateEditor.css";
import TemplatePopup from "./TemplatePopup.js";

function TemplateEditor() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [templateList, setTemplateList] = useState([]);
  const [templatedata, settemplatedata] = useState(
    `<h2>What is New</h2><p>Insert a lot of text here.</p>`
  );

  useEffect(() => {
    axios
      .get("http://localhost:8080/template/sel")
      .then((res) => {
        if (res.status === 200) setTemplateList(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  function handleTemplatePick(e) {
    let template = e.target.value;
    templateList.map((item) => {
      if (item.title === template) {
        settemplatedata(item.body); //kalau sama, set data untuk ckeditor ikut body dari MySQL
      }
    });
  }

  return (
    <div className="App">
      <div className="editor-background">
        <input
          type="button"
          value="Save As New Template"
          className="button-newtemplate"
          onClick={togglePopup}
        />
        <div>
          <select className="template" onChange={(e) => handleTemplatePick(e)}>
            {" "}
            {templateList.map((template) => {
              return <option value={template.title}>{template.title}</option>;
            })}
          </select>
        </div>
        <h3 className="h3">Title </h3>
        <input className="textfield" type="text" />
        <img
          className="spell-icon"
          src={process.env.PUBLIC_URL + "/images/spellCheck.png"}
          alt="spell-icon"
        />
        <h3 className="h3">Body Content</h3>
        <div>
          <CKEditor editor={ClassicEditor} data={templatedata} />
          <div />
          <button className="button-delete">Delete</button>
          <button className="button-update">Update</button>
          <button className="button-draft">Save as Draft</button>
        </div>

        {isOpen && (
          <TemplatePopup
            content={
              <>
                <h2> New Template </h2>
                <label className="label">Name</label>
                <input
                  className="name-field"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />{" "}
                <div className="actions">
                  <button className="button-save">Save</button>

                  <button className="button-cancel">Cancel</button>
                </div>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </div>
  );
}
export default TemplateEditor;
