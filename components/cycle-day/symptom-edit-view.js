import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View } from 'react-native'

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
import { Containers, Sizes } from '../../styles/redesign'

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
          pagingEnabled={true}
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
              <Segment key={group.key}>
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
              <Segment key={group.key}>
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
            <Segment>
              <AppSwitch
                onToggle={this.onExcludeToggle}
                text={symtomPage[symptom].excludeText}
                value={data.exclude}
              />
            </Segment>
          }
          {shouldShowNote &&
            <Segment>
              <AppText>{symtomPage[symptom].note}</AppText>
              <AppTextInput
                multiline={true}
                placeholder={sharedLabels.enter}
                onChangeText={this.onEditNote}
                value={noteText !== null ? noteText : ''}
                testID='noteInput'
              />
            </Segment>
          }
          <View style={styles.buttonsContainer}>
            <Button iconName={iconName} isSmall onPress={this.onPressLearnMore}>
              learn more
            </Button>
            <Button isSmall onPress={this.onRemove}>
              remove
            </Button>
            <Button isCTA isSmall onPress={this.onSave}>save</Button>
          </View>
          {shouldShowInfo &&
            <Segment last>
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
    paddingVertical: Sizes.tiny,
  },
  modalContainer: {
    flexGrow: 1,
    padding: Sizes.small
  },
  modalWindow: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: Sizes.huge * 2,
    minHeight: '40%',
    height: '70%',
    position: 'absolute'
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