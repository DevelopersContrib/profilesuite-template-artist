"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const BlogSection = () => {
  const [blogPosts, setBlogs] = useState([]);

  const src = "data:image/jpeg;base64,";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blogs", {
          next: { revalidate: 0 },
        });
        if (response.ok) {
          const res = await response.json();
          setBlogs(res.blogs);
        } else {
          alert("An error occurred");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {blogPosts.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h2 className="tw-font-bold tw-text-3xl mb-4">Latest Blogs</h2>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {blogPosts.length > 0 ? (
          blogPosts.map((post, index) => (
            <a
              className="col-md-4 mb-4"
              key={index}
              href={`/blog/${post.slug + "---" + post.id}`}
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              <div className="card h-100">
                <Image
                  src={post.image_url}
                  alt={post.image_caption}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="card-img-top tw-w-[300px] tw-h-[200px] tw-object-cover"
                />
                <div className="card-body p-4">
                  <h5 className="card-title">{post.title}</h5>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
