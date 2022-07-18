import UserHeader from "../../ReleaseNotes/Navigation/UserHeader";
import UserNavigation from "../../ReleaseNotes/Navigation/UserNavigation";
import FeedbackListEU from "../../Feedback/FeedbackListEU/FeedbackListEU";

export default function WordFilterListCV() {
  return (
    <div className="">
      <UserNavigation />
      <div className="row">
        <div className="container-fluid">
          <div className="d-inline flex">
            <div className="">
              <UserHeader />
              <FeedbackListEU />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
