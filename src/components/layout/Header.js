import React from "react"
import { NavLink } from "redux-first-router-link"

import styles from "./Header.css"

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <NavLink to={{ type: "HOME" }}>
        <div className={styles.strap}>
          <div className={styles.logo} />
          <h1 className={styles.text}>
            Sebastian Software&#8203;
            <small className={styles.smallText}>Erfahrung · Klarheit · Begeis&shy;terung</small>
          </h1>
        </div>
      </NavLink>
    </header>
  )
}
