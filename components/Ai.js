'use client'

import Script from 'next/script';
function Ai() {
  return (
    <>
        <div className="ai-script"></div>
        <Script src="https://tools.contrib.com/cwidget/ai?container=ai-script" />
    </>
  )
}

export default Ai