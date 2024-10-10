import Script from "next/script"
import { getDomain} from '../../lib/data';
const page = () => {
  const domain = getDomain();
  return (
    <>
      <Script src={"https://tools.contrib.com/pages/aboutnew?d="+domain+"&container=aboutnew-script"} />
      <div className="aboutnew-script"></div>
    </>
  )
}

export default page