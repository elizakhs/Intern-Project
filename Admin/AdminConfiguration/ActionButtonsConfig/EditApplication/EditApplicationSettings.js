import React, { useContext, useState } from "react";
import axios from "axios";
import "../style.css";
import GetCurrentLocalDateTime from "../../../../../services/GetCurrentLocalDateTime";
import Swal from "sweetalert2";
import { SettingsContext } from "../../ApplicationSettings/ApplicationSettingsList";

export default function EditApplicationSettings({ appSettings, ...props }) {
  const [newValue, setNewValue] = useState({});
  const { handleSetAppSettingsList } = useContext(SettingsContext);

  const changeHandler = (e) => {
    setNewValue((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  function submitUpdate(e) {
    e.preventDefault();
    for (var i = 0; i < Object.keys(newValue).length; i++) {
      let attributes = {
        appid: appSettings.appid,
        attributeid: Object.keys(newValue)[i],
        newvalue: Object.values(newValue)[i],
        datemodified: GetCurrentLocalDateTime(),
      };
      axios
        .put(
          `http://localhost:8080/application-settings/${appSettings.appid}`,
          {
            attributes,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            axios
              .get("http://localhost:8080/api/appattributes/listappattributes")
              .then((res) => {
                handleSetAppSettingsList(res.data[0]);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((error) =>
          console.log(
            "Failed to update employment type data",
            error.response.data
          )
        );
    }
    Swal.fire({
      icon: "success",
      title: "Successfully Updated!",
      showConfirmButton: false,
      timer: 1500,
    });
    props.changeState(false);
  }

  return (
    <div class="container-editapp">
      <h2 className="title-editapp">Edit Application</h2>
      <form>
        <div className="display-column">
          <label for="appconfig">Background Color</label>
          <select name="1" onChange={changeHandler}>
            <option>{appSettings.BackgroundColor}</option>
            <option value={"Yellow"}>Yellow</option>
            <option value={"Green"}>Green</option>
            <option value={"Red"}>Red</option>
            <option value={"Blue"}>Blue</option>
          </select>

          <label for="appconfig">Font Size</label>
          <select name="2" onChange={changeHandler}>
            <option>{appSettings.FontSize}</option>
            <option value={14}>14</option>
            <option value={16}>16</option>
            <option value={18}>18</option>
            <option value={20}>20</option>
          </select>

          <label for="appconfig">Font Family</label>
          <select name="3" onChange={changeHandler}>
            <option>{appSettings.FontFamily}</option>
            <option value={"Arial"}>Arial</option>
            <option value={"Mulish"}>Mulish</option>
            <option value={"Times New Roman"}>Times New Roman</option>
          </select>
          <label for="appconfig">Theme</label>
          <select name="4" onChange={changeHandler}>
            <option>{appSettings.Theme}</option>
            <option value={"Night Mode"}>Night Mode</option>
            <option value={"Default"}>Default</option>
            <option value={"Monothematic"}>Monothematic</option>
          </select>
          <label for="appconfig">Navigation Bar</label>
          <select name="5" onChange={changeHandler}>
            <option>{appSettings.NavigationBar}</option>
            <option value={"Vertical"}>Vertical</option>
            <option value={"Horizontal"}>Horizontal</option>
          </select>

          <div className="float-center-app">
            <button
              type="submit"
              className="button-blue-small"
              onClick={submitUpdate}
            >
              Save
            </button>
            <button
              className="button-red"
              onClick={() => props.changeState(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
