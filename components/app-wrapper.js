import React, { Component } from 'react'
import nodejs from 'nodejs-mobile-react-native'

import { getLicenseFlag, saveEncryptionFlag } from '../local-storage'
import { openDb } from '../db'

import App from './app'
import PasswordPrompt from './password-prompt'
import License from './license'
import AppLoadingView from './app-loading'

export default class AppWrapper extends Component {
  constructor() {
    super()
    this.state = {
      isCheckingLicenseAgreement: true,
      shouldShowLicenseAgreement: false,
      shouldShowPasswordPrompt: false,
      shouldShowApp: false,
    }
    nodejs.start('main.js')
    this.checkLicenseAgreement()
    this.checkDbPasswordSet()
  }

  async checkLicenseAgreement() {
    const isLicenseFlagSet = await getLicenseFlag()
    if (!isLicenseFlagSet) {
      this.enableShowLicenseAgreement()
    } else {
      this.setState({ isCheckingLicenseAgreement: false })
    }
  }

  async checkDbPasswordSet() {
    const canConnectToDb = await openDb()
    if (canConnectToDb) {
      this.enableShowApp()
      await saveEncryptionFlag(false)
      return false
    }
    this.setState({ shouldShowPasswordPrompt: true })
    await saveEncryptionFlag(true)
  }

  enableShowLicenseAgreement = () => {
    this.setState({
      shouldShowLicenseAgreement: true,
      isCheckingLicenseAgreement: false
    })
  }

  disableShowLicenseAgreement = () => {
    this.setState({ shouldShowLicenseAgreement: false })
  }

  enableShowApp = () => {
    this.setState({
      shouldShowApp: true,
      shouldShowPasswordPrompt: false
    })
  }

  render() {
    const {
      isCheckingLicenseAgreement,
      shouldShowLicenseAgreement,
      shouldShowPasswordPrompt,
      shouldShowApp,
    } = this.state

    if (isCheckingLicenseAgreement) {
      return <AppLoadingView />
    }

    if (shouldShowLicenseAgreement) {
      return <License setLicense={this.disableShowLicenseAgreement}/>
    }

    if (shouldShowPasswordPrompt) {
      return <PasswordPrompt enableShowApp={this.enableShowApp} />
    }

    return shouldShowApp && <App />
  }
}