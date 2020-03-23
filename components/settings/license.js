import React from 'react'

import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import Segment from '../common/segment'

import labels from '../../i18n/en/settings'

const License = () => {
  return (
    <AppPage title={labels.license.title} >
      <Segment last >
        <AppText>{labels.license.text}</AppText>
      </Segment>
    </AppPage>
  )
}

export default License
