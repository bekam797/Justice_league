import sdk from '../../lib/sdk'
const PAGE_SIZE = 3

export async function getGlobalPageData() {
  const landingPage = await sdk.single('global').find({
    populate: {
      topNav: {
        populate: '*',
      },
      footer: {
        populate: '*',
      },
    },
  })
  return landingPage
}

export async function getLandingPage() {
  const landingPage = await sdk.single('landing-page').find({
    populate: {
      blocks: {
        on: {
          'layout.hero': {
            populate: {
              image: {
                fields: ['url', 'alternativeText', 'name'],
              },
              buttonLink: {
                populate: '*',
              },
              topLink: {
                populate: '*',
              },
            },
          },
          'layout.card-grid': {
            populate: '*',
          },
          'layout.section-heading': {
            populate: '*',
          },
          'layout.content-with-image': {
            populate: {
              image: {
                fields: ['url', 'alternativeText', 'name'],
              },
            },
          },
          'layout.price-grid': {
            populate: {
              priceCard: {
                populate: '*',
              },
            },
          },
        },
      },
    },
  })
  return landingPage
}

export async function getAllPagesSlugs() {
  const pages = await sdk.collection('pages').find({
    fields: ['slug'],
  })
  return pages
}

export async function getPageBySlug(slug: string, status: string) {
  const page = await sdk.collection('pages').find({
    populate: {
      blocks: {
        on: {
          'layout.hero': {
            populate: {
              image: {
                fields: ['url', 'alternativeText', 'name'],
              },
              buttonLink: {
                populate: '*',
              },
              topLink: {
                populate: '*',
              },
            },
          },
          'layout.card-grid': {
            populate: '*',
          },
          'layout.section-heading': {
            populate: '*',
          },
          'layout.content-with-image': {
            populate: {
              image: {
                fields: ['url', 'alternativeText', 'name'],
              },
            },
          },
        },
      },
    },
    filters: {
      slug: slug,
    },
    status: status as 'draft' | 'published' | undefined,
  })
  return page
}

export async function getCategories() {
  const categories = await sdk.collection('categories').find({
    fields: ['name', 'slug', 'description'],
  })
  return categories
}

export async function getBlogPostBySlug(slug: string, status: string) {
  try {
    const post = await sdk.collection('articles').find({
      populate: {
        cover: {
          fields: ['url', 'alternativeText'],
        },
        author: {
          populate: {
            avatar: {
              fields: ['url', 'alternativeText'],
            },
          },
          fields: ['name'],
        },
        category: {
          fields: ['name', 'slug'],
        },
        blocks: {
          on: {
            'shared.media': {
              populate: {
                file: {
                  fields: ['url', 'alternativeText'],
                },
              },
            },
            'shared.rich-text': {
              fields: ['body'],
            },
            'shared.quote': {
              fields: ['title', 'body'],
            },
            'shared.slider': {
              populate: {
                files: {
                  fields: ['url', 'alternativeText'],
                },
              },
            },
          },
        },
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
    })
    return post
  } catch (error) {
    return null
  }
}

export async function getBlogPosts(page = 1, query = '', category = '', pageSize = 10) {
  try {
    const params = {
      populate: {
        cover: {
          fields: ['url', 'alternativeText'],
        },
        category: {
          fields: ['name', 'slug'],
        },
        author: {
          fields: ['name'],
        },
      },
      sort: ['featured:desc', 'publishedAt:desc'],
      pagination: {
        pageSize: pageSize,
        page: page,
      },
      filters: {
        ...(query
          ? {
              $or: [{ title: { $containsi: query } }, { description: { $containsi: query } }],
            }
          : {}),
        ...(category ? { category: { slug: { $eq: category } } } : {}),
      },
    }

    const posts = await sdk.collection('articles').find(params)

    return posts
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.data)
    }
    return { data: [], meta: { pagination: { pageCount: 0 } } }
  }
}
