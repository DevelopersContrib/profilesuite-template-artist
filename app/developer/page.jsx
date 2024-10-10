import Script from "next/script"
import { getDomain} from '../../lib/data';
const page = () => {
  const domain = getDomain();
  return (
    <>
      <Script src={"https://tools.contrib.com/pages/developer?d="+domain+"&container=developer-script"} />
      <div className="developer-script"></div>
    </>
  )
}

export default page