import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'

import AppModal from '../common/app-modal'
import AppSwitch from '../common/app-switch'
import AppText from '../common/app-text'
import AppTextInput from '../common/app-text-input'
import Button from '../common/button'
import CloseIcon from '../common/close-icon'
import Segment from '../common/segment'
import SelectBoxGroup from './select-box-group'
import SelectTabGroup from './select-tab-group'
import Temperature from './temperature'

import { blank, save, shouldShow, symtomPage } from '../helpers/cycle-day'
import { showToast } from '../helpers/general'

import { shared as sharedLabels } from '../../i18n/en/labels'
import info from '../../i18n/en/symptom-info'
import { Colors, Containers, Sizes, Spacing } from '../../styles'

const SymptomEditView = ({ date, onClose, symptom, symptomData }) => {
  const symptomConfig = symtomPage[symptom]
  const [data, setData] = useState(symptomData ? symptomData : blank[symptom])
  const [shouldShowInfo, setShouldShowInfo] = useState(false)
  const getParsedData = () => JSON.parse(JSON.stringify(data))
  const onPressLearnMore = () => setShouldShowInfo(!shouldShowInfo)

  const onEditNote = (note) => {
    const parsedData = getParsedData()

    if (symptom === 'note') {
      Object.assign(parsedData, { value: note })
    } else {
      parsedData['note'] = note
    }

    setData(parsedData)
  }

  const onExcludeToggle = () => {
    const parsedData = getParsedData()

    Object.assign(parsedData, { exclude: !parsedData.exclude })

    setData(parsedData)
  }

  const onRemove = () => {
    save[symptom](data, date, true)
    showToast(sharedLabels.dataDeleted)
    onClose()
  }

  const onSave = () => {
    const hasDataChanged = () => {
      const initialData = symptomData ? symptomData : blank[symptom]

      return JSON.stringify(data) !== JSON.stringify(initialData)
    }

    if (hasDataChanged()) {
      save[symptom](data, date, false)
      showToast(sharedLabels.dataSaved)
    }

    onClose()
  }

  const onSaveTemperature = (value, field) => {
    const parsedData = getParsedData()
    const dataToSave =
      field === 'value' ? { [field]: Number(value) } : { [field]: value }

    Object.assign(parsedData, { ...dataToSave })

    setData(parsedData)
  }

  const onSelectBox = (key) => {
    const parsedData = getParsedData()
    if (key === 'other') {
      Object.assign(parsedData, {
        note: null,
        [key]: !data[key],
      })
    } else {
      Object.assign(parsedData, { [key]: !data[key] })
    }

    setData(parsedData)
  }

  const onSelectBoxNote = (value) => {
    const parsedData = getParsedData()

    Object.assign(parsedData, { note: value !== '' ? value : null })

    setData(parsedData)
  }

  const onSelectTab = (group, value) => {
    const parsedData = getParsedData()

    Object.assign(parsedData, { [group.key]: value })

    setData(parsedData)
  }
  const iconName = shouldShowInfo ? 'chevron-up' : 'chevron-down'
  const noteText = symptom === 'note' ? data.value : data.note

  return (
    <AppModal onClose={onSave}>
      <ScrollView
        contentContainerStyle={styles.modalContainer}
        style={styles.modalWindow}
      >
        <View style={styles.headerContainer}>
          <CloseIcon onClose={onSave} />
        </View>
        {symptom === 'temperature' && (
          <Temperature
            date={date}
            data={data}
            save={(value, field) => onSaveTemperature(value, field)}
          />
        )}
        {shouldShow(symptomConfig.selectTabGroups) &&
          symtomPage[symptom].selectTabGroups.map((group) => {
            return (
              <Segment key={group.key} style={styles.segmentBorder}>
                <AppText style={styles.title}>{group.title}</AppText>
                <SelectTabGroup
                  activeButton={data[group.key]}
                  buttons={group.options}
                  onSelect={(value) => onSelectTab(group, value)}
                />
              </Segment>
            )
          })}
        {shouldShow(symptomConfig.selectBoxGroups) &&
          symtomPage[symptom].selectBoxGroups.map((group) => {
            const isOtherSelected =
              data['other'] !== null &&
              data['other'] !== false &&
              Object.keys(group.options).includes('other')

            return (
              <Segment key={group.key} style={styles.segmentBorder}>
                <AppText style={styles.title}>{group.title}</AppText>
                <SelectBoxGroup
                  labels={group.options}
                  onSelect={(value) => onSelectBox(value)}
                  optionsState={data}
                />
                {isOtherSelected && (
                  <AppTextInput
                    multiline={true}
                    placeholder={sharedLabels.enter}
                    value={data.note}
                    onChangeText={(value) => onSelectBoxNote(value)}
                  />
                )}
              </Segment>
            )
          })}
        {shouldShow(symptomConfig.excludeText) && (
          <Segment style={styles.segmentBorder}>
            <AppSwitch
              onToggle={onExcludeToggle}
              text={symtomPage[symptom].excludeText}
              value={data.exclude}
            />
          </Segment>
        )}
        {shouldShow(symptomConfig.note) && (
          <Segment style={styles.segmentBorder}>
            <AppText>{symtomPage[symptom].note}</AppText>
            <AppTextInput
              multiline={true}
              numberOfLines={3}
              onChangeText={onEditNote}
              placeholder={sharedLabels.enter}
              testID="noteInput"
              value={noteText !== null ? noteText : ''}
            />
          </Segment>
        )}
        <View style={styles.buttonsContainer}>
          <Button iconName={iconName} isSmall onPress={onPressLearnMore}>
            {sharedLabels.learnMore}
          </Button>
          <Button isSmall onPress={onRemove}>
            {sharedLabels.remove}
          </Button>
          <Button isCTA isSmall onPress={onSave}>
            {sharedLabels.save}
          </Button>
        </View>
        {shouldShowInfo && (
          <Segment last style={styles.segmentBorder}>
            <AppText>{info[symptom].text}</AppText>
          </Segment>
        )}
      </ScrollView>
    </AppModal>
  )
}

SymptomEditView.propTypes = {
  date: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  symptom: PropTypes.string.isRequired,
  symptomData: PropTypes.object,
}

const styles = StyleSheet.create({
  buttonsContainer: {
    ...Containers.rowContainer,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: Spacing.tiny,
  },
  modalContainer: {
    flex: 1,
    padding: Spacing.base,
  },
  modalWindow: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: Sizes.huge * 2,
    position: 'absolute',
    minHeight: '40%',
    maxHeight: Dimensions.get('window').height * 0.7,
  },
  segmentBorder: {
    borderBottomColor: Colors.greyLight,
  },
  title: {
    fontSize: Sizes.subtitle,
  },
})

export default SymptomEditView
