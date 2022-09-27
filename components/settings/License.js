import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import AppLink from '../common/AppLink'
import Segment from '../common/segment'

const License = ({ children }) => {
  const { t } = useTranslation(null, { keyPrefix: 'hamburgerMenu.license' })
  const currentYear = new Date().getFullYear()
  const link = 'https://www.gnu.org/licenses/gpl-3.0.html'
  return (
    <AppPage title={t('title')}>
      <Segment last>
        <AppText>{t('text', { currentYear })}</AppText>
        <AppLink url={link}>{link}</AppLink>
        {children}
      </Segment>
    </AppPage>
  )
}

License.propTypes = {
  children: PropTypes.node,
}

export default License
