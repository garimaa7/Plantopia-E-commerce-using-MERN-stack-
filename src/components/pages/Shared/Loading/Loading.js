import React from "react";
import loader from "../../../../assets/Infinity.svg";

const Loading = () => {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <img style={{ marginTop: "-100px" }} src={loader} alt="" />
    </div>
  );
};

export default Loading;
