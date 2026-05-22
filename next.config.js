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
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.vnoc.com' },
      { protocol: 'https', hostname: 'vnoclogos.s3-us-west-1.amazonaws.com' },
      { protocol: 'https', hostname: 'vnocimages.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'tools.contrib.com' },
      { protocol: 'https', hostname: 'projectcafe.com' },
      { protocol: 'https', hostname: 'contrib.com' },
      { protocol: 'https', hostname: 'vnoclogos.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'vbot-images.s3.us-east-1.amazonaws.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'www.profilesuite.com' },
      { protocol: 'https', hostname: 'profilesuite-assets.s3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
}

module.exports = nextConfig
