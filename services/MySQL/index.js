const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json()); //middleware to parse json
app.use(cors());
const PORT = 8080;

//listener
app.listen(PORT, () => console.log(`live http://localhost:${PORT}`));

// establish connection to database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "helpx",
  database: "helpx",
  dateStrings: true,
});

//function to test connection with db
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//function to call select SP
function getQuery(db, sqlQuery, res) {
  db.query(sqlQuery, (err, result) => {
    if (err) {
      res.send(err.sqlMessage);
    } else {
      res.send(result);
    }
  });
}

//function to call delete, insert, update SP
function setQuery(db, sqlQuery, par, res) {
  db.query(sqlQuery, par, (err, result) => {
    if (err) {
      res.send(err.sqlMessage);
    } else {
      res.send(result);
    }
  });
}

//db hook for displaying applications in datatable for admin
app.get("/api/apps/listapplications", (req, res) => {
  const getApplicationsList = "CALL sp_applications_sel()";
  getQuery(db, getApplicationsList, res);
});

//insert new application
app.post("/api/apps/addapplications", (req, res) => {
  const insApp = "CALL sp_applications_ins(?,?,?,?)";
  const params = req.body.apps;
  setQuery(
    db,
    insApp,
    [params.name, params.url, params.datecreated, params.datemodified],
    res
  );
});

//edit application info
app.post("/api/apps/editapplications", (req, res) => {
  const updApp = "CALL sp_applications_upd(?,?,?,?)";
  const params = req.body.apps;
  setQuery(
    db,
    updApp,
    [params.id, params.name, params.url, params.datemodified],
    res
  );
});

//delete application
app.delete("/api/apps/deleteapplication", (req, res) => {
  const deleteApps = "CALL sp_applications_del(?)";
  const params = req.body;
  setQuery(db, deleteApps, params.id, res);
});

app.get("/api/configuredapps/2", (req, res) => {
  const getRecentConfiguredApps = "CALL sp_applications_sel_recentchanges()";
  getQuery(db, getRecentConfiguredApps, res);
});

//display unconfigured apps
app.get("/api/configuredapps/1", (req, res) => {
  const getUnconfiguredApps = "CALL sp_applications_sel_unconfigured()";
  getQuery(db, getUnconfiguredApps, res);
});

//display app attributes under admin app configuration
app.get("/api/appattributes/listappattributes", (req, res) => {
  const getAppAttributes = "CALL sp_appattributes_sel()";
  getQuery(db, getAppAttributes, res);
});

//edit attributes value for admin app configurations
app.put("/application-settings/:appid", (req, res) => {
  const updAppAttributes = "CALL sp_applicationsattributes_upd(?,?,?,?)";
  const params = req.body.attributes;
  setQuery(
    db,
    updAppAttributes,
    [params.appid, params.attributeid, params.newvalue, params.datemodified],
    res
  );
});

//display content list on user dashboard
app.get("/ctdashboard", (req, res) => {
  const getDashboardDetails = "CALL sp_contentdb_sel()";
  getQuery(db, getDashboardDetails, res);
});

//db hook for list of release Notes

app.get("/releasenotes/list", (req, res) => {
  const ReleaseNotes = "CALL sp_ReleaseNotes_sel()";
  getQuery(db, ReleaseNotes, res);
});

// db hook for displaying contentBody of release notes
app.get("/releasenotes/sel", (req, res) => {
  const getContentBodyReleaseNotes = "CALL sp_ContentBodyReleaseNotes_sel()";
  getQuery(db, getContentBodyReleaseNotes, res);
});

//insert new content
app.post("/content/ins", (req, res) => {
  const insContent = "CALL sp_content_ins(?,?,?,?,?,?,?,?,?,?,?)";
  const params = req.body.content;
  setQuery(
    db,
    insContent,
    [
      params.appid,
      params.userid,
      params.contenttypeid,
      params.statusid,
      params.isfeebackallowed,
      params.isvisible,
      params.title,
      params.body,
      params.datecreated,
      params.datemodified,
      params.datepublished,
    ],
    res
  );
});

