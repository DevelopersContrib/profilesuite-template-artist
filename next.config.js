/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/partner',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/about',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/contact',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=3600',
          },
        ],
      },
    ];
  },
  images: {
    domains: ['cdn.vnoc.com', 'vnoclogos.s3-us-west-1.amazonaws.com','vnocimages.s3.amazonaws.com', 'tools.contrib.com','projectcafe.com', 'contrib.com','vnoclogos.s3-us-west-1.amazonaws.com','vnoclogos.s3.amazonaws.com','vbot-images.s3.us-east-1.amazonaws.com','images.pexels.com','www.profilesuite.com'],
  },
}

module.exports = nextConfig
