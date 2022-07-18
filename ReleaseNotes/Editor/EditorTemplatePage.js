import UserHeader from "../Navigation/UserHeader";
import UserNavigation from "../Navigation/UserNavigation";
import TemplateEditor from "./TemplateEditor";

function TemplatePage() {
  return (
    <div>
      <div>
        <UserNavigation />
      </div>
      <div>
        <UserHeader />
      </div>
      <div>
        <TemplateEditor />
      </div>
    </div>
  );
}
export default TemplatePage;
