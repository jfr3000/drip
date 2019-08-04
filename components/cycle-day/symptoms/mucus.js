import React from 'react'
import {
  Switch,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'

import { getDate } from '../../../slices/date'

import styles from '../../../styles'
import { mucus as labels } from '../../../i18n/en/cycle-day'
import computeNfpValue from '../../../lib/nfp-mucus'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

class Mucus extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.mucus = cycleDay && cycleDay.mucus
    this.state = this.mucus ? this.mucus : {}
  }

  symptomName = 'mucus'

  autoSave = () => {
    const nothingEntered = ['feeling', 'texture'].every(val => typeof this.state[val] != 'number')
    if (nothingEntered) {
      this.deleteSymptomEntry()
      return
    }

    const feeling = this.state.feeling
    const texture = this.state.texture
    this.saveSymptomEntry({
      feeling,
      texture,
      value: computeNfpValue(feeling, texture),
      exclude: Boolean(this.state.exclude)
    })
  }

  renderContent() {
    const mucusFeeling = [
      { label: labels.feeling.categories[0], value: 0 },
      { label: labels.feeling.categories[1], value: 1 },
      { label: labels.feeling.categories[2], value: 2 },
      { label: labels.feeling.categories[3], value: 3 }
    ]
    const mucusTexture = [
      { label: labels.texture.categories[0], value: 0 },
      { label: labels.texture.categories[1], value: 1 },
      { label: labels.texture.categories[2], value: 2 }
    ]
    // TODO leaving this info for notice when leaving incomplete data
    // const mandatoryNotCompletedYet = typeof this.state.feeling != 'number' || typeof this.state.texture != 'number'
    return (
      <ScrollView style={styles.page}>
        <SymptomSection
          header='Feeling'
          explainer={labels.feeling.explainer}
        >
          <SelectTabGroup
            buttons={mucusFeeling}
            onSelect={val => this.setState({ feeling: val })}
            active={this.state.feeling}
          />
        </SymptomSection>
        <SymptomSection
          header='Texture'
          explainer={labels.texture.explainer}
        >
          <SelectTabGroup
            buttons={mucusTexture}
            onSelect={val => this.setState({ texture: val })}
            active={this.state.texture}
          />
        </SymptomSection>
        <SymptomSection
          header="Exclude"
          explainer={labels.excludeExplainer}
          inline={true}
        >
          <Switch
            onValueChange={(val) => {
              this.setState({ exclude: val })
            }}
            value={this.state.exclude}
          />
        </SymptomSection>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    date: getDate(state)
  })
}

export default connect(
  mapStateToProps,
  null
)(Mucus)
