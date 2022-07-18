import React, { useState, useReducer, useEffect } from "react";
import { Pagination } from "@mui/material";
import "./index.css";
import axios from "axios";
import Dashboard from ".";

export default function DashboardCA2() {
  const [tableData, setTableData] = useState([]);

    //for pagination
  const PER_PAGE = 4;
  let [page, setPage] = useState(1);
  const count = Math.ceil(tableData.length / PER_PAGE);

  
   //handler for MUI oagination
   const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const _DATA = usePagination(tableData, PER_PAGE); 
function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    // Specify which data will be displayed in the table
    function currentData() {
      const begin = (currentPage - 1) * itemsPerPage;
      const end = begin + itemsPerPage;

      return data.slice(begin, end);
    }

    function jump(page) {
      const pageNumber = Math.max(1, page);
      setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    }

    return { jump, currentData, currentPage, maxPage };
  }
{
            _DATA.currentData().map((item) => {
              return (
                <tr>
                  <td>{item.Date}</td>
                  <td>{item.Title}</td>
                  <td>{item.Schedule}</td>
                  <td>{item.FeedbackButton}</td>
                  <td>{item.Feedback}</td>
                  <td>{item.Visibility}</td>
                  <td>{item.Status}</td>
                </tr>
              );
            })
          }
  return (
    <div className="container-fluid" id="DashboardCA">
       
      <div className="d-flex d-sm-flex-column">
        <div className="row g-0 d-flex">
          <div className="col-lg-12">
            <table className="table table-hover table-borderless mb-0">
              <thead>
                <tr className="content-summary">
                  <td colSpan={8}>
                    <div className="d-flex justify-content-between">
                    
                      <div className="align-self-center">
                        <p className="d-inline ms-4">7</p>
                        <sup className="text-danger me-5">Pending Approval</sup>
                        <p className="d-inline ms-5">2</p>
                        <sup className="text-warning">In Draft</sup>
                      </div>
                      <button className="btn align-self-center me-3 add-content" >
                        New Release Note
                      </button>
                      </div>
                  </td>
                  </tr>
                <tr className="border-bottom-5 border-white">
                  <th>
                    <button id="DateCreated">
                      Date
                      
                        <img
                          src={process.env.PUBLIC_URL + "/icons/unsort.svg"}
                        />
                      
                    </button>
                  </th>
                  <th>
                  <button id="PostedBy" >
                   Posted By
             
                 <img
                   src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                   alt="descending"
                 />
              
             </button>

                  </th>
                  <th>
                    <div>
                      <button data-bs-toggle="collapse" data-bs-target="#title-collapse" aria-expanded="false" aria-controls="title-collapse">
                        Title
                        <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                        />
                      </button>
                    </div>
                  </th>
                  <th>
                    <button id="Schedule" >
                   
                        Schedule
                        <img
                          src={process.env.PUBLIC_URL + "/icons/unsort.svg"}
                          alt="unsort"
                        />
                     
                    </button>
                  </th>
                  
                  <th>
                  <button id="Feedbackbtn" >
                   
                    Feedback Button
                    <img src={process.env.PUBLIC_URL + "/icons/descend.svg"} />
                  </button>
                  </th>
                  <th>
                  <button id="Feedback" >
                   
                    Feedback 
                    <img src={process.env.PUBLIC_URL + "/icons/descend.svg"} />
                  </button>
                  </th>
                  
                  <th>
                    
                  <button id="Visibility" >
                   
                   Visibility
                   <img src={process.env.PUBLIC_URL + "/icons/descend.svg"} />
                 </button>
                  </th>
                  <th>
                  <button id="Status" >
                   
                  Status
                   <img src={process.env.PUBLIC_URL + "/icons/descend.svg"} />
                 </button>
                  </th>
                </tr>
                
               
              </thead>
              
              <tbody>
               
                  
                    <tr >
                      <td>12/1/22</td>
                      <td>Queen</td>
                      <td>Release Note 6.2.2</td>
                      <td>12/1/22</td>
                      <td>off</td>
                      <td>3</td>
                      <td>on</td>
                      <td>Approved</td>
                      
                    </tr>
                    <tr >
                      <td>12/1/22</td>
                      <td>Balqis</td>
                      <td>Release Note 6.2.2</td>
                      <td>12/1/22</td>
                      <td>on</td>
                      <td>3</td>
                      <td>on</td>
                      <td>Approved</td>
                      
                    </tr>
                    <tr >
                      <td>12/1/22</td>
                      <td>Jannah</td>
                      <td>Release Note 6.2.2</td>
                      <td>12/1/22</td>
                      <td>off</td>
                      <td>7</td>
                      <td>off</td>
                      <td>Approved</td>
                      
                    </tr>
                    <tr >
                      <td>12/1/22</td>
                      <td>Hanis</td>
                      <td>Release Note 6.2.2</td>
                      <td>12/1/22</td>
                      <td>off</td>
                      <td>3</td>
                      <td>on</td>
                      <td>Approved</td>
                      
                    </tr>
                    <tr >
                      <td>12/1/22</td>
                      <td>Cira</td>
                      <td>Release Note 6.2.2</td>
                      <td>12/1/22</td>
                      <td>off</td>
                      <td>10</td>
                      <td>on</td>
                      <td>Approved</td>
                      
                    </tr>
  
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={8}>
                    <p className="float-start ms-3 mt-2">Total Number of Release: 7</p>
                  </td>
                </tr>
              </tfoot>
            </table>
            <Pagination
        className="pageBar"
        count={10}
        size="large"
        color="primary"
        page={3}
        shape="rounded"
        onChange={handleChange}
      /> 

          </div>
        </div>
      </div>
    </div>
  );
}
