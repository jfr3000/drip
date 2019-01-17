import {links} from '../../i18n/en/settings'

export default function(url) {
  const link = Object.values(links).find(link => link.url === url)
  if (url === 'mailto:bloodyhealth@mailbox.org') {
    console.log(links.email.url === url)
  }
  return link ? link.text : url
}