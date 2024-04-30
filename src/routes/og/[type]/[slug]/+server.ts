import type { RequestHandler } from "@sveltejs/kit";
import { ImageResponse } from '@vercel/og';
import { read } from '$app/server';

import { getPostBySlug } from "$lib/data/blog-posts/api";
import { siteBaseUrl } from '$lib/data/meta';
import dateformat from 'dateformat';

import fixelBold from '$lib/opengraph/fonts/FixelText-Bold.otf';
import fixelBlack from '$lib/opengraph/fonts/FixelText-Black.otf';
const fixelBoldData = read(fixelBold).arrayBuffer();
const fixelBlackData = read(fixelBlack).arrayBuffer();

export const config = {
  runtime: 'edge',
};

export const GET: RequestHandler = async ({ params }) => {
  const { type, slug } = params;

  if (!slug) {
    return new Response('Not found', { status: 404 });
  }

  if (type === 'post' && slug) {
    const post = await getPostBySlug(slug);
    if (!post) {
      return new Response('Not found', { status: 404 });
    }

    const response = new ImageResponse(
      {
        type: 'div',
        key: 'main',
        props: {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#f4f8fb',
            fontFamily: 'Fixel'
          },
          children: [
            {
              type: 'div',
              key: 'background',
              props: {
                style: {
                  //backgroundImage: `url(${siteBaseUrl}/images/opengraph-background.png)`,
                  backgroundImage: `url(http://localhost:5173/images/opengraph-background.png)`,
                  backgroundSize: '1200px 630px',
                  backgroundRepeat: 'no-repeat',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }
              }
            },
            {
              type: 'h1',
              key: 'title',
              props: {
                style: {
                  padding: '40px',
                  fontSize: '90px',
                  lineHeight: '1.5',
                  zIndex: 1,
                  textWrap: 'balance',
                  fontFamily: 'Fixel Black'
                },
                children: post.title
              }
            },
            {
              type: 'div',
              key: 'bottom-section',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                  left: 0,
                  zIndex: 2
                },
                children: [
                  {
                    type: 'div',
                    key: 'list',
                    props: {
                      style: {
                        display: 'flex',
                        margin: '20px 40px 40px',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '40px',
                        flex: 1
                      },
                      children: [
                        {
                          type: 'img',
                          key: 'logo',
                          props: {
                            src: `${siteBaseUrl}/logos/Full Logo.svg`,
                            alt: 'Logo',
                            style: {
                              width: '285px',
                              height: '50px',
                            }
                          }
                        },
                        {
                          type: 'div',
                          key: 'site-domain',
                          props: {
                            style: {
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              fontSize: '28px',
                              fontWeight: 600,
                            },
                            children: [
                              {
                                type: 'img',
                                key: 'icon',
                                props: {
                                  // src: `${siteBaseUrl}/images/opengraph-domain-icon.svg`,
                                  src: `http://localhost:5173/images/opengraph-domain-icon.svg`,
                                  alt: 'Domain',
                                  style: {
                                    width: '24px',
                                    height: '24px',
                                  }
                                }
                              },
                              {
                                type: 'span',
                                key: 'domain',
                                props: {
                                  children: 'fantinel.dev',
                                }
                              }
                            ]
                          }
                        },
                        {
                          type: 'div',
                          key: 'date',
                          props: {
                            style: {
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              fontSize: '28px',
                              fontWeight: 600,
                            },
                            children: dateformat(post.date, 'UTC:dd mmm yyyy')
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'img',
                    key: 'avatar',
                    props: {
                      // src: `${siteBaseUrl}/images/opengraph-avatar.png`,
                      src: `http://localhost:5173/images/opengraph-avatar.png`,
                      style: {
                        width: '300px',
                        height: '300px',
                      }
                    }
                  }
                ]
              }
            }
          ],
        }
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Fixel',
            data: await fixelBoldData,
            style: 'normal'
          },
          {
            name: 'Fixel Black',
            data: await fixelBlackData,
            style: 'normal'
          }
        ]
      },
    )

    return response;
  }

  return new Response('Not found', { status: 404 });
};
