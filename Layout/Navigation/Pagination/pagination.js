import React from "react";
import "./pagination.css";

function Pagination() {
  return (
    <div className="pagination">
      <a href="#">&laquo;</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a href="#" class="active">
        4
      </a>
      <a href="#">5</a>
      <a href="#">6</a>
      <a href="#">&raquo;</a>
    </div>
  );
}

export default Pagination;
