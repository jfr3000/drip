import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Entypo'

import InfoPopUp from './info-symptom'

import styles, { iconStyles } from '../../../styles'

export default class SymptomInfo extends Component {

  static propTypes = {
    symptom: PropTypes.string
  }

  constructor() {
    super()
    this.state = { showInfo: false }
  }

  showInfo = () => this.setState({ showInfo: true })

  hideInfo = () => this.setState({ showInfo: false })

  render() {
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={this.showInfo}
          style={styles.infoButtonSymptomView}
          testID="symptomInfoButton"
        >
          <Icon name="info-with-circle" style={iconStyles.info} />
        </TouchableOpacity>
        { this.state.showInfo &&
            <InfoPopUp symptom={this.props.symptom} close={this.hideInfo} />
        }
      </React.Fragment>
    )
  }
}