import "./UserHeader.css";
import { Link } from "react-router-dom";

const UserHeader = () => {
  return (
    <div className="UserHeader">
      <div className="userHeader-nav ">
        <ul className="UserHeader-ul">
          <li className="UserHeader-li">
            <Link to="/content/release-note">Release Notes</Link>
            {/* <a href="/content/release-note">Release Notes</a> */}
          </li>
          <li className="UserHeader-li">
            <a href="/documenation">Documentation</a>
          </li>
          <li className="UserHeader-li">
            <Link to="/content/faq">FAQ</Link>
            {/* <a href="/content/faq">FAQ</a> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserHeader;
