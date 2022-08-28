/** @type {import('next').NextConfig} */

// You can choose which headers to add to the list
// after learning more below.
const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'no-referrer'
  }
];


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  headers: securityHeaders,
}

module.exports = nextConfig
