/* eslint-disable */

const loaderUtils = require("loader-utils")
const path = require("path")
const fs = require("fs")

function cleanUpAbstract(content) {
  let newContent = content

  while (newContent[0] === "\n") {
    newContent = newContent.substring(1)
  }

  while (newContent[newContent.length-1] === "\n") {
    newContent = newContent.substring(0, newContent.length-1)
  }

  return newContent
}

function parseConfig(content) {
  const items = content.split("\n")

  return items.filter((item) => item.length > 1).reduce((obj, current) => {
    const splittedItem = current.split(":")

    const key = splittedItem.shift()
    const content = splittedItem.join(":")

    obj[key.trim()] = content.trim()

    return obj
  }, {})
}

function createBlogList(self) {
  var callback = self.async();

  const blogPostPath = self.context

  fs.readdir(blogPostPath, (err, files) => {
    if (err)
      return callback(err)

    const blogPosts = files.filter((name) => name.endsWith(".md"))

    const contents = blogPosts.map((name) => {
      const filename = path.join(blogPostPath, name)
      self.addDependency(filename)
      return {
        content: fs.readFileSync(filename, "utf8"),
        filename: name
      }
    }).map((data) => {
      const name = data.filename
      const splittedContent = data.content.split(/(---|<!--mehr-->)/)

      const config = parseConfig(splittedContent[2])
      const abstract = cleanUpAbstract(splittedContent[4])

      return {
        config,
        abstract,
        name,
        load: `___BEGINLOAD___() => import('./${name}')___ENDLOAD___`
      }
    }).sort((a, b) => {
      const aDate = new Date(a.config.date)
      const bDate = new Date(b.config.date)

      return bDate - aDate
    })

    // if (this.cacheable) this.cacheable();

    const value = JSON.stringify(contents)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/"___BEGINLOAD___/g, "") // Make import a javascript instruction and not a string
      .replace(/___ENDLOAD___"/g, "")

    return callback(null, `module.exports = ${value}`)
  })

  return
}

function contentParser(self, source) {
  return source.split("---").slice(2).join("---").replace(/<!--mehr-->/g, "")
}

module.exports = function(source) {
  if (this.query.type === "index")
    return createBlogList(this)

  if (this.query.type === "content")
    return contentParser(this, source)

  this.emitError("Please specify type of blog parser")
}
