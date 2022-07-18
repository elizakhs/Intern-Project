import UserNavigation from "../Navigation/UserNavigation.js";
import UserHeader from "../Navigation/UserHeader.js";
import ContentBody from "../../ReleaseNotes/ContentBody/ContentBody.js";
import RNSearchVertical from "../../Search/RNSearchVertical";
import FeedbackRN from "../../Feedback/FeedbackRN";

//-sm col-md-6 col-lg-12
function EndUserRN() {
  return (
    <div class="container-fluid g-0">
      <div class="row">
        <div class="col-sm-1 col-md-2 col-lg-1">
          <UserNavigation />
        </div>

        <div class="col-sm g-0">
          <div class="col ">
            <UserHeader />

            <div class="row">
              <div class="col-9">
                <ContentBody />
              </div>
              <div class="col ">
                <RNSearchVertical />
              </div>
              <div class="row">
                <div class="col-sm-2 col-md-9 col-lg-12">
                  <FeedbackRN />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndUserRN;
