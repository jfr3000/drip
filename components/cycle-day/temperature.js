import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import AppText from '../common/app-text'
import AppTextInput from '../common/app-text-input'
import Segment from '../common/segment'

import { connect } from 'react-redux'
import { getDate } from '../../slices/date'
import {
  getTemperatureOutOfRangeMessage,
  getPreviousTemperature,
  formatTemperature,
} from '../helpers/cycle-day'

import { temperature as labels } from '../../i18n/en/cycle-day'

import { Colors, Containers, Sizes, Spacing } from '../../styles'

const Temperature = ({ data, date, save }) => {
  const { t } = useTranslation()
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false)
  const [temperature, setTemperature] = useState(
    formatTemperature(data.value) || getPreviousTemperature(date)
  )

  // update state in parent component once to ensure
  // that pre-filled values are saved on button click
  useEffect(() => {
    if (temperature) {
      save(temperature, 'value')
    }
  }, [])

  function onChangeTemperature(value) {
    const formattedValue = value.replace(',', '.').trim()
    if (!Number(formattedValue) && value !== '') return false
    setTemperature(formattedValue)
  }

  function onShowTimePicker() {
    Keyboard.dismiss()
    setIsTimePickerVisible(true)
  }

  function setTime(jsDate) {
    const time = moment(jsDate).format('HH:mm')

    save(time, 'time')
    setIsTimePickerVisible(false)
  }

  const { time } = data

  const inputStyle = { color: Colors.greyDark }
  const outOfRangeWarning = getTemperatureOutOfRangeMessage(temperature)

  return (
    <React.Fragment>
      <Segment>
        <AppText style={styles.title}>{labels.temperature.explainer}</AppText>
        <View style={styles.container}>
          <AppTextInput
            value={temperature}
            onChangeText={onChangeTemperature}
            onEndEditing={() => save(temperature, 'value')}
            keyboardType="numeric"
            maxLength={5}
            style={inputStyle}
            testID="temperatureInput"
            underlineColorAndroid="transparent"
          />
          <AppText>°C</AppText>
        </View>
        {!!outOfRangeWarning && (
          <View style={styles.hintContainer}>
            <AppText style={styles.hint}>{outOfRangeWarning}</AppText>
          </View>
        )}
      </Segment>
      <Segment>
        <AppText style={styles.title}>{labels.time}</AppText>
        <AppTextInput
          onFocus={onShowTimePicker}
          testID="timeInput"
          value={time}
        />
        <DateTimePicker
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={setTime}
          onCancel={() => setIsTimePickerVisible(false)}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          headerTextIOS={t('labels.shared.dateTimePickerTitle')}
        />
      </Segment>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer,
  },
  hint: {
    fontStyle: 'italic',
    fontSize: Sizes.small,
  },
  hintContainer: {
    marginVertical: Spacing.tiny,
  },
  title: {
    fontSize: Sizes.subtitle,
  },
})

Temperature.propTypes = {
  data: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    date: getDate(state),
  }
}

export default connect(mapStateToProps, null)(Temperature)