//insert new faq
app.post("/faq/ins", (req, res) => {
  const insFaq = "CALL sp_faq_ins(?,?,?,?,?,?,?)";
  const params = req.body.faq;
  setQuery(
    db,
    insFaq,
    [
      params.appid,
      params.question,
      params.answer,
      params.isfeebackallowed,
      params.isvisible,
      params.datecreated,
      params.datemodified,
    ],
    res
  );
});

//db hook for displaying faq for admin and content creator
app.get("/faq/sel", (req, res) => {
  const getFAQList = "CALL sp_faq_sel()";
  getQuery(db, getFAQList, res);
});

//insert new content file
app.post("/contentfiles/ins", (req, res) => {
  const insContentFiles = "CALL sp_contentfiles_ins(?,?,?,?)";
  const params = req.body.contentfiles;
  setQuery(
    db,
    insContentFiles,
    [
      params.contentid,
      params.filepath,
      params.datecreated,
      params.datemodified,
    ],
    res
  );
});

//db hook for displaying feddback list for user view
app.get("/feedback/sel", (req, res) => {
  const getFeedbackListEU = "CALL sp_feedback_sel_user()";
  getQuery(db, getFeedbackListEU, res);
});

//edit faq update
app.post("/faq/upd", (req, res) => {
  const updFaq = "CALL sp_faq_upd(?,?,?,?,?,?,?)";
  const params = req.body.faq;
  setQuery(
    db,
    updFaq,
    [
      params.appid,
      params.question,
      params.answer,
      params.isfeedbackallowed,
      params.isvisible,
      params.datecreated,
      params.datemodified,
    ],
    res
  );
});

//edit faq delete
app.delete("/faq/del", (req, res) => {
  const deleteFaq = "CALL sp_faq_del(?)";
  const params = req.body;
  setQuery(db, deleteFaq, params.id, res);
});

//db hook for displaying feedbacklist under release note for content creator
app.get("/feedbackccrn/sel", (req, res) => {
  const getFeedbackListCCRN = "CALL sp_feedback_sel_byContentID()";
  getQuery(db, getFeedbackListCCRN, res);
});

//db hook for displaying lookupuserroles list
app.get("/roles/sel", (req, res) => {
  const getlookupuserroles = "CALL sp_lookupuserroles_sel()";
  getQuery(db, getlookupuserroles, res);
});

//insert new roles
app.post("/roles/ins", (req, res) => {
  const insRoles = "CALL sp_lookupuserroles_ins(?,?,?,?)";
  const params = req.body.role;
  setQuery(
    db,
    insRoles,
    [params.name, params.description, params.datecreated, params.datemodified],
    res
  );
});

//roles update
app.post("/roles/upd", (req, res) => {
  const updRole = "CALL sp_lookupuserroles_upd(?,?,?,?)";
  const params = req.body.role;
  setQuery(
    db,
    updRole,
    [params.id, params.name, params.description, params.DateModified],
    res
  );
});

//roles delete
app.delete("/roles/del", (req, res) => {
  const deleteRole = "CALL sp_lookupuserroles_del(?)";
  const params = req.body;
  setQuery(db, deleteRole, params.id, res);
});

// db hook for displaying users list
app.get("/user/sel", (req, res) => {
  const getUsers = "CALL sp_users_sel()";
  getQuery(db, getUsers, res);
});

// db hook for displaying fraud list
app.get("/fraudmanagement/sel", (req, res) => {
  const getFraudManagement = "CALL sp_fraudmanagement_sel()";
  getQuery(db, getFraudManagement, res);
});

