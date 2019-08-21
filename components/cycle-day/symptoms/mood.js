import React from 'react'
import {
  ScrollView,
  TextInput} from 'react-native'
import { connect } from 'react-redux'

import { getDate } from '../../../slices/date'

import { mood as labels } from '../../../i18n/en/cycle-day'
import SelectBoxGroup from '../select-box-group'
import SymptomSection from './symptom-section'
import styles from '../../../styles'
import SymptomView from './symptom-view'

class Mood extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    if (cycleDay && cycleDay.mood) {
      this.state = Object.assign({}, cycleDay.mood)
    } else {
      this.state = {}
    }
    if (this.state.note) {
      this.state.other = true
    }
  }

  symptomName = "mood"

  autoSave = () => {
    const nothingEntered = Object.values(this.state).every(val => !val)
    if (nothingEntered) {
      this.deleteSymptomEntry()
      return
    }
    const copyOfState = Object.assign({}, this.state)
    if (!copyOfState.other) {
      copyOfState.note = null
    }
    this.saveSymptomEntry(copyOfState)
  }

  toggleState = (key) => {
    const curr = this.state[key]
    this.setState({[key]: !curr})
    if (key === 'other' && !curr) {
      this.setState({focusTextArea: true})
    }
  }

  renderContent() {
    return (
      <ScrollView style={styles.page}>
        <SymptomSection
          explainer={labels.explainer}
        >
          <SelectBoxGroup
            labels={labels.categories}
            onSelect={this.toggleState}
            optionsState={this.state}
          />
          { this.state.other &&
              <TextInput
                autoFocus={this.state.focusTextArea}
                multiline={true}
                placeholder="Enter"
                value={this.state.note}
                onChangeText={(val) => {
                  this.setState({note: val})
                }}
              />
          }
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
)(Mood)
