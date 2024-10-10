import HeaderWidget from "@/components/HeaderWidget";
import Footer from "@/components/footer";
import { getBlogPostById } from "@/sanity/sanity-utils";
import { getData, getDomain } from "@/lib/data";

const getBlogId = (params) => {
  const id = params.split("---")[1];
  return id;
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = getBlogId(slug);
  const domain = getDomain();
  if (domain) {
    const post = await getBlogPostById(id, domain);

    if (post) {
      return {
        title: post.title,
        description: post.title,
      };
    }
  }
}

const BlogDetails = async ({ params }) => {
  const { slug } = params;
  const id = getBlogId(slug);
  const domain = getDomain();
  const c = await getData();
  const post = await getBlogPostById(id, domain);
  const twitter_url = c.data.twitter;
  const fb_url = c.data.fb;
  const linkedin_url = c.data.linkedin;
  if (post) {
    return (
      <>
        <HeaderWidget
          domain={domain}
          piwikId={c.data.piwikId}
          accountGA={c.data.accountGA}
          adsenseClientId={c.data.adsenseClientId}
        />
        <section className="tw-min-h-screen tw-py-16">
          <div className="container ">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="custom-blog-content"
            />
          </div>
        </section>
        <Footer
          domain={domain}
          twitter_url={twitter_url}
          fb_url={fb_url}
          linkedin_url={linkedin_url}
        />
      </>
    );
  }
};
export default BlogDetails;
