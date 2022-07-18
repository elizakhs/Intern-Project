import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Auth from "./services/Auth/Auth";
import Callback from "./services/Auth/Callback";
import EndUserHomePage from "./components/HomePage/EndUserHomePage/EndUserHomePage";
import AuditLogDatatable from "./components/Admin/AdminAuditLog/AuditLogDatatable";
import AdminHomePage from "./components/Admin/AdminDashboard";
import ProtectedRoute from "./services/ProtectedRoute";
import DashboardCV from "./components/ReleaseNotes/Dashboard/DashboardCC";
import UserNavigation from "./components/ReleaseNotes/Navigation/UserNavigation";
import Header from "./components/LandingPage/Header/Header";
import NavigationBar from "./components/Layout/Navigation/AdminNavigation";
import FeedbackEUList from "./components/Feedback/FeedbackListEU/FeedbackListEU";
import ApplicationSettingsList from "./components/Admin/AdminConfiguration/ApplicationSettings/ApplicationSettingsList";
import UserManagement from "./components/Admin/AdminManagement/UserManagement";
import RolesManagement from "./components/Admin/AdminManagement/RolesManagement";
import TemplateEditor from "./components/ReleaseNotes/Editor/TemplateEditor";
import NormalEditor from "./components/ReleaseNotes/Editor/NormalEditor";
import FraudConfig from "./components/FraudManagement/FraudAdmin";
import ContentBody from "./components/ReleaseNotes/ContentBody/ContentBody";
import FAQCCPage from "./components/FAQ/FAQCCPage";
import UrlHandler from "./services/UrlHandler";
import UserHeader from "./components/ReleaseNotes/Navigation/UserHeader";
import BookmarkListEU from "./components/Bookmark/BookmarkListEU";
import AdminFAQMain from "./components/Admin/AdminFAQList/AdminFAQMain";
import ApplicationList from "./components/Admin/AdminConfiguration/ApplicationList/ApplicationList";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    const isAdmin = localStorage.getItem("isAdmin");
    const isAuthorized = localStorage.getItem("id_token");
    return (
      <div className="chunk">
        {isAuthorized && <Header />}
        {isAuthorized && <UserHeader />}
        {isAuthorized &&
          (isAdmin === "true" ? <NavigationBar /> : <UserNavigation />)}
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <LandingPage {...props} />}
          />
          <Route
            exact
            path="/callback"
            render={(props) => <Callback auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/homepage"
            render={(props) => <EndUserHomePage auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/admin/home"
            render={(props) => <AdminHomePage auth={this.auth} {...props} />}
          />

          <ProtectedRoute
            exact
            path="/admin/audit-logs"
            render={(props) => (
              <AuditLogDatatable auth={this.auth} {...props} />
            )}
          />
          <ProtectedRoute
            exact
            path="/admin/app-settings"
            render={(props) => (
              <ApplicationSettingsList auth={this.auth} {...props} />
            )}
          />
          <ProtectedRoute
            exact
            path="/admin/users-management"
            render={(props) => <UserManagement auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/admin/roles-management"
            render={(props) => <RolesManagement auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/admin/application-List"
            render={(props) => <ApplicationList auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/admin/fraud-management"
            render={(props) => <FraudConfig auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/admin/faq-list"
            render={(props) => <AdminFAQMain auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/creator/dashboard"
            render={(props) => <DashboardCV auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/editor/normal"
            render={(props) => <NormalEditor auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/content/feedback"
            render={(props) => <FeedbackEUList auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/editor/template"
            render={(props) => <TemplateEditor auth={this.auth} {...props} />}
          />

          <ProtectedRoute
            exact
            path="/content/release-note"
            render={(props) => <ContentBody auth={this.auth} {...props} />}
          />

          <ProtectedRoute
            exact
            path="/content/faq"
            render={(props) => <FAQCCPage auth={this.auth} {...props} />}
          />
          <Route
            path="*"
            render={(props) => <UrlHandler auth={this.auth} {...props} />}
          />

          <ProtectedRoute
            exact
            path="/content/bookmark"
            render={(props) => <BookmarkListEU auth={this.auth} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
