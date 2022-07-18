import React from "react";

import Dashboard from "./Dashboard";
import PendingAppConfigList from "./AppConfiguration/PendingAppConfigList";
import RecentAppConfigList from "./AppConfiguration/RecentAppConfigList/RecentAppConfigList";
import UsersPanel from "./UsersPanel/UsersPanel";
import RecentAuditLog from "./RecentAuditLog";

function AdminHomePage() {
  return (
    <div className="container-fluid" id="admin-homepage">
      <div className="row g-0">
        <div className="col-lg-12 col-md-6 col-sm-3">
          <div className="row">
            <p className="col fs-1 text-start">Dashboard</p>
          </div>
          <div className="row ">
            <div className="col-lg-12 col-md-9 col-sm-6">
              <Dashboard />
            </div>
          </div>
          <div className="row">
            <div className="col-lg col-md-2 col-sm-1">
              <PendingAppConfigList />
            </div>
            <div className="col-lg col-md-2 col-sm-1">
              <RecentAppConfigList />
            </div>
            <div className="col-lg col-md-1 col-sm-1">
              <UsersPanel />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-9 col-sm-6">
              <RecentAuditLog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
