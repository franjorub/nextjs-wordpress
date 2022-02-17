export type Post = {
    id: number,
    date: string,
    date_gmt: string,
    guid: { rendered: string },
    modified: string,
    modified_gmt: string,
    slug: string,
    status: string,
    type: 'post',
    link: string,
    title: { rendered: string },
    content: {
      rendered: string,
      protected: boolean
    },
    excerpt: {
      rendered: string,
      protected: boolean
    },
    author: number,
    featured_media: number,
    comment_status: string,
    ping_status: string,
    sticky: boolean,
    template: string,
    format: string,
    meta: { _mi_skip_tracking: boolean },
    categories: number[],
    tags: [],
    _links: {
      self: [],
      collection: [],
      about: [],
      author: [],
      replies: [],
      'version-history': [],
      'wp:attachment': [],
      'wp:term': [],
      curies: []
    }
  }