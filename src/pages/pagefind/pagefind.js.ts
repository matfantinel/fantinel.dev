// This file is here as a placeholder just to stop the dev server
// from screaming at you during development.
// On build, the real pagefind file will be created on the same path
// And will take preference over this file.
// Source: https://blog.otterlord.dev/posts/astro-search/

import type { APIContext } from "astro"
import type { Pagefind, PagefindResult, PagefindResultFragment } from '@schemas/global';
import { LoremIpsum } from "@utils/lorem-ipsum";

export async function GET({ }: APIContext) {
  // You can add here any test result data you want.  

  return new Response(
    `export const search = () => {return {
      results: [
        {
          id: '1',
          data: () => Promise.resolve({
            title: 'Result 1',
            url: '/result-1',
            excerpt: 'Do ut officia reprehenderit. Aute aliquip qui sit qui pariatur est fugiat velit tempor labore laboris aute. Nisi labore adipisicing adipisicing esse enim. Ipsum consequat laborum cupidatat aliqua cupidatat cupidatat elit incididunt minim tempor do dolor. Excepteur tempor magna deserunt proident incididunt laborum.',
          })
        },
        {
          id: '2',
          data: () => Promise.resolve({
            title: 'Result 2',
            url: '/result-2',
            excerpt: 'Cillum fugiat excepteur non est minim qui sit est officia excepteur ipsum.',
          })
        },
        {
          id: '3',
          data: () => Promise.resolve({
            title: 'Result 3',
            url: '/result-3',
            excerpt: 'Do ut officia reprehenderit. Aute aliquip qui sit qui pariatur est fugiat velit tempor labore laboris aute. Nisi labore adipisicing adipisicing esse enim. Ipsum consequat laborum cupidatat aliqua cupidatat cupidatat elit incididunt minim tempor do dolor.',
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