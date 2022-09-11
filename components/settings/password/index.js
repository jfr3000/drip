import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { changeDbEncryption } from '../../../db'

import AppPage from '../../common/app-page'
import AppText from '../../common/app-text'
import Segment from '../../common/segment'

import CreatePassword from './create'
import ChangePassword from './update'
import DeletePassword from './delete'

import { hasEncryptionObservable } from '../../../local-storage'
import labels from '../../../i18n/en/settings'

const PasswordSetting = ({ restartApp, navigate }) => {
  const isPasswordSet = hasEncryptionObservable.value
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isDeletingPassword, setIsDeletingPassword] = useState(false)

  const changeEncryptionAndRestart = async (hash) => {
    await changeDbEncryption(hash)
    await restartApp()
    navigate('Home')
  }

  const { title, explainerEnabled, explainerDisabled } = labels.passwordSettings

  return (
    <AppPage>
      <Segment title={title} last>
        <AppText>
          {isPasswordSet ? explainerEnabled : explainerDisabled}
        </AppText>

        {!isPasswordSet && (
          <CreatePassword
            changeEncryptionAndRestart={changeEncryptionAndRestart}
          />
        )}

        {isPasswordSet && !isDeletingPassword && (
          <ChangePassword
            onStartChange={() => setIsChangingPassword(true)}
            onCancelChange={() => setIsChangingPassword(false)}
            changeEncryptionAndRestart={changeEncryptionAndRestart}
          />
        )}

        {isPasswordSet && !isChangingPassword && (
          <DeletePassword
            onStartDelete={() => setIsDeletingPassword(true)}
            onCancelDelete={() => setIsDeletingPassword(false)}
            changeEncryptionAndRestart={changeEncryptionAndRestart}
          />
        )}
      </Segment>
    </AppPage>
  )
}

PasswordSetting.propTypes = {
  navigate: PropTypes.func,
  restartApp: PropTypes.func,
}

export default PasswordSetting
