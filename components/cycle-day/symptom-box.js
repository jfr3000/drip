import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import AppText from '../common/app-text'
import DripIcon from '../../assets/drip-icons'
import SymptomEditView from './symptom-edit-view'

import { connect } from 'react-redux'
import { getDate } from '../../slices/date'
import { isDateInFuture } from '../helpers/cycle-day'

import { Colors, Sizes, Spacing } from '../../styles/redesign'
import { headerTitles as symptomTitles } from '../../i18n/en/labels'

class SymptomBox extends Component {

  static propTypes = {
    date: PropTypes.string.isRequired,
    symptom: PropTypes.string.isRequired,
    symptomData: PropTypes.object,
    symptomDataToDisplay: PropTypes.string,
    updateCycleDayData: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { isSymptomEdited: false }
  }

  onFinishEditing = () => {
    const { date, updateCycleDayData } = this.props

    updateCycleDayData(date)
    this.setState({ isSymptomEdited: false })
  }

  onEditSymptom = () => {
    this.setState({ isSymptomEdited: true })
  }

  render() {
    const { date, symptom, symptomData, symptomDataToDisplay } = this.props
    const { isSymptomEdited } = this.state
    const isSymptomDisabled = isDateInFuture(date) && symptom !== 'note'
    const isExcluded = symptomData !== null ? symptomData.exclude : false

    const iconColor = isSymptomDisabled ? Colors.greyLight : Colors.grey
    const iconName = `drip-icon-${symptom}`
    const symptomNameStyle = [
      styles.symptomName,
      (isSymptomDisabled && styles.symptomNameDisabled),
      (isExcluded && styles.symptomNameExcluded)
    ]
    const textStyle = [
      styles.text,
      (isSymptomDisabled && styles.textDisabled),
      (isExcluded && styles.textExcluded)
    ]

    return (
      <React.Fragment>
        {isSymptomEdited &&
          <SymptomEditView
            symptom={symptom}
            symptomData={symptomData}
            onClose={this.onFinishEditing}
          />
        }

        <TouchableOpacity
          disabled={isSymptomDisabled}
          onPress={this.onEditSymptom}
          style={styles.container}
          testID={iconName}
        >
          <DripIcon
            color={iconColor}
            isActive={!isSymptomDisabled}
            name={iconName}
            size={40}
          />
          <View style={styles.textContainer}>
            <AppText style={symptomNameStyle}>
              {symptomTitles[symptom].toLowerCase()}
            </AppText>
            {symptomDataToDisplay &&
              <AppText style={textStyle}>
                {symptomDataToDisplay}
              </AppText>
            }
          </View>
        </TouchableOpacity>
      </React.Fragment>
    )
  }
}

const excluded = {
  textDecorationLine: 'line-through'
}

const hint = {
  fontSize: Sizes.small,
  fontStyle: 'italic'
}

const main = {
  fontSize: Sizes.base,
  height: Sizes.base * 2,
  lineHeight: Sizes.base,
  marginBottom: (-1) * Sizes.tiny,
  textAlignVertical: 'center'
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    flexDirection: 'row',
    height: 110,
    marginBottom: Spacing.base,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.base,
    width: Spacing.symptomTileWidth
  },
  symptomName: {
    color: Colors.purple,
    ...main
  },
  symptomNameDisabled: {
    color: Colors.grey
  },
  symptomNameExcluded: {
    color: Colors.greyDark,
    ...excluded
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: Spacing.small,
    maxWidth: Spacing.textWidth
  },
  text: {
    ...hint
  },
  textDisabled: {
    color: Colors.greyLight
  },
  textExcluded: {
    color: Colors.grey,
    ...excluded
  }
})

const mapStateToProps = (state) => {
  return({
    date: getDate(state),
  })
}

export default connect(
  mapStateToProps,
  null,
)(SymptomBox)