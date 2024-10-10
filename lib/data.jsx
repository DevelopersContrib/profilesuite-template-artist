import { headers } from "next/headers";
import axios from "axios";
let DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL;

export function getDomain() {
  const headersList = headers();
  const referrer = headersList.get("host");
  const domainName = referrer.includes("localhost")
    ? DOMAIN
    : referrer.replace("www.", "");
  return domainName;
}

export async function getData() {
  const domain = getDomain();
  const url = process.env.CONTRIB_API1+`&domain=${domain}`
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getTopsites() {
  const domain = getDomain();
  const url = process.env.CONTRIB_API1_TOPSITES+`&domain=${domain}`
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getScript(url) {
  try {
    const res = await axios.get(url);
    return res.data.data.content;
  } catch (e) {
    console.log("error getScript", e);
    return { error: "error getScript" };
  }
}

export async function getBlogs() {
  const domain = getDomain();
  const url = process.env.GET_BLOGS+`&domain=${domain}`
  const res = await fetch(url, { next: { revalidate: 0 } });
 
  
  if (!res.ok){
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
  }

  return res.json();
}