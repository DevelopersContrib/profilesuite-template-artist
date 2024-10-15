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


export async function getProfile() {
  const domain = getDomain();
  const url = process.env.GET_PROFILE+`&domain=${domain}`
  const res = await fetch(url, { next: { revalidate: 600 } });
 
  
  if (!res.ok){
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
  }

  return res.json();
}


export async function updateProfile() {
  const domain = getDomain();
  const url = process.env.UPDATE_PROFILE+`&domain=${domain}`
  const res = await fetch(url, { next: { revalidate: 600 } });
 
  
  if (!res.ok){
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
  }

  return res.json();
}