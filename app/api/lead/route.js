import axios from 'axios'

export const POST = async (request) => {
	const data = await request.json();
	const domain = data.domain;

	try {
		const params = new URLSearchParams();
			params.append('domain', data.domain);
			params.append('email', data.email);
			params.append('secret',data.domain+data.email);
			//console.log('params are:');

			
			const saveLeads = await axios.post('https://www.contrib.com/forms/saveleads', params);
			//console.log(saveLeads)
			//console.log('lead submit return is');
			//console.log(saveLeads.data);
			
			if(saveLeads.data.success){
				return new Response(JSON.stringify({status:true, lead:saveLeads.data, email:data.email}), { status: 201 })
			}else{
				
				return new Response(JSON.stringify({status:false,result:saveLeads.data.success,error:"Failed to save Lead"}), { status: 201 });
			}

	} catch (error) {
			console.log('error',error)
			return new Response("An error occurred", { status: 500 });
	}
}