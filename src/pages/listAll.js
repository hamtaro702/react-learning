import { now } from 'moment-timezone';
import React,{useEffect,useState} from 'react';
import {Table,Button} from 'react-bootstrap'

import Time from 'react-time-format'

const About =()=>{
    const[updateId,setUpdateId]=([])
    const [accesslist,setAccessList] = useState([{
       _id:'',
       name:'',
       surname:'',
       idno:'',
       telno:'',
       vendor:'',
       reason:'',
       selectedFile:null,
       createdAt: Date.now(),
       exitAt:''

    }])
    
    useEffect(()=>{
        fetch("http://localhost:7000/access/getALL").then(res =>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes =>setAccessList(jsonRes))
          .catch((error) => {
            console.log(error); 

         });
    },[accesslist._id])

   
   

    
    return(
        
        <div className="tableList" >
            <h2 style={{color:"white"}}>ข้อมูลผู้เข้าใช้งานห้อง Data Center</h2>
            <Table responsive striped bordered hover>
            <thead>
                <tr>
                <th>เลขบัตรประชาชน</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>เบอร์โทรศัพท์</th>
                <th>บริษัท</th>
                <th>วัตถุประสงค์</th>
                <th>ภาพถ่ายก่อนเข้า</th>
                <th>เวลาเข้า</th>
                <th>เวลาออก</th>
                <th>ภาพถ่ายหลังออก</th>
                <th>ผู้อนุญาติ</th>
                
                
                </tr>
            </thead>
            <tbody>
            
            {accesslist.map(access =>
            
            
            <tr key={access._id}> 
                <td>{access.idno}</td>
                <td>{access.name}</td>
                <td>{access.surname}</td>
                <td>{access.telno}</td>
                <td>{access.vendor}</td>
                <td>{access.reason}</td>
                <td><img src={access.selectedFile} width="100px" height="100px" /></td>
                <td><Time value={(access.createdAt)} format="DD-MM-YYYY hh:mm:ss" /></td>
                <td><Time value={(access.exitAt)} format="DD-MM-YYYY hh:mm:ss" /></td>
                <td><img src={access.postFile} width="100px" height="100px" /></td>
                <td>{access.approver}</td>
                
                
                
            </tr>
            
            )}
            
            </tbody>
            </Table >
        </div>
             
    );

}
export default About;