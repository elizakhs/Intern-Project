import React from "react";
import "./filter.css";

export default function Filter() {
  return (
    <>
      <div class="container">
        <form>
          <input type="search" placeholder="Search..."></input>
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        <label class="tick">
          User Name
          <input type="checkbox" checked="checked"></input>
          <span class="checkmark"></span>
        </label>
        <label class="tick">
          User ID
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>
        <label class="tick">
          User Role
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>
      </div>
    </>
  );
}
