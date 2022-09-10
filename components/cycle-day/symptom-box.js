import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import AppText from '../common/app-text'
import DripIcon from '../../assets/drip-icons'
import SymptomEditView from './symptom-edit-view'

import { isDateInFuture } from '../helpers/cycle-day'

import { Colors, Sizes, Spacing } from '../../styles'
import { headerTitles as symptomTitles } from '../../i18n/en/labels'

const SymptomBox = ({
  date,
  symptom,
  symptomData,
  symptomDataToDisplay,
  editedSymptom,
  setEditedSymptom,
}) => {
  const isSymptomEdited = editedSymptom === symptom
  const isSymptomDisabled = isDateInFuture(date) && symptom !== 'note'
  const isExcluded = symptomData !== null ? symptomData.exclude : false

  const iconColor = isSymptomDisabled ? Colors.greyLight : Colors.grey
  const iconName = `drip-icon-${symptom}`
  const symptomNameStyle = [
    styles.symptomName,
    isSymptomDisabled && styles.symptomNameDisabled,
    isExcluded && styles.symptomNameExcluded,
  ]
  const textStyle = [
    styles.text,
    isSymptomDisabled && styles.textDisabled,
    isExcluded && styles.textExcluded,
  ]

  return (
    <>
      {isSymptomEdited && (
        <SymptomEditView
          date={date}
          symptom={symptom}
          symptomData={symptomData}
          onClose={() => setEditedSymptom('')}
        />
      )}

      <TouchableOpacity
        disabled={isSymptomDisabled}
        onPress={() => setEditedSymptom(symptom)}
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
          {symptomDataToDisplay && (
            <AppText style={textStyle} numberOfLines={4}>
              {symptomDataToDisplay}
            </AppText>
          )}
        </View>
      </TouchableOpacity>
    </>
  )
}

SymptomBox.propTypes = {
  date: PropTypes.string.isRequired,
  symptom: PropTypes.string.isRequired,
  symptomData: PropTypes.object,
  symptomDataToDisplay: PropTypes.string,
  editedSymptom: PropTypes.string.isRequired,
  setEditedSymptom: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: scale(10),
    elevation: 4,
    flexDirection: 'row',
    height: scale(110),
    marginBottom: Spacing.base,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.base,
    width: Spacing.symptomTileWidth,
  },
  symptomName: {
    paddingTop: Sizes.tiny,
    color: Colors.purple,
    fontSize: Sizes.base,
    lineHeight: Sizes.base,
  },
  symptomNameDisabled: {
    color: Colors.grey,
  },
  symptomNameExcluded: {
    color: Colors.greyDark,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: Spacing.tiny,
    maxWidth: Spacing.textWidth,
  },
  text: {
    fontSize: Sizes.small,
    fontStyle: 'italic',
  },
  textDisabled: {
    color: Colors.greyLight,
  },
  textExcluded: {
    color: Colors.grey,
  },
})

export default SymptomBox
