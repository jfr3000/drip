import React from 'react'

import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import FramedSegment from '../common/framed-segment'

import labels from '../../i18n/en/settings'

const License = () => {
  return (
    <AppPage title={labels.license.title} >
      <FramedSegment last >
        <AppText>{labels.license.text}</AppText>
      </FramedSegment>
    </AppPage>
  )
}

export default License
