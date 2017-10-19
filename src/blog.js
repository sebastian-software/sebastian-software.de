// filename is 2015-08-12-something.md
const NAME_POSITION = 11
const DATE_LENGTH = 7

function generateDescriptor(blogEntry) {
  return blogEntry.name
    .substring(NAME_POSITION)
    .toUpperCase()
    .replace(".MD", "")
    .replace(/"/g, "")
    .replace(/Ü/g, "UE")
    .replace(/Ö/g, "OE")
    .replace(/'/g, "AE")
    .replace(/([^A-Z0-9-_])/g, "-")
    .replace(/--+/g, "-")
}

export function getBlogRouteDescriptor(blogEntry) {
  return `BLOG_${generateDescriptor(blogEntry)}`
}

function sanitizeUrl(blogEntry) {
  const title = generateDescriptor(blogEntry).toLowerCase()
  const date = blogEntry.name.substring(0, DATE_LENGTH)

  return `/blog/${date}/${title}/`
}

export function generateBlogRoutes(blog) {
  return blog.reduce((obj, blogEntry) => {
    const descriptor = getBlogRouteDescriptor(blogEntry)
    const url = sanitizeUrl(blogEntry)

    /* eslint-disable-next-line security/detect-object-injection */
    obj[descriptor] = url

    return obj
  }, {})
}

export function generateBlogLoaders(blog) {
  return blog.map((blogEntry) => ({
    descriptor: getBlogRouteDescriptor(blogEntry),
    loader: blogEntry.load
  }))
}
