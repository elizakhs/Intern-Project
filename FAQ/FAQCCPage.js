import FeedbackListCCRN from "../Feedback/FeedbackListCCRN";

import FAQList from "./FAQListEU";

function FAQCCPage() {
  return (
    <div className=" container-fluid g-0">
      <div className="row g-0">
        <div className="row g-0">
          <div className="col-lg-6">
            <FAQList />
          </div>
          <div className="col-lg-6">
            <FeedbackListCCRN />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FAQCCPage;
