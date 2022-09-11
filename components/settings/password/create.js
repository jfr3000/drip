import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '../../common/button'

import EnterNewPassword from './enter-new-password'
import showBackUpReminder from './show-backup-reminder'

import settings from '../../../i18n/en/settings'

const CreatePassword = ({ changeEncryptionAndRestart }) => {
  const [isSettingPassword, setIsSettingPassword] = useState(false)

  const startSettingPassword = () => {
    showBackUpReminder(
      () => {
        setIsSettingPassword(true)
      },
      () => {}
    )
  }

  const labels = settings.passwordSettings

  if (!isSettingPassword) {
    return (
      <Button isCTA onPress={startSettingPassword}>
        {labels.setPassword}
      </Button>
    )
  }

  return (
    <EnterNewPassword changeEncryptionAndRestart={changeEncryptionAndRestart} />
  )
}

CreatePassword.propTypes = {
  changeEncryptionAndRestart: PropTypes.func,
}

export default CreatePassword