//insert new admin fraud
app.post("/fraudmanagement/ins", (req, res) => {
  const insFraudManagement = "CALL sp_fraudmanagement_ins(?,?,?)";
  const params = req.body.fraudmanagement;
  setQuery(
    db,
    insFraudManagement,
    [params.term, params.datecreated, params.datemodified],
    res
  );
});

// insert new template for content creator
app.post("/template/ins", (req, res) => {
  const insTemplate = "CALL sp_template_ins(?,?,?,?,?,?)";
  const params = req.body.template;
  setQuery(
    db,
    insTemplate,
    [
      params.appid,
      params.userid,
      params.title,
      params.body,
      params.datecreated,
      params.datemodified,
    ],
    res
  );
});

// db hook for displaying template list
app.get("/template/sel", (req, res) => {
  const getTemplate = "CALL sp_template_sel()";
  getQuery(db, getTemplate, res);
});

//template update
app.post("/template/upd", (req, res) => {
  const updTem = "CALL sp_template_upd(?,?,?,?,?,?,?)";
  const params = req.body.tem;
  setQuery(
    db,
    updTem,
    [
      params.id,
      params.appid,
      params.userid,
      params.title,
      params.body,
      params.datecreated,
      params.datemodified,
    ],
    res
  );
});

//template delete
app.delete("/template/del", (req, res) => {
  const deleteTemplate = "CALL sp_template_del(?)";
  const params = req.body;
  setQuery(db, deleteTemplate, params.id, res);
});

// db hook to insert bookmark
app.post("/bookmarks/ins", (req, res) => {
  const insBookmarks = "CALL sp_bookmarks_ins(?,?,?,?,?)";
  const params = req.body.book;
  setQuery(
    db,
    insBookmarks,
    [
      params.userid,
      params.url,
      params.bookmarkname,
      params.datecreated,
      params.datemodified,
    ],
    res
  );
});

// db hook to delete bookmark
app.post("/bookmarks/del", (req, res) => {
  const deleteBookmarks = "CALL sp_bookmarks_del(?)";
  const params = req.body;
  setQuery(db, deleteBookmarks, params.id, res);
});

// db hook to update bookmark
app.post("/bookmarks/upd", (req, res) => {
  const updBookmarks = "CALL sp_bookmarks_upd(?,?,?)";
  const params = req.body.book;
  setQuery(
    db,
    updBookmarks,
    [params.bookmarkname, params.id, params.datemodified],
    res
  );
});

// db hook to select all bookmarks from all users
app.get("/bookmarks/sel_all", (req, res) => {
  const getallbook = "CALL sp_bookmarks_sel_all()";
  getQuery(db, getallbook, res);
});

// db hook to select all bookmarks for a user
app.post("/bookmarks/sel_user", (req, res) => {
  const getuserbook = "CALL sp_bookmarks_sel_user(?)";
  const params = req.body.book;
  setQuery(db, getuserbook, params.userid, res);
});

// db hook to update feedback
app.post("/feedback/upd", (req, res) => {
  const updFeedback = "CALL sp_feedback_upd(?,?,?,?)";
  const params = req.body.feedbacks;
  setQuery(
    db,
    updFeedback,
    [params.id, params.feedback, params.rating, params.datemodified],
    res
  );
});

// db hook to update word in fraud management
app.post("/fraudmanagement/upd", (req, res) => {
  const updFraudManagement = "CALL sp_fraudmanagement_upd(?,?,?)";
  const params = req.body.fraudmanagement;
  setQuery(
    db,
    updFraudManagement,
    [params.id, params.term, params.datemodified],
    res
  );
});

// db hook for displaying number of users for the roles
app.get("/userroles/sel", (req, res) => {
  const getnumuser = "CALL sp_userapproles_sel_numofusers()";
  getQuery(db, getnumuser, res);
});

// delete fraud term
app.delete("/fraudmanagement/del", (req, res) => {
  const deleteFraudManagement = "CALL sp_fraudmanagement_del(?)";
  const params = req.body;
  setQuery(db, deleteFraudManagement, params.id, res);
});

