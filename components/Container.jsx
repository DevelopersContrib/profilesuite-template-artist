"use client";

import { useState} from "react";
import Form from "./Form";
import Thanku from "./Thanku";

const Container = ({domain}) => {
  const initialValues = {
		email: "",
    name: ""
	}

  const [referralData, setReferralData ] = useState(initialValues);
  const [success, setSuccess] = useState(false);
  
  return (
    <>
    
    {success ? <Thanku domain={domain} referralData={referralData}/>: <Form domain={domain} setSuccess={setSuccess} setReferralData={setReferralData}/>}
  
  </>
  )
}

export default Container