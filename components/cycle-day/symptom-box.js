import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

import AppText from '../common/app-text'
import DripIcon from '../../assets/drip-icons'
import SymptomEditView from './symptom-edit-view'

import { connect } from 'react-redux'
import { getDate } from '../../slices/date'
import { isDateInFuture } from '../helpers/cycle-day'

import { Colors, Sizes, Spacing } from '../../styles'
import { headerTitles as symptomTitles } from '../../i18n/en/labels'

class SymptomBox extends Component {

  static propTypes = {
    date: PropTypes.string.isRequired,
    isSymptomEdited: PropTypes.bool,
    symptom: PropTypes.string.isRequired,
    symptomData: PropTypes.object,
    symptomDataToDisplay: PropTypes.string,
    updateCycleDayData: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isSymptomEdited: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      isSymptomEdited: props.isSymptomEdited
    }
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
            size={Sizes.icon}
          />
          <View style={styles.textContainer}>
            <AppText style={symptomNameStyle}>
              {symptomTitles[symptom].toLowerCase()}
            </AppText>
            {symptomDataToDisplay &&
              <AppText style={textStyle} numberOfLines={3} >
                {symptomDataToDisplay}
              </AppText>
            }
          </View>
        </TouchableOpacity>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    elevation: 4,
    flexDirection: 'row',
    height: verticalScale(110),
    marginBottom: verticalScale(Spacing.base),
    paddingHorizontal: scale(Spacing.small),
    paddingVertical: verticalScale(Spacing.base),
    width: Spacing.symptomTileWidth
  },
  symptomName: {
    color: Colors.purple,
    fontSize: Sizes.base,
    lineHeight: Sizes.base
  },
  symptomNameDisabled: {
    color: Colors.grey
  },
  symptomNameExcluded: {
    color: Colors.greyDark,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: Spacing.tiny,
    maxWidth: Spacing.textWidth
  },
  text: {
    fontSize: Sizes.small,
    fontStyle: 'italic',
    lineHeight: scale(14)
  },
  textDisabled: {
    color: Colors.greyLight
  },
  textExcluded: {
    color: Colors.grey,
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
