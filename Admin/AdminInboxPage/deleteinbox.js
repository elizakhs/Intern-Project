import React from "react";
import "./style.css";
import Buttons from "../../Buttons/Buttons";

export default function AdminInboxPage() {
    const button = [
        {
            type: "button-red",
            text: "Cancel",
        },
        {
            type: "button-blue-small",
            text: "Delete",
        },
    ];

    return (
        <div class="container-delete-noti">
            <p className="title-deletenoti">Delete Notification</p>
            <div>
                <p className="float-left">U001</p>
            </div>
            <br />
            <br />
            <br />
            <div className="display-row">
                <label className="section-label" for="notisection">
                    Notification Section
                </label>
                <textarea className="textarea-section" name="section">
                    Alpha Oil
                </textarea>

                <label for="notiorder">Notification Order</label>
                <textarea className="textarea-order" name="order">
                    1
                </textarea>

                <label for="notiusername">User Name</label>
                <textarea className="textarea-user" name="user">
                    Alif
                </textarea>
            </div>
            <label className="float-left" for="question">
                Summary
            </label>
            <textarea
                className="textarea-summary-del"
                name="summary"
                placeholder="Enter a summary."
            >
                Very informative!
            </textarea>

            <br />
            <br />
            <div className="float-center">
                <p>Confirm Delete?</p>
                <Buttons button={button[0]}></Buttons>
                <Buttons button={button[1]}></Buttons>
            </div>
        </div>
    );
}
