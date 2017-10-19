/* eslint-disable react/no-danger */
import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "redux-first-router-link"

import { getBlogRouteDescriptor } from "../../blog"

import styles from "./BlogArticleTeaser.css"

const MONTH_MAP = [
  "Januar",
  "Feburar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
]

function formatDate(date) {
  const dateObj = new Date(date)

  return `${dateObj.getDate()}. ${MONTH_MAP[dateObj.getMonth()]} ${dateObj.getFullYear()}`
}

function formatAuthor(id) {
  if (id === "werner")
    return (<NavLink to={{ type: "PAGE_WERNER" }}>Sebastian Werner</NavLink>)
  else if (id === "fastner")
    return (<NavLink to={{ type: "PAGE_FASTNER" }}>Sebastian Fastner</NavLink>)

  return (<div />)
}

export default function BlogArticleTeaser({ content }) {
  return (
    <div className={styles.article}>
      <div className={styles.meta}>
        Von<br />
        {formatAuthor(content.config.author)}<br />
        {formatDate(content.config.date)}
      </div>
      <div className={styles.content}>
        <header>
          <NavLink to={{ type: getBlogRouteDescriptor(content) }}>
            {content.config.title.replace(/"/g, "")}
          </NavLink>
        </header>
        <p dangerouslySetInnerHTML={{ __html: content.abstract }} />
        <footer>
          <NavLink to={{ type: getBlogRouteDescriptor(content) }}>
            Weiterlesen...
          </NavLink>
        </footer>
      </div>
    </div>
  )
}
BlogArticleTeaser.propTypes = {
  content: PropTypes.object.isRequired
}
