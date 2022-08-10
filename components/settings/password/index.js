import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { navigate } from '../../../slices/navigation'

import { changeDbEncryption } from '../../../db'

import AppPage from '../../common/app-page'
import AppText from '../../common/app-text'
import Segment from '../../common/segment'

import CreatePassword from './create'
import ChangePassword from './update'
import DeletePassword from './delete'

import { hasEncryptionObservable } from '../../../local-storage'
import labels from '../../../i18n/en/settings'

class PasswordSetting extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    restartApp: PropTypes.func,
  }
  constructor(props) {
    super(props)

    this.state = {
      isPasswordSet: hasEncryptionObservable.value,
      isChangingPassword: false,
      isDeletingPassword: false,
    }
  }

  onChangingPassword = () => {
    this.setState({ isChangingPassword: true })
  }

  onCancelChangingPassword = () => {
    this.setState({ isChangingPassword: false })
  }

  onDeletingPassword = () => {
    this.setState({ isDeletingPassword: true })
  }

  onCancelDeletingPassword = () => {
    this.setState({ isDeletingPassword: false })
  }

  changeEncryptionAndRestart = async (hash) => {
    await changeDbEncryption(hash)
    await this.props.restartApp()
    this.props.navigate('Home')
  }

  render() {
    const { isPasswordSet, isChangingPassword, isDeletingPassword } = this.state

    const { title, explainerEnabled, explainerDisabled } =
      labels.passwordSettings

    return (
      <AppPage>
        <Segment title={title} last>
          <AppText>
            {isPasswordSet ? explainerEnabled : explainerDisabled}
          </AppText>

          {!isPasswordSet && (
            <CreatePassword
              changeEncryptionAndRestart={this.changeEncryptionAndRestart}
            />
          )}

          {isPasswordSet && !isDeletingPassword && (
            <ChangePassword
              onStartChange={this.onChangingPassword}
              onCancelChange={this.onCancelChangingPassword}
              changeEncryptionAndRestart={this.changeEncryptionAndRestart}
            />
          )}

          {isPasswordSet && !isChangingPassword && (
            <DeletePassword
              onStartDelete={this.onDeletingPassword}
              onCancelDelete={this.onCancelDeletingPassword}
              changeEncryptionAndRestart={this.changeEncryptionAndRestart}
            />
          )}
        </Segment>
      </AppPage>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (page) => dispatch(navigate(page)),
  }
}

export default connect(null, mapDispatchToProps)(PasswordSetting)
