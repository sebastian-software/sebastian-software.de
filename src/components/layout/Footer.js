import React from "react"

import styles from "./Footer.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <div className={styles.firstFooter}>
          <div className={styles.col}>
            <div>Gemacht mit <span className={styles.heart}>♥</span> in Mainz und Heidelberg</div>
            <div>&nbsp;</div>
            <div>Kontakt</div>
            <div>Impressum</div>
            <div>Datenschutz</div>
            <div>Drucken</div>
          </div>
          <div className={styles.col}>
            <div>Sebastian Software GmbH</div>
            <div>Dalheimer Str. 12</div>
            <div>55128 Mainz</div>
            <div>&nbsp;</div>
            <div>Telefon: +49 6131 9729 830</div>
            <div>E-Mail: info@sebastian-software.de</div>
          </div>
        </div>
      </section>
      <section className={styles.copyright}>
        <div className={styles.secondFooter}>
          &copy; 2017 Sebastian Software GmbH
        </div>
      </section>
    </footer>
  )
}
