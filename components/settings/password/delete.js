import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '../../common/button'
import ConfirmWithPassword from '../common/confirm-with-password'

import labels from '../../../i18n/en/settings'

const DeletePassword = ({
  onStartDelete,
  onCancelDelete,
  changeEncryptionAndRestart,
}) => {
  const [enteringCurrentPassword, setEnteringCurrentPassword] = useState(false)

  const startConfirmWithPassword = () => {
    setEnteringCurrentPassword(true)
    onStartDelete()
  }

  const cancelConfirmationWithPassword = () => {
    setEnteringCurrentPassword(false)
    onCancelDelete()
  }

  if (enteringCurrentPassword) {
    return (
      <ConfirmWithPassword
        onSuccess={changeEncryptionAndRestart}
        onCancel={cancelConfirmationWithPassword}
      />
    )
  }

  return (
    <Button isCTA onPress={startConfirmWithPassword}>
      {labels.passwordSettings.deletePassword}
    </Button>
  )
}

DeletePassword.propTypes = {
  onStartDelete: PropTypes.func,
  onCancelDelete: PropTypes.func,
  changeEncryptionAndRestart: PropTypes.func,
}

export default DeletePassword
