import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from "../styles"

export default class AppText extends Component {
  render() {
    return (
      <Text style={[styles.appText, this.props.style]}>
        {this.props.children}
      </Text>
    )
  }
}

export class AppTextLight extends Component {
  render() {
    return (
      <Text style={[styles.appTextLight, this.props.style]}>
        {this.props.children}
      </Text>
    )
  }
}

export class SymptomSectionHeader extends Component {
  render() {
    return (
      <AppText style={styles.symptomViewHeading}>
        {this.props.children}
      </AppText>
    )
  }
}