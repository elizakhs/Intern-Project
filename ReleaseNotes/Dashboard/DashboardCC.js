import Dashboard from ".";
import WordFilterList from "../../FraudManagement/WordFilterList";

export default function DashboardCV() {
  return (
    <div className="container-fluid" id="cc-dashboard">
      <div className="row g-0">
        <div className="col-md-10 col-lg-12 col-xl-12">
          <div className="row d-inline flex">
            <div className="col-auto">
              <Dashboard />
            </div>
          </div>
          <div className="row d-inline flex">
            <div className="col-auto">
              <WordFilterList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
