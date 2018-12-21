import React, { Component } from 'react'
import { View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import App from './app'
import PasswordPrompt from './password-prompt'
import License from './license'
import { getLicenseFlag } from '../local-storage'

export default class AppWrapper extends Component {
  constructor() {
    super()
    this.state = {
      showLicense: true
    }
    nodejs.start('main.js')
    this.checkLicenseAgreement()
  }

  async checkLicenseAgreement() {
    const agreed = await getLicenseFlag()
    console.log(agreed)
    if (agreed) this.setState({showLicense: false})
  }

  render() {
    return (
      this.state.showLicense ?
        <License/>
        :
        <View style={{ flex: 1 }}>
          {this.state.showApp ?
            <App/>
            :
            <PasswordPrompt
              showApp={() => {
                this.setState({showApp: true})
              }}
            />
          }
        </View>
    )
  }
}