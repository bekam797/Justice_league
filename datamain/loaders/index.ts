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

export async function getMenuItemData(locale: string) {
  const menuItems = await sdk.single('menu-items').find({
    fields: ['Label', 'Url', 'Order', 'Number_label'],
    sort: ['Order:asc'],
    populate: '*',
    locale: locale,
  })
  return menuItems
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

export async function getCategories(locale: string) {
  const categories = await sdk.collection('categories').find({
    fields: ['name', 'slug', 'description'],
    locale: locale,
  })
  return categories
}

export async function getBlogPostBySlug(slug: string, locale: string) {
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
      locale: locale,
    })
    return post
  } catch (error) {
    return null
  }
}

export async function getBlogPosts(
  page = 1,
  query = '',
  category = '',
  pageSize = 10,
  locale: string
) {
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
        ...(category ? { category: { name: { $eq: category } } } : {}), // Changed this line
      },
      locale: locale,
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

interface TeamResponse {
  data: {
    id: number
    title: string
    description: string
    team_members: Array<{
      id: number
      name: string
      position: string
      imageUrl: {
        url: string
      }
      description: Array<{
        children: Array<{
          text: string
        }>
      }>
    }>
    socialLinks: {
      linkedin?: string
      twitter?: string
      email?: string
    }
  }
}

export async function getTeam(locale: string): Promise<TeamResponse> {
  try {
    const params = {
      populate: {
        team_members: {
          populate: {
            imageUrl: {
              fields: ['url', 'alternativeText', 'name'],
            },
            socialLinks: {
              fields: ['linkedin', 'twitter', 'email'],
            },
          },
        },
        team_seo: {
          populate: {
            shareImage: {
              fields: ['url', 'alternativeText', 'name'],
            },
          },
        },
      },
      locale,
    }

    const team = await sdk.collection('team').find(params)
    return team as unknown as TeamResponse
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.data)
    }
    return { data: { id: 0, title: '', description: '', team_members: [], socialLinks: {} } }
  }
}

export async function getTeamMemberBySlug(
  slug: string,
  locale: string
): Promise<TeamMemberResponse> {
  try {
    const params = {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        imageUrl: {
          fields: ['url', 'alternativeText', 'name'],
        },
        socialLinks: {
          fields: ['linkedin', 'twitter', 'email'],
        },
      },
      locale,
    }

    const response = await sdk.collection('team-members').find(params)

    return response as unknown as TeamMemberResponse
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.data)
    }
    return { data: [], meta: {} }
  }
}

export async function getServices(locale: string): Promise<ServicesResponse> {
  try {
    const params = {
      populate: {
        services: {
          populate: ['image', 'service_content', 'seo'],
        },
      },
      locale,
    }

    const services = await sdk.single('service-page').find(params)
    return services as unknown as ServicesResponse
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.data)
    }
    return {
      data: {
        id: 0,
        title: '',
        description: '',
        services: [],
        createdAt: '',
        documentId: '',
        locale: '',
        publishedAt: '',
        updatedAt: '',
      },
      meta: {},
    }
  }
}

export async function getServicesBySlug(slug: string, locale: string) {
  try {
    const params = {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'name'],
        },
        service_content: true, // Note: keeping the typo as it appears in the API schema
        seo: {
          populate: {
            shareImage: {
              fields: ['url', 'alternativeText', 'name'],
            },
          },
        },
      },
      locale,
    }

    const service = await sdk.collection('services').find(params)

    console.log(service, 'service')
    return service
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.data)
    }
    return { data: [], meta: {} }
  }
}

interface ContactDetail {
  id: number
  label: string
  value: string
}

interface ContactPageResponse {
  data: {
    id: number
    documentId: string
    title: string
    address: string
    nameLabel: string
    surnameLabel: string
    emailLabel: string
    messageLabel: string
    submitButtonText: string
    contactDetails: ContactDetail[]
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
  }
  meta: Record<string, unknown>
}

export async function getContactPage(locale: string): Promise<ContactPageResponse> {
  try {
    const params = {
      populate: '*',
      locale,
    }

    const contactPage = await sdk.single('contact-page').find(params)
    return contactPage as unknown as ContactPageResponse
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response)
    }
    return {
      data: {
        id: 0,
        documentId: '',
        title: '',
        address: '',
        nameLabel: '',
        surnameLabel: '',
        emailLabel: '',
        messageLabel: '',
        submitButtonText: '',
        contactDetails: [],
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        locale: '',
      },
      meta: {},
    }
  }
}
