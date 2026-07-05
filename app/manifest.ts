import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Swamy's Hot Foods",
    short_name: 'Swamy Hot Foods',
    description: 'Experience the finest South Indian delicacies, traditional recipes, and authentic flavors at Swamy\'s Hot Foods.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfcfb', // --color-neutral-50 from globals.css
    theme_color: '#22c55e',      // --color-green-500 from globals.css
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
