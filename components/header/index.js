import React from 'react'
import { Dimensions } from 'react-native'
import CycleDayHeader from './cycle-day'
import DefaultHeader from './default'
import InfoSymptomHeader from './info-symptom'
import SymptomViewHeader from './symptom-view'

export default function Header(p) {
  const middle = Dimensions.get('window').width / 2
  const props = Object.assign({}, p, {middle})

  if (props.isCycleDayOverView) {
    return (<CycleDayHeader {...props} />)
  }
  else if (props.isSymptomView) {
    return (<SymptomViewHeader {...props} />)
  }
  else if (props.title === 'info') {
    return (<InfoSymptomHeader {...props} />)
  }
  else {
    return (<DefaultHeader {...props} />)
  }
}
