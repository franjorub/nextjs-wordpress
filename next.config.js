/** @type {import('next').NextConfig} */

const { withPlaiceholder } = require('@plaiceholder/next')

module.exports = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: ['wordpress-headless.000webhostapp.com'],
  },
})
