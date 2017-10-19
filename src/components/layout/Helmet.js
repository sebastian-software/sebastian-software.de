/* eslint-disable max-len */
import React from "react"
import HelmetComp from "react-helmet"
import PropTypes from "prop-types"

/*
header from old sebastian-software.de


<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script>var _sf_startpt=(new Date()).getTime()
</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,maximum-scale=1,minimum-scale=1,initial-scale=1">
<meta name="HandheldFriendly" content="True">
<meta name="MobileOptimized" content="320">
<meta http-equiv="cleartype" content="on">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="apple-mobile-web-app-capable" content="no">
<meta property="Accept-CH" content="DPR, Width, Viewport-Width">
<title>Sebastian Software - Sebastian Software GmbH
</title>
<meta name="description" content="Software und Consulting aus Mainz und Heidelberg. Unsere Spezialgebiete: Web-Anwendungen, Responsive Design, Typografie, Tooling- und Deployment-Lösungen.
">
<link rel="stylesheet" href="/assets/landscape.css" media="screen and (orientation: landscape) and (min-width: 40em) and (min-aspect-ratio: 2/3)">
<link rel="stylesheet" href="/assets/portrait.css" media="not screen and (orientation: landscape) and (min-width: 40em) and (min-aspect-ratio: 2/3)">
<link rel="stylesheet" href="/assets/portrait.css" media="print">
<link rel="stylesheet" href="/assets/print.css" media="print">
<link rel="canonical" href="https://sebastian-software.de/">
<link rel="alternate" type="application/rss+xml" title="Sebastian Software GmbH" href="/feed.xml">
<link rel="preconnect" href="//sebastian-software.imgix.net">
<meta property="og:locale" content="de_DE">
<meta property="og:type" content="article">
<meta property="og:title" content="Sebastian Software">
<meta property="og:image" content="/apple-touch-icon-180x180.png">
<meta property="og:image:width" content="180">
<meta property="og:image:height" content="180">
<meta property="og:description" content="Software und Consulting aus Mainz und Heidelberg. Unsere Spezialgebiete: Web-Anwendungen, Responsive Design, Typografie, Tooling- und Deployment-Lösungen.
">
<meta property="og:url" content="https://sebastian-software.de/">
<meta property="og:site_name" content="Sebastian Software GmbH">
<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#70164f">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<meta name="theme-color" content="#ffffff">
<script src="/assets/boot.js">
</script>
</head>
*/

export default function Helmet({
  title
}) {
  return (
    <HelmetComp titleTemplate="Sebastian Software - %s">
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,maximum-scale=1,minimum-scale=1,initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content="Software und Consulting aus Mainz und Heidelberg. Unsere Spezialgebiete: Web-Anwendungen, Responsive Design, Typografie, Tooling- und Deployment-Lösungen." />
      <link rel="canonical" href="https://www.sebastian-software.de/" />
      <link rel="alternate" type="application/rss+xml" title="Sebastian Software GmbH" href="/feed.xml" />
      <link rel="preconnect" href="//sebastian-software.imgix.net" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="Sebastian Software" />
      <meta property="og:image" content="/apple-touch-icon-180x180.png" />
      <meta property="og:image:width" content="180" />
      <meta property="og:image:height" content="180" />
      <meta property="og:description" content="Software und Consulting aus Mainz und Heidelberg. Unsere Spezialgebiete: Web-Anwendungen, Responsive Design, Typografie, Tooling- und Deployment-Lösungen." />
      <meta property="og:url" content="https://www.sebastian-software.de/" />
      <meta property="og:site_name" content="Sebastian Software GmbH" />
    </HelmetComp>
  )
}
Helmet.propTypes = {
  title: PropTypes.string.isRequired
}
