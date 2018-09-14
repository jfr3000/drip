import React, { Component } from 'react'
import { View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import App from './app'
import PasswordPrompt from './password-prompt'

export default class AppWrapper extends Component {
  constructor() {
    super()
    this.state = {}
    nodejs.start('main.js')
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.showApp ?
          <App/>
          :
          <PasswordPrompt
            onCorrectPassword={() => this.setState({showApp: true})}
          />
        }
      </View>
    )
  }
}