import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import nodejs from 'nodejs-mobile-react-native'

import { getLicenseFlag, saveEncryptionFlag } from '../local-storage'
import { openDb } from '../db'

import App from './app'
import AppLoadingView from './common/app-loading'
import AppStatusBar from './common/app-status-bar'
import License from './License'
import PasswordPrompt from './password-prompt'

import store from '../store'

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
      isCheckingLicenseAgreement: false,
    })
  }

  disableShowLicenseAgreement = () => {
    this.setState({ shouldShowLicenseAgreement: false })
  }

  enableShowApp = () => {
    this.setState({
      shouldShowApp: true,
      shouldShowPasswordPrompt: false,
    })
  }

  render() {
    const {
      isCheckingLicenseAgreement,
      shouldShowLicenseAgreement,
      shouldShowPasswordPrompt,
      shouldShowApp,
    } = this.state

    let initialView = null

    if (isCheckingLicenseAgreement) {
      initialView = <AppLoadingView />
    } else if (shouldShowLicenseAgreement) {
      initialView = <License setLicense={this.disableShowLicenseAgreement} />
    } else if (shouldShowPasswordPrompt) {
      initialView = <PasswordPrompt enableShowApp={this.enableShowApp} />
    } else if (shouldShowApp) {
      initialView = <App restartApp={() => this.checkDbPasswordSet()} />
    }

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar />
          {initialView}
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
