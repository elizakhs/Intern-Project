import "../style.css";
import Buttons from "../../../../Buttons/Buttons";

export default function AddNewApplication() {
  const button = [
    {
      type: "button-red",
      text: "Cancel",
    },
    {
      type: "button-blue-small",
      text: "Create",
    },
  ];

  return (
    <div class="container-addnewapp">
      <h2 className="title-addfaq">Add New Application</h2>
      <div className="display-column">
        <label className="float-left">Application Name</label>
        <textarea className="textarea-app" name="question"></textarea>
        <label className="float-left" for="answer">
          Application URL
        </label>
        <textarea className="textarea-app" name="answer"></textarea>
      </div>
      <div className="float-center-app">
        <Buttons button={button[0]}></Buttons>
        <Buttons button={button[1]}></Buttons>
      </div>
    </div>
  );
}
