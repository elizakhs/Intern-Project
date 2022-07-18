import "./Content.css";
import UserNavigation from "./Navigation/UserNavigation.js";
import UserHeader from "./Navigation/UserHeader.js";

function Content() {
  return (
    <div class="container-fluid g-0">
      <div class="row" id="content-gap">
        <div class="col-sm-1 col-md-2 col-lg-1">
          <UserNavigation />
        </div>

        <div class="col-sm g-0">
          <div class="col-sm-3 col-md-9 col-lg-12">
            <UserHeader />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
