import {React,useState} from 'react'
import {Form,Button,Col,Row} from 'react-bootstrap'
import Axios from 'axios'
import FileBase from 'react-file-base64'
import moment from 'moment-timezone'
import { Redirect } from 'react-router'

const dateThailand = moment.tz("Asia/Bangkok");

const About =()=>{

    
  
    const [postData, setPostData] = useState({
        name:"",surname:"",idno:"",telno:"",vendor:"",accessory:"",reason:"",contactPerson:"",selectedFile:""  });

        
            const onChangeFile = e => {
              const files = e.target.files;
              const file = files[0];
              getBase64(file);
            };
            const onLoad = fileString => {
              //console.log(fileString);
              setPostData({ ...postData, selectedFile: fileString})
            };
            const getBase64 = file => {
              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                onLoad(reader.result);
              };
            };   

    const addAccessInfo=()=>{
        
        Axios.post("http://localhost:7000/access",{
            name:postData.name,
            surname:postData.surname,
            idno:postData.idno,
            telno:postData.telno,
            vendor:postData.vendor,
            accessory:postData.accessory,
            reason:postData.reason,
            contactPerson:postData.contactPerson,
            selectedFile:postData.selectedFile,
            createdAt:moment(Date.now())
            //createdAt:moment(Date.now()).add(7, 'hours')
        })
        //console.log(postData)
        setPostData({name:"",surname:"",idno:"",telno:"",vendor:"",accessory:"",reason:"",contactPerson:"",selectedFile:""})
        
            //return <Redirect push to="/" />
        
    }
  
    return(
      <div class="Fields">
      <div  class="row" style={{width: "800px",margin: "auto"}}>
        <div className="Input" >
            <h2 className="Header__from">ฟอร์มลงชื่อเข้าห้อง Data Center</h2>
            
            <div class="containers">
            <form onSubmit={addAccessInfo} >
            <div class="input-group mb-3">   
            
            <input class="form-control" placeholder="ชื่อ" aria-label="Name" type="text" name="name" required value={postData.name} onChange={(event) => setPostData({ ...postData, name: event.target.value})} />
            <span class="input-group-text"></span>
            
            <input class="form-control" placeholder="นามสกุล" aria-label="Surname" type="text" name="surname" required value={postData.surname} onChange={(event)=>setPostData({ ...postData, surname: event.target.value})} />
            </div> 
            <div class="input-group mb-3">
            <input class="form-control" type="text" placeholder="เลขบัตรประชาชน" aria-label="ID Number" name="id" required value={postData.idno} onChange={(event)=> setPostData({ ...postData, idno: event.target.value})} />
            <span class="input-group-text"></span>
            <input class="form-control" type="text" placeholder="เบอร์โทรศัพท์" aria-label="Tel." name="tel" required value={postData.telno} onChange={(event)=>setPostData({ ...postData, telno: event.target.value})}/>
            </div>
            <div class="input-group mb-3"> 
            <input class="form-control" type="text" placeholder="บริษัท" aria-label="Company" name="company" required value={postData.vendor} onChange={(event)=>setPostData({ ...postData, vendor: event.target.value})}/>
            <span class="input-group-text"></span>
            <input  class="form-control" type="text" placeholder="ติดต่อบุคคล" aria-label="ContactPerson" name="contactPerson" required value={postData.contactPerson} onChange={(event)=>setPostData({ ...postData, contactPerson: event.target.value})}/>
            </div>
            <textarea  class="form-control" type="text" placeholder="เครื่องมือ/อุปกรณ์" aria-label="เครื่องมือ/อุปกรณ์"  name="accessory" required value={postData.accessory} onChange={(event)=>setPostData({ ...postData, accessory: event.target.value})}/>
            <br/>
            <textarea  class="form-control" type="text" placeholder="วัตถุประสงค์" aria-label="Reason"  name="reason" required value={postData.reason} onChange={(event)=>setPostData({ ...postData, reason: event.target.value})}/>
            <br/>
            <input  aria-label="image"  class="form-control" type="file"accept="image/*" capture="user" onChange={onChangeFile} required/>


            <br/>
            <button class="btn btn-success" type='submit'>Submit</button>
            <br/>
            </form>
            <br/>
            </div>
        </div>
        </div>
        </div>
    );

}
export default About;