// db for feedback list for content creator
app.get("/feedbackcc/sel", (req, res) => {
  const getFeedbackListCC = "CALL sp_feedback_sel_cc()";
  getQuery(db, getFeedbackListCC, res);
});

//db hook for displaying notifications
app.get("/notifications/sel", (req, res) => {
  const getnotsel = "CALL sp_notifications_sel()";
  getQuery(db, getnotsel, res);
});

// db hook for delete notifications
app.delete("/notifications/del", (req, res) => {
  const deleteNotifications = "CALL sp_notifications_del(?)";
  const params = req.body;
  setQuery(db, deleteNotifications, params.id, res);
});

//db hook for insert new notifications
app.post("/notifications/ins", (req, res) => {
  const insContent = "CALL sp_notifications_ins(?,?,?,?,?,?)";
  const params = req.body.notifications;
  setQuery(
    db,
    insContent,
    [
      params.typeid,
      params.userappid,
      params.body,
      params.isread,
      params.datecreated,
      params.datemodified,
    ],
    res
  );
});

app.post("/content/upd", (req, res) => {
  const updContent = "CALL sp_content_upd(?,?,?,?,?,?,?)";
  const params = req.body.content;
  setQuery(
    db,
    updContent,
    [
      params.id,
      params.statusid,
      params.isfeebackallowed,
      params.isvisible,
      params.title,
      params.body,
      params.datemodified,
    ],
    res
  );
});

// db hook for delete notifications
app.delete("/content/del", (req, res) => {
  const deleteContent = "CALL sp_content_del(?)";
  const params = req.body;
  setQuery(db, deleteContent, params.id, res);
});

//db hook for insert feedback
app.post("/feedback/ins", (req, res) => {
  const insFeedback = "CALL sp_feedback_ins(?,?,?,?,?,?)";
  const params = req.body.feedback;
  setQuery(
    db,
    insFeedback,
    [
      params.userid,
      params.contentid,
      params.feedback,
      params.rating,
      params.datecreated,
      params.datemodified,
    ],
    res
  );
});

// db hook to select all feedback for a user under release note
app.post("/feedbackrn/sel_user", (req, res) => {
  const getuserfeedback = "CALL sp_feedbackrn_sel(?,?)";
  const params = req.body.feedback;
  setQuery(db, getuserfeedback, [params.contentid, params.userid], res);
});

//db hook for number of integrated application
app.get("/integratedapps/sel", (req, res) => {
  const getIntApp = "CALL sp_integratedapps_sel()";
  getQuery(db, getIntApp, res);
});

//db hook for displaying search term
app.get("/searchterm/sel", (req, res) => {
  const getSearchTerm = "CALL sp_searchterm_sel()";
  getQuery(db, getSearchTerm, res);
});

// db hook for displaying auditlogs
app.get("/auditlogs/datatable", (req, res) => {
  const getAuditLogs = "CALL sp_auditlogs_sel()";
  getQuery(db, getAuditLogs, res);
});

//db hook for number of active users
app.get("/countUser/sel", (req, res) => {
  const getIntApp = "CALL sp_countUser_sel()";
  getQuery(db, getIntApp, res);
});

//db hook for users without roles
app.get("/api/users/1", (req, res) => {
  const getUsersWithoutRoles = "CALL sp_users_sel_withoutRoles()";
  getQuery(db, getUsersWithoutRoles, res);
});

//db hook for not active users
app.get("/api/users/2", (req, res) => {
  const getNotActiveUsers = "CALL sp_users_sel_notActive()";
  getQuery(db, getNotActiveUsers, res);
});

// db hook for displaying recentauditlogs at dashboard
app.get("/recentauditlog/history", (req, res) => {
  const getRecentAuditLog = "CALL sp_auditlogs_sel()";
  getQuery(db, getRecentAuditLog, res);
});
