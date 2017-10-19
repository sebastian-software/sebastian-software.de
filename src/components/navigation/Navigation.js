import React from "react"
import { NavLink } from "redux-first-router-link"

import styles from "./Navigation.css"

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.container}>
        <li className={styles.navelement}>
          <NavLink to={{ type: "PAGE_PRODUCTS" }}>
            <span className={styles.name}>
              Produkte
            </span>
            <span className={styles.desc}>
              Anspruchs­volle Lösungen mit Mut und Liebe entwi­ckelt.
            </span>
          </NavLink>
        </li>
        <li className={styles.navelement}>
          <NavLink to={{ type: "PAGE_CONSULTING" }}>
            <span className={styles.name}>
              Consulting
            </span>
            <span className={styles.desc}>
              Beratung, Archi­tektur und Entwicklung für Ihren Erfolg.
            </span>
          </NavLink>
        </li>
        <li className={styles.navelement}>
          <NavLink to={{ type: "PAGE_BLOG" }}>
            <span className={styles.name}>
              Blog
            </span>
            <span className={styles.desc}>
              Wir teilen unsere Gedanken zu Markt und Techno­logie.
            </span>
          </NavLink>
        </li>
        <li className={styles.navelement}>
          <NavLink to={{ type: "PAGE_ABOUT" }}>
            <span className={styles.name}>
              Über
            </span>
            <span className={styles.desc}>
              Begehrte Kunden, detail­lierte Profile und mehr.
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
