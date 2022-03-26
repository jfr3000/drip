import React from 'react'
import { useTranslation } from 'react-i18next'

import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import Segment from '../common/segment'

const License = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <AppPage title={t("settings.license.title")}>
      <Segment last>
        <AppText>{t("settings.license.text", { currentYear })}</AppText>
      </Segment>
    </AppPage>
  )
}

export default License
