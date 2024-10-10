
const Thanku = ({domain, referralData}) => {
    const follow_link = "https://www.contrib.com/signup/follow/"+domain;
    const referral_link = "/referral?email="+referralData.email+"&name="+referralData.name;
	return (
		<>
            <div className='text-center'>
                <h3>🚀 Welcome to {domain} 🌟 </h3>
                <h3>Congratulations! Your spot is reserved in our exclusive community at {domain}. 🎉 </h3>
                <p>
                At {domain}, we are committed to creating an inclusive and like-minded community where you can connect, collaborate, and discover exciting opportunities. Join fellow enthusiasts, entrepreneurs, developers, designers, marketers, and specialists who are shaping the future of digital innovation.
                </p>
                <p>
                Signup with Contrib, Follow, Contribute to dpclabs.com and get DPClabs tokens! Let&apos;s grow this brand together! 🚀🌍💫
                </p>
                <div className="mb-3">
                <a href={referral_link} className="btn btn-warning">🎯 Refer {domain} Get $5 Worth of Tokens 👈  </a> &nbsp;
                <a href={follow_link} className="btn btn-danger"> 🎯 Continue to Contrib 👈</a> 
                </div>
            </div>
		</>
	)
}
export default Thanku
