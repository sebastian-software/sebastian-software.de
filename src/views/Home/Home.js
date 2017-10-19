import React from "react"
import { NavLink } from "redux-first-router-link"
import classnames from "classnames"

import Helmet from "../../components/layout/Helmet"
import Image from "../../components/image/Image"
import Product from "./Product"
import BlogArticleTeaser from "./BlogArticleTeaser"

import styles from "./Home.css"

import zeitungProSvg from "../../assets/images/icons/zeitungpro.svg"
import fotoProSvg from "../../assets/images/icons/fotopro.svg"
import typoProSvg from "../../assets/images/icons/typopro.svg"
import jasySvg from "../../assets/images/icons/jasy.svg"
import coreSvg from "../../assets/images/icons/core.svg"

import blogContent from "../../blog/list.blog.ssoft"

import teamWideImage from "../../assets/images/team1-wide.jpg"

const MAX_POSTS = 3

export default function Home() {
  return (
    <article>
      <Helmet title="Home" />

      <Image className={styles.teamImage} src={teamWideImage.src} alt="Team" />

      <section className={styles.section}>
        <h1 className={styles.header}>Produkte</h1>
        <div className={styles.products}>
          <Product
            title="ZeitungPro"
            desc="Publishing neu gedacht. Besserer Journa­lismus: Für heute und die Zukunft."
            link="PAGE_ZEITUNGPRO"
            icon={zeitungProSvg}
          />

          <Product
            title="FotoPro"
            desc="Unsere Antwort auf Responsive Images. Flexibel, schnell und fast automa­tisch."
            link="PAGE_FOTOPRO"
            icon={fotoProSvg}
          />

          <Product
            title="TypoPro"
            desc="Ihre eigenen Schrift­arten einfach auslie­fern. Effektive Reduktion und Kompres­sion."
            link="PAGE_TYPOPRO"
            icon={typoProSvg}
          />

          <Product
            title="Jasy"
            desc="Tooling für Web-Experten. Umfang­reiche Funktio­na­lität in Harmonie vereint."
            link="PAGE_JASY"
            icon={jasySvg}
          />

          <Product
            title="Core"
            desc="Bibliothek für einen guten Start in die Entwicklung von Web-Anwendungen."
            link="PAGE_CORE"
            icon={coreSvg}
          />
        </div>
      </section>

      <section className={styles.consulting}>
        <div className={styles.section}>
          <h1 className={styles.header}>Consulting</h1>
          <p>
            Neben der Arbeit an unseren eigenen Produkten helfen wir Ihnen auch bei der
            Reali­sierung und Begleitung Ihrer Ideen und Visionen.
          </p>
          <NavLink to={{ type: "PAGE_CONSULTING" }}>Mehr erfahren</NavLink>
        </div>
      </section>

      <section className={styles.section}>
        <NavLink to={{ type: "PAGE_BLOG" }}>
          <h1 className={classnames(styles.header, styles.blogHeader)}>Blog</h1>
        </NavLink>
        <div>
          {blogContent.slice(0, MAX_POSTS).map((item) => (
            <BlogArticleTeaser key={item.config.date} content={item} />
          ))}
        </div>
      </section>
    </article>
  )
}
