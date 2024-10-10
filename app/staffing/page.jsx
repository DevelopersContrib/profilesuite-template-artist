import Script from 'next/script';
import { getDomain} from '../../lib/data';
const page = () => {
  const domain = getDomain();
  return (
    <>
        <Script src={"https://tools.contrib.com/pages/staffing?d="+domain+"&container=staffing-script"}/>
        <div className="staffing-script"></div>
    </>
   
  )
}

export default page