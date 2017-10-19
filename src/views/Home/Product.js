import React from "react"
import PropTypes from "prop-types"

import styles from "./Product.css"

export default function Product({ title, desc, link, icon, alt }) {
  return (
    <div className={styles.product}>
      <header className={styles.header}>
        <img className={styles.icon} alt={alt} width="32" height="32" src={icon} />
        <h3 className={styles.title}>{title}</h3>
      </header>
      <div className={styles.content}>
        {desc}
      </div>
    </div>
  )
}
Product.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}
