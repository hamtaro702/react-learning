import React from "react";
import Warper from "./Warper";
import Popup from "reactjs-popup";
//

const contentStyle = {
  maxWidth: "600px",
  width: "90%",
};

const CustomModal = () => (
  
  <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    contentStyle={contentStyle}
  >
    <div className="header"> Modal Title </div>
    <div className="content">
      <input
        aria-label="image"
        class="form-control"
        type="file"
        accept="image/*"
        capture="user" 
        required
      />
      ทดสอบ
    </div>
  </Popup>
);

export default Warper(CustomModal);
