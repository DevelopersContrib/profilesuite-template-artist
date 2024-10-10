'use client'

import { useSearchParams } from 'next/navigation'

const ScriptLoader = ({ html }) => {
  const searchParams = useSearchParams() 
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  console.log(email);
  console.log(name);
  if(email != null && name != null){
    html = "<script id='referral-script' src='https://www.referrals.com/extension/widget.js?key=356&email="+email+"&name="+name+"' type='text/javascript'></script>";
  }
  
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default ScriptLoader;
