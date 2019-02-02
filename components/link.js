import React from 'react'
import Hyperlink from 'react-native-hyperlink'
import styles from '../styles'
import links from '../i18n/en/links'

export default function Link(props) {
  return (
    <Hyperlink
      linkStyle={styles.link}
      linkText={replaceUrlWithText}
      linkDefault
    >
      {props.children}
    </Hyperlink>
  )
}

function replaceUrlWithText(url) {
  const link = Object.values(links).find(l => l.url === url)
  return (link && link.text) || url
}