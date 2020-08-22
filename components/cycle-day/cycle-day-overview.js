import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import AppPage from '../common/app-page'
import SymptomBox from './symptom-box'
import SymptomPageTitle from './symptom-page-title'

import { connect } from 'react-redux'
import { getDate, setDate } from '../../slices/date'
import { navigate } from '../../slices/navigation'

import cycleModule from '../../lib/cycle'
import { dateToTitle } from '../helpers/format-date'
import { getCycleDay } from '../../db'
import { getData } from '../helpers/cycle-day'

import { general as labels} from '../../i18n/en/cycle-day'
import { Spacing } from '../../styles'
import { SYMPTOMS } from '../../config'

class CycleDayOverView extends Component {

  static propTypes = {
    navigate: PropTypes.func,
    setDate: PropTypes.func,
    cycleDay: PropTypes.object,
    date: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = { cycleDay: getCycleDay(props.date), data: null }
  }

  updateCycleDay = (date) => {
    this.props.setDate(date)
    this.setState({ cycleDay: getCycleDay(date) })
  }

  render() {
    const { cycleDay } = this.state
    const { date } = this.props

    const { getCycleDayNumber } = cycleModule()
    const cycleDayNumber = getCycleDayNumber(date)
    const subtitle = cycleDayNumber && `${labels.cycleDayNumber}${cycleDayNumber}`

    return (
      <AppPage>
        <SymptomPageTitle
          reloadSymptomData={this.updateCycleDay}
          subtitle={subtitle}
          title={dateToTitle(date)}
        />
        <View style={styles.container}>
          {SYMPTOMS.map(symptom => {
            const symptomData = cycleDay && cycleDay[symptom]
              ? cycleDay[symptom] : null

            return(
              <SymptomBox
                key={symptom}
                symptom={symptom}
                symptomData={symptomData}
                symptomDataToDisplay={getData(symptom, symptomData)}
                updateCycleDayData={this.updateCycleDay}
              />
            )
          })}
        </View>
      </AppPage>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: Spacing.base
  }
})

const mapStateToProps = (state) => {
  return({
    date: getDate(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    setDate: (date) => dispatch(setDate(date)),
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CycleDayOverView)
