import { now } from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Axios from "axios";
import useUsername from "../useUsername";
import Time from "react-time-format";
import Demo from "./popup";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import popup from "./popup";
const About = () => {
  const [postData, setPostData] = useState({ selectedFile: "", _id: "" });
  const { username, setUsername } = useUsername();
  const [updateId, setUpdateId] = [];
  const [accesslist, setAccessList] = useState([
    {
      _id: "",
      name: "",
      surname: "",
      idno: "",
      telno: "",
      vendor: "",
      reason: "",
      selectedFile: null,
      createdAt: Date.now(),
      exitAt: "",
    },
  ]);
  const url = "http://localhost:7000/access";
  const urlApprove = "http://localhost:7000/access/approve";
  useEffect(() => {
    fetch("http://localhost:7000/access")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setAccessList(jsonRes))
      .catch((error) => {
        console.log(error);
      });
  });

  const updateApprover = (id) => {
    Axios.patch(`${urlApprove}/${id}`, {
      approve: username,
    });
  };

  const contentStyle = {
    maxWidth: "250px",
    width: "80%",
    margin: "auto",
    position: "inherit",
  };

  const onChangeFile = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };
  const onLoad = (fileString) => {
    //console.log(fileString);
    setPostData({ ...postData, selectedFile: fileString });
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const update = (event) => {
    event.preventDefault();
    Axios.patch(`${url}/${postData._id}`, {
      selectedFile: postData.selectedFile,
    });
  };

  return (
      
    <div className="tableList">
        <popup />
      <h2 style={{color:"white"}}>ข้อมูลผู้เข้าใช้งานห้อง Data Center</h2>
      <Table responsive striped bordered hover bg light>
        <thead>
          <tr>
            <th>เลขบัตรประชาชน</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>เบอร์โทรศัพท์</th>
            <th>บริษัท</th>
            <th>วัตถุประสงค์</th>
            <th>ภาพถ่าย</th>
            <th>เวลาเข้า</th>
            <th>ผู้อนุญาต</th>
            <th>เวลาออก</th>
          </tr>
        </thead>
        <tbody>
          {accesslist.map((access) => (
            <tr key={access._id}>
              <td>{access.idno}</td>
              <td>{access.name}</td>
              <td>{access.surname}</td>
              <td>{access.telno}</td>
              <td>{access.vendor}</td>
              <td>{access.reason}</td>
              <td>
                <img src={access.selectedFile} width="100px" height="100px" />
              </td>
              <td>
                <Time value={access.createdAt} format="DD-MM-YYYY hh:mm:ss" />
              </td>

              {access.approver ? (
                <td>{access.approver}</td>
              ) : (
                <td>
                  <Button
                    variant="success"
                    onClick={() => updateApprover(access._id)}
                  >
                    อนุญาต
                  </Button>{" "}
                </td>
              )}
              {access.approver ? (
                <td>
                    
                  <Popup
                    trigger={<Button variant="info">ลงเวลาออก</Button>}
                    contentStyle={contentStyle}
                  >
                    <div className="header"> บันทึกภาพถ่าย</div>
                    <div className="content">
                      <form onSubmit={update}>
                        
                        <input
                          aria-label="image"
                          class="form-control"
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={onChangeFile}
                          required
                        />
                        <button
                          class="btn btn-success"
                          type="submit"
                          onClick={() =>
                            setPostData({ ...postData, _id: access._id })
                          }
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </Popup>
                </td>
              ) : (
                <td>
                  <Button variant="danger">รอการอนุญาต</Button>{" "}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default About;
