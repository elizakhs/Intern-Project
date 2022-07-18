import React, { useState } from "react";
import EditListOfApp from "../../ActionButtonsConfig/EditApplication/EditApplicationList";
import DeleteApplicationList from "../../ActionButtonsConfig/DeleteApplication/DeleteApplicationList";

const ApplicationListData = ({ appList, i }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <tr key={i}>
      <td>{appList.id}</td>
      <td>{appList.name}</td>
      <td>{appList.url}</td>
      <td>
        {showEdit || showDelete ? (
          showEdit ? (
            <EditListOfApp
              appList={appList}
              changeState={(showEdit) => setShowEdit(showEdit)}
            />
          ) : (
            <DeleteApplicationList
              appList={appList}
              changeState={(showDelete) => setShowDelete(showDelete)}
            />
          )
        ) : (
          <div>
            <button
              key={i}
              className="button-green"
              onClick={() => setShowEdit(!showEdit)}
            >
              Edit
            </button>
            <button
              className="button-red"
              onClick={() => setShowDelete(!showDelete)}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ApplicationListData;
