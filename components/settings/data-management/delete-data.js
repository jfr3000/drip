import React, { Component } from 'react'
import { View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import RNFS from 'react-native-fs'

import settings from '../../../i18n/en/settings'
import { requestHash, clearDb } from '../../../db'
import { hasEncryptionObservable } from '../../../local-storage'
import PasswordField from '../password/password-field'
import SettingsButton from '../settings-button'
import showDeleteDialog from './delete-data-dialog'
import checkCurrentPassword from '../password/check-current-password'
import alertError from '../alert-error'


export default class DeleteData extends Component {
  constructor() {
    super()
    this.state = {
      isPasswordSet: hasEncryptionObservable.value,
      currentPassword: null,
      enteringCurrentPassword: false
    }

    nodejs.channel.addListener(
      'pre-change-pw-check',
      this.openNewPasswordField,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('pre-change-pw-check', this.openNewPasswordField)
  }

  openNewPasswordField = async hash => {
    const passwordCorrect = await checkCurrentPassword({
      hash,
      onTryAgain: () => this.setState({ currentPassword: null }),
      onCancel: () => this.setState({
        enteringCurrentPassword: false,
        currentPassword: null
      })
    })

    if (passwordCorrect) {
      await this.deleteAppData()
    }
  }

  startDataDeletion = () => {
    showDeleteDialog(() => {
      if (this.state.isPasswordSet) {
        this.setState({ enteringCurrentPassword: true })
      } else {
        this.deleteAppData()
      }
    })
  }

  deleteExportedFile = async () => {
    const path = RNFS.DocumentDirectoryPath + '/data.csv'
    const isFileExist = await RNFS.exists(path)
    if (isFileExist) {
      await RNFS.unlink(path)
    }
  }

  deleteAppData = async () => {
    const { errors } = settings.deleteSegment
    try {
      await clearDb()
      await this.deleteExportedFile()
      this.props.onDeleteData()
    } catch (err) {
      return alertError(errors.couldNotDeleteFile)
    }
  }

  handleCurrentPasswordInput = (currentPassword) => {
    this.setState({ currentPassword })
  }

  checkCurrentPassword = () => {
    requestHash('pre-change-pw-check', this.state.currentPassword)
  }

  render() {

    const {
      enteringCurrentPassword,
      currentPassword
    } = this.state

    const labels = settings.passwordSettings

    if (enteringCurrentPassword) {
      return (
        <View>
          <PasswordField
            placeholder={labels.enterCurrent}
            value={currentPassword}
            onChangeText={this.handleCurrentPasswordInput}
          />
          <SettingsButton
            onPress={this.checkCurrentPassword}
            disabled={!currentPassword}
          >
            {settings.deleteSegment.title}
          </SettingsButton>
        </View>
      )
    }

    return (
      <View>
        <SettingsButton
          onPress={this.startDataDeletion}
          disabled={currentPassword}
        >
          {settings.deleteSegment.title}
        </SettingsButton>
      </View>
    )
  }
}