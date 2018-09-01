import React, { Component } from 'react'
import { View } from 'react-native'
import { SymptomSectionHeader, AppText } from '../../app-text'

export default class SymptomSection extends Component {
  render() {
    return (
      <View>
        <SymptomSectionHeader>{this.props.header}</SymptomSectionHeader>
        <View flexDirection={this.props.inlineExplainer ? 'row' : 'column'}>
          <View flex={1}>
            <AppText>{this.props.explainer}</AppText>
          </View>
          {this.props.children}
        </View>
      </View>
    )
  }
}