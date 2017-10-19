import React from "react"
import universal from "react-universal-component"
import { NOT_FOUND } from "redux-first-router"
import { ensureIntlSupport, ensureReactIntlSupport, routed } from "edge-core"
import classnames from "classnames/bind"

import Styles from "./Application.css"

import Navigation from "./components/navigation/Navigation"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Article from "./components/blog/Article"

import blogContent from "./blog/list.blog.ssoft"
import { generateBlogLoaders } from "./blog"

const Classes = classnames.bind(Styles)

/* eslint-disable no-console */

const HomeRoute = routed(
  universal(() => import("./views/Home/Home")),
  "HOME"
)

const CounterRoute = routed(
  universal(() => import("./views/Blog/Blog")),
  "PAGE_BLOG"
)

const LocalizationRoute = routed(
  universal(() => import("./views/Localization/Localization")),
  "LOCALIZATION"
)

const MissingRoute = routed(
  universal(() => import("./views/Missing/Missing")),
  NOT_FOUND
)

const blogRoutes = generateBlogLoaders(blogContent).map((loaderEntry) => {
  const Route = routed(
    () => (<Article loader={loaderEntry.loader} />),
    loaderEntry.descriptor
  )

  Route.id = loaderEntry.descriptor

  return Route
})


export function prepare(kernel) {
  const intl = kernel.intl
  return Promise.all([
    ensureIntlSupport(import(`lean-intl/locale-data/${intl.locale}`), intl),
    ensureReactIntlSupport(import(`react-intl/locale-data/${intl.language}`), intl)
  ])
}

/* eslint-disable react/prefer-stateless-function */
class Application extends React.Component {
  state = {
    alive: false
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({
        alive: true
      })
    })
  }

  render() {
    return (
      <div className={Classes("root", { alive: this.state.alive })}>
        <Header />
        <Navigation />

        <main className={Styles.content}>
          <HomeRoute />
          <CounterRoute />
          <LocalizationRoute />
          <MissingRoute />

          {blogRoutes.map((Item) => {
            return (<Item key={Item.id} />)
          })}
        </main>

        <Footer />
      </div>
    )
  }
}

export default Application
