import Navigation from "../components/navigation";
import Hero from "../components/hero";
import Gallery from "../components/gallery";
import Biography from "../components/biography";
import Footer from "../components/footer";
import { getData, getDomain, getTopsites, getScript } from "../lib/data";

export default async function Home() {
  const c = await getData();
  const domain = getDomain();
  const topDomains = await getTopsites();
  const background =
    c.data.background_url !== undefined && c.data.background_url !== null
      ? c.data.background_url
      : "https://cdn.vnoc.com/background/tech4.jpg";
  const description = c.data.description;
  const title = c.data.title;
  const twitter_url = c.data.twitter;
  const fb_url = c.data.fb;
  const linkedin_url = c.data.linkedin;
  const follow_link = "https://www.contrib.com/signup/follow/" + domain;
  const html = await getScript(
    "https://e7lq80c199.execute-api.us-west-2.amazonaws.com/api1?key=5c1bde69a9e783c7edc2e603d8b25023&request=getcontent&url=" +
      domain
  );

  return (
    <>
      <Navigation domain={domain} />
      <Hero domain={domain} />
      <Gallery domain={domain} />
      <Biography domain={domain} />
      <Footer domain={domain} />
    </>
  );
}
