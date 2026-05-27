// This file is here as a placeholder just to stop the dev server
// from screaming at you during development.
// On build, the real pagefind file will be created on the same path
// And will take preference over this file.
// Source: https://blog.otterlord.dev/posts/astro-search/

import type { APIContext } from "astro";

export async function GET({ }: APIContext) {
  // You can add here any test result data you want.  

  return new Response(
    `export const search = () => {return {
      results: [
        {
          id: '1',
          data: () => Promise.resolve({
            meta: {
              image: '/cms/optimized-media/articles/arc-browser-replacement-cover.png',
              image_alt: 'Person holding hands with the Arc icon at a crossroads. To the right, a dark castle in a storm with the major browser logos. To the left, a castle in the sunset with the Vivaldi logo sneaking behind it.',
              title: 'The Quest for a Good Arc Replacement'
            },
            url: '/blog/arc-browser-replacement/',
            excerpt: 'Do ut officia reprehenderit. Aute aliquip <mark>test</mark> qui sit qui pariatur est fugiat velit tempor labore laboris aute. Nisi labore adipisicing adipisicing esse enim. Ipsum consequat laborum cupidatat aliqua cupidatat cupidatat elit incididunt minim tempor do dolor. Excepteur tempor magna deserunt proident incididunt laborum.',
            sub_results: [
              {
                title: 'The Quest for a Good Arc Replacement',
                url: '/blog/arc-browser-replacement/',
                weighted_locations: [{ 'weight': 0.041666666666666664, 'balanced_score': 1, 'location': 33 }],
                locations: [33],
                excerpt: 'Table of Contents. Why do I need a replacement? Most options are just a no-no. <mark>Vivaldi</mark> (not the composer). Criteria One: The Looks. Criteria Two: The Clacks. Criteria Three: The'
              }
            ]
          })
        },
        {
          id: '2',
          data: () => Promise.resolve({
            meta: {
              image: 'https://fantinel.dev/cms/media/articles/cool-links-cover.png',
              image_alt: 'Cool Link: Wallpaper Theme Converter',
              title: 'Cool Link: Wallpaper Theme Converter'
            },
            url: '/cool-links/wallpaper-theme-converter/',
            excerpt: 'using that theme on the apps that allow me to, like Obsidian, VS Code and <mark>Vivaldi.</mark> To match all of that, I need some wallpapers that fit the palette too.',
          })
        },
        {
          id: '3',
          data: () => Promise.resolve({
            meta: {
              image: 'https://m.media-amazon.com/images/M/MV5BZmM3ZDU3ODItZmY5Yi00OTQ2LWE5OTctZTA5NDBhMWJkOGY3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
              image_alt: 'Cover of The Devil Wears Prada 2',
              title: 'Quick Review: The Devil Wears Prada 2'
            },
            url: '/quick-reviews/the-devil-wears-prada-2/',
            excerpt: 'Quick Review: The Devil Wears Prada 2. View all Quick Reviews Download Review The Devil Wears <mark>Prada</mark> 2. 2026, David Frankel. Reviewed on May 01, 2026. Didn’t like it. Decent.',
          })
        },
        {
          id: '4',
          data: () => Promise.resolve({
            meta: {
              image: '/cms/optimized-media/photographies/basilica-sant-andrea-vercelli.png',
              image_alt: 'A big medieval-looking tower stands tall over the cloister of the basilica, seen through an ornate archway.',
              title: 'Photography: Basilica di Sant’Andrea'
            },
            url: '/photography/basilica-sant-andrea-vercelli/',
            excerpt: 'Photography This basilica was built in 1227 (though the cloister in the picture was rebuilt in the 1400s), and has largely stayed the same since then. Taken in <mark>Vercelli,</mark> Italy.',
          })
        }
      ]
    }}`,
    {
      headers: {
        "Content-Type": "application/javascript",
      },
    }
  )
}