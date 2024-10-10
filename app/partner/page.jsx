import Script from "next/script"
import { getDomain} from '../../lib/data';
const page = () => {
  const domain = getDomain();
  return (
    <>
      <Script src={"https://tools.contrib.com/pages/partner?d="+domain+"&container=partner-script"} />
      <div className="partner-script"></div>
    </>
  )
}

export default page