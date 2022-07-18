import UserHeader from "../Navigation/UserHeader";
import UserNavigation from "../Navigation/UserNavigation";
import ContentBody from "../ContentBody/ContentBody";
import RNSearchVertical from "../../Search/RNSearchVertical";

function EditorReleaseNote() {
  return (
    <div>
      <div>
        <UserNavigation />
      </div>
      <div>
        <UserHeader />
      </div>
      <div>
        <ContentBody />
      </div>
      <div>
        <RNSearchVertical />
      </div>
    </div>
  );
}
export default EditorReleaseNote;
