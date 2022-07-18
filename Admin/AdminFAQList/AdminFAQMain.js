import React from "react";
import DataTable from "./FAQTable/DataTable";
import Index from "../../Layout/Navigation/AdminNavigation/index";
import "./AdminFAQMain.css";

export default function AdminFAQMain() {
  return (
    <div className="container-fluid" id="landing-page">
      <div className="row p-0">
        <div className="col p-0 d-none d-sm-block">
          <div>
            <Index />
          </div>
        </div>
        <div className="col-lg-10 col-sm-1 p-0 g-0">
          <div className="row">
            <div className="body d-none d-sm-block">
              <DataTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
