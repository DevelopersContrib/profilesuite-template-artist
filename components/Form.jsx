"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import LoadingState from './LoadingState';
import ErrorBlock from './ErrorBlock';
import { removeSpecialCharacters } from '../lib/utils';

function LeadForm({domain, setSuccess, setReferralData}) {
	const initialValues = {
		isLoading:false,
		domain:domain,
		email: "",
	}

	const initialErrors = {
		validate:false,
		emailError: "",
	};
    
	const [data, setData] = useState(initialValues);
	const [errors, setErrors] = useState(initialErrors);
    const [emailExist, setEmailExist] = useState('');

	useEffect(() => {
		const validateErrors = () => {
			const dataErrors = {
				emailError: (data.email?'':"Email is required") || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? "":"Invalid Email"),
			}
			setErrors(dataErrors);
		}
		validateErrors()
	}, [data]);
      
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

  
	const handleSubmit = async(event) => {
		event.preventDefault();

		const isValid = !Object.values(errors).some(v => v);
		setErrors({ ...errors, ['validate']: true })
    if(isValid ){
      setData({ ...data, ['isLoading']: true});
      try {
				console.log('submit')
        const response = await fetch("/api/lead", {
          method: "POST",
          body: JSON.stringify(data),
        });

        setData({ ...data, ['isLoading']: false});
        
				if (response.ok) {
          const res = await response.json()
          
          if(res.status){
			const emailReferral = data.email;
			const emailSplit = emailReferral.split('@');
			console.log(emailSplit);
			const name = removeSpecialCharacters(emailSplit[0]);
			console.log(name);

			setReferralData({...data,['email']:emailReferral, ['name']: name})
            setSuccess(true);
            console.log('done....')
          }
          
        }else{
          alert('An error occurred')
        }
      } catch (error) {
        console.log(error);
      } finally {
        //set
      }
		}
	}
    
    
	const showStep = () => {
        console.log(errors)
		return(
			<div className="">
                <div className="input-group input-group-lg mb-3">
                    <input type="text" name="email" className="form-control" onChange={handleChange}  />
                    <button
                    className="btn btn-danger tw-px-[3rem!important]"
                    type="button"
                    onClick={handleSubmit}
                    >Submit</button>
                </div>
                {errors.validate? (<ErrorBlock msg={errors.emailError} />): null}
            </div>
		)
	}

  return (
		<>
			{ data.isLoading ? <LoadingState />  : (showStep())}
		</>
  )
}

export default LeadForm