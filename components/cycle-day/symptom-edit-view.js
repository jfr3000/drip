import React, { Component } from 'react'
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

import { connect } from 'react-redux'
import { getDate } from '../../slices/date'
import { blank, save, shouldShow, symtomPage } from '../helpers/cycle-day'

import { shared as sharedLabels } from '../../i18n/en/labels'
import info from '../../i18n/en/symptom-info'
import { Colors, Containers, Sizes, Spacing } from '../../styles'

class SymptomEditView extends Component {

  static propTypes = {
    date: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    symptom: PropTypes.string.isRequired,
    symptomData: PropTypes.object
  }

  constructor(props) {
    super(props)

    const { symptomData, symptom } = this.props
    const data = symptomData ? symptomData : blank[symptom]

    const symptomConfig = symtomPage[symptom]
    const shouldShowExclude = shouldShow(symptomConfig.excludeText)
    const shouldShowNote = shouldShow(symptomConfig.note)
    const shouldBoxGroup = shouldShow(symptomConfig.selectBoxGroups)
    const shouldTabGroup = shouldShow(symptomConfig.selectTabGroups)

    this.state = {
      data,
      shouldShowExclude,
      shouldShowInfo: false,
      shouldShowNote,
      shouldBoxGroup,
      shouldTabGroup
    }
  }

  componentDidUpdate() {
    this.saveData()
  }

  getParsedData = () => JSON.parse(JSON.stringify(this.state.data))

  onEditNote = (note) => {
    const data = this.getParsedData()
    const { symptom } = this.props

    if (symptom === 'note') {
      Object.assign(data, { value: note })
    } else {
      data['note'] = note
    }

    this.setState({ data })
  }

  onExcludeToggle = () => {
    const data = this.getParsedData()
    Object.assign(data, { exclude: !data.exclude })

    this.setState({ data })
  }

  onPressLearnMore = () => {
    this.setState({ shouldShowInfo: !this.state.shouldShowInfo })
  }

  onRemove = () => {
    this.saveData(true)
    this.props.onClose()
  }

  onSave = () => {
    this.saveData()
    this.props.onClose()
  }

  onSaveTemperature = (value, field) => {
    const data = this.getParsedData()
    const dataToSave = field === 'value'
      ? { [field]: Number(value) } : { [field]: value }
    Object.assign(data, { ...dataToSave })

    this.setState({ data })
  }

  onSelectBox = (key) => {
    const data = this.getParsedData()
    if (key === "other") {
      Object.assign(data, {
        note: null,
        [key]: !this.state.data[key]
      })
    } else {
      Object.assign(data, { [key]: !this.state.data[key] })
    }

    this.setState({ data })
  }

  onSelectBoxNote= (value) => {
    const data = this.getParsedData()
    Object.assign(data, { note: value !== '' ? value : null })

    this.setState({ data })
  }

  onSelectTab = (group, value) => {
    const data = this.getParsedData()
    Object.assign(data, { [group.key]: value })

    this.setState({ data })
  }

  saveData = (shouldDeleteData) => {
    const { date, symptom } = this.props
    const { data } = this.state
    save[symptom](data, date, shouldDeleteData)
  }

  render() {
    const { onClose, symptom } = this.props
    const { data,
      shouldShowExclude,
      shouldShowInfo,
      shouldShowNote,
      shouldBoxGroup,
      shouldTabGroup
    } = this.state
    const iconName = shouldShowInfo ? "chevron-down" : "chevron-up"
    const noteText = symptom === 'note' ? data.value : data.note

    return (
      <AppModal onClose={onClose}>
        <ScrollView
          contentContainerStyle={styles.modalContainer}
          style={styles.modalWindow}
        >
          <View style={styles.headerContainer}>
            <CloseIcon onClose={onClose} />
          </View>
          {symptom === 'temperature' &&
            <Temperature
              data={data}
              save={(value, field) => this.onSaveTemperature(value, field)}
            />
          }
          {shouldTabGroup && symtomPage[symptom].selectTabGroups.map(group => {
            return (
              <Segment key={group.key} style={styles.segmentBorder}>
                <AppText style={styles.title}>{group.title}</AppText>
                <SelectTabGroup
                  activeButton={data[group.key]}
                  buttons={group.options}
                  onSelect={value => this.onSelectTab(group, value)}
                />
              </Segment>
            )
          })
          }
          {shouldBoxGroup && symtomPage[symptom].selectBoxGroups.map(group => {
            const isOtherSelected =
              data['other'] !== null
              && data['other'] !== false
              && Object.keys(group.options).includes('other')

            return (
              <Segment key={group.key} style={styles.segmentBorder} >
                <AppText style={styles.title}>{group.title}</AppText>
                <SelectBoxGroup
                  labels={group.options}
                  onSelect={value => this.onSelectBox(value)}
                  optionsState={data}
                />
                {isOtherSelected &&
                  <AppTextInput
                    multiline={true}
                    placeholder={sharedLabels.enter}
                    value={data.note}
                    onChangeText={value => this.onSelectBoxNote(value)}
                  />
                }
              </Segment>
            )
          })
          }
          {shouldShowExclude &&
            <Segment style={styles.segmentBorder} >
              <AppSwitch
                onToggle={this.onExcludeToggle}
                text={symtomPage[symptom].excludeText}
                value={data.exclude}
              />
            </Segment>
          }
          {shouldShowNote &&
            <Segment style={styles.segmentBorder} >
              <AppText>{symtomPage[symptom].note}</AppText>
              <AppTextInput
                multiline={true}
                numberOfLines={3}
                onChangeText={this.onEditNote}
                placeholder={sharedLabels.enter}
                testID='noteInput'
                value={noteText !== null ? noteText : ''}
              />
            </Segment>
          }
          <View style={styles.buttonsContainer}>
            <Button iconName={iconName} isSmall onPress={this.onPressLearnMore}>
              {sharedLabels.learnMore}
            </Button>
            <Button isSmall onPress={this.onRemove}>
              {sharedLabels.remove}
            </Button>
            <Button isCTA isSmall onPress={this.onSave}>
              {sharedLabels.save}
            </Button>
          </View>
          {shouldShowInfo &&
            <Segment last style={styles.segmentBorder} >
              <AppText>{info[symptom].text}</AppText>
            </Segment>
          }
        </ScrollView>
      </AppModal>
    )
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    ...Containers.rowContainer
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
    maxHeight: Dimensions.get('window').height * 0.7
  },
  segmentBorder: {
    borderBottomColor: Colors.greyLight
  },
  title: {
    fontSize: Sizes.subtitle
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
)(SymptomEditView)
