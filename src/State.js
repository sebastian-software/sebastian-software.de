import { counterReducer } from "./modules/Counter"
import { envReducer } from "./modules/Env"

import blogContent from "./blog/list.blog.ssoft"
import { generateBlogRoutes } from "./blog"

export default {
  /**
   *
   */
  getConfig() {
    return null
  },

  /**
   * Return map of routes. Match redux actions to urls.
   */
  getRoutes() {
    const defaultRoutes = {
      HOME: "/",
      PAGE_PRODUCTS: "/produkte/",
      PAGE_CONSULTING: "/consulting/",
      PAGE_BLOG: "/blog/",
      PAGE_ABOUT: "/ueber/",

      PAGE_FASTNER: "/fastner/",
      PAGE_WERNER: "/werner/"
    }
    return {
      ...defaultRoutes,
      ...generateBlogRoutes(blogContent)
    }
  },

  /**
   * Return list of Redux store enhancers to use.
   */
  getEnhancers() {
    return []
  },

  /**
   * Create mapping of reducers to use for the Redux store.
   */
  getReducers() {
    return {
      counter: counterReducer,
      env: envReducer
    }
  },

  /**
   * Create list of Redux middleware to use.
   */
  getMiddlewares() {
    return []
  }
}
