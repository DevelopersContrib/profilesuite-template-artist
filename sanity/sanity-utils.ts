
export async function getBlogPostById(id: number, domain: string) {
    const url = process.env.GET_BLOGS+`&domain=${domain}&id=${id}`;
    console.log('url',url)
    const res = await fetch(url, { next: { revalidate: 3600 } });
   if (!res.ok){
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }
   
    const blogs = await res.json();
    return blogs.data[0];
  }