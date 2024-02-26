import links from './links'

export default {
  export: {
    errors: {
      noData: 'There is no data to export',
      couldNotConvert: 'Could not convert data to CSV',
      problemSharing: 'There was a problem sharing the data export file',
    },
    title: 'My drip. data export',
    subject: 'My drip. data export',
    button: 'Export data',
    segmentExplainer:
      'Export data in CSV format for backup or so you can use it elsewhere',
  },
  deleteSegment: {
    title: 'Delete app data',
    explainer: 'Delete app data from this phone',
    question: 'Do you want to delete app data from this phone?',
    message:
      'Please note that deletion of the app data is permanent and irreversible. We recommend exporting existing data before deletion.',
    confirmation: 'Delete app data permanently',
    errors: {
      couldNotDeleteFile: 'Could not delete data',
      postFix: 'No data was deleted or changed',
      noData: 'There is no data to delete',
    },
    success: {
      message: 'App data successfully deleted',
    },
  },
  tempScale: {
    segmentTitle: 'Temperature scale',
    segmentExplainer:
      'Change the minimum and maximum value for the temperature chart',
    min: 'Min',
    max: 'Max',
    loadError: 'Could not load saved temperature scale settings',
    saveError: 'Could not save temperature scale settings',
  },
  disabled: {
    title: 'This feature is turned off',
    message:
      'To use the temperature scale please first enable the temperature tracking category above.',
  },
  tempReminder: {
    title: 'Temperature reminder',
    noTimeSet: 'Set a time for a daily reminder to take your temperature',
    timeSet: (time) => `Daily reminder set for ${time}`,
    notification: 'Record your morning temperature',
    alertNoTempReminder: {
      title: 'Temperature turned off',
      message:
        'To use the temperature reminder please first enable the temperature tracking category in the customization settings.',
    },
  },
  periodReminder: {
    title: 'Next period reminder',
    reminderText:
      'Get a notification 3 days before your next period is likely to start.',
    notification: (daysToEndOfPrediction) =>
      `Your next period is likely to start in 3 to ${daysToEndOfPrediction} days.`,
    alertNoPeriodReminder: {
      title: 'Period predictions turned off',
      message:
        'To use the period reminder please first enable period predictions in the customization settings.',
    },
  },
  fertilityTracking: {
    title: 'Fertility phases calculation',
    message:
      'If you enter menstrual bleeding, temperature and cervical mucus or cervix data according to the sympto-thermal rules, drip will calculate cycle phases with the provided data.',
    on: 'If you switch this off, drip will not show fertility related information.',
    off: 'If you switch this on, drip will show fertility related information.',
  },
  secondarySymptom: {
    title: 'Secondary symptom',
    cervixModeOn:
      'Cervix values are being used for symptothermal fertility detection. You can switch here to use cervical mucus values for symptothermal fertility detection',
    cervixModeOff:
      'By default, cervical mucus values are being used for symptothermal fertility detection. You can switch here to use cervix values for symptothermal fertility detection',
    disabled: {
      title: 'Disabled',
      message:
        'To set a secondary symptom please first enable the temperature, cervical mucus or cervix tracking category as well as the fertility feature above.',
      noSecondaryEnabled:
        'To switch the secondary symptom both cervical mucus and cervix need to be enabled above.',
    },
    mucus: 'cervical mucus',
    cervix: 'cervix',
  },
  periodPrediction: {
    title: 'Period predictions',
    on: 'drip predicts your 3 next menstrual bleedings based on statistics if you previously tracked at least 3 complete cycles.',
    off: 'There are no predictions for menstrual cycles displayed. If turned on the calendar and the home screen will display period predictions.',
  },
  passwordSettings: {
    title: 'App password',
    explainerDisabled:
      "Encrypt the app's database with a password. You need to enter the password every time the app is started.",
    explainerEnabled:
      'Password protection and database encryption is currently enabled',
    setPassword: 'Set password',
    savePassword: 'Save password',
    changePassword: 'Change password',
    deletePassword: 'Delete password',
    enterCurrent: 'Please enter your current password',
    enterNew: 'Please enter a new password',
    confirmPassword: 'Please confirm your password',
    passwordsDontMatch: "Password and confirmation don't match",
    backupReminder: {
      title: 'Read this before making changes to your password',
      message: `
Just to be safe, please backup your data using the export function before making any changes to your password.\n
Longer passwords are better! Consider using a passphrase.\n
Please also make sure you do not lose your password. There is no way to recover your data if you do.\n
Making any changes to your password setting will keep your data as it was before.\n`,
    },
    deleteBackupReminder: {
      title: 'Read this before deleting your password',
      message: `
Deleting your password means your data will no longer be encrypted.\n
Just to be safe, please backup your data using the export function before deleting your password.\n
Making any changes to your password setting will keep your data as it was before and restart the app.\n    
    `,
    },
    backupReminderAppendix: {
      android:
        'After the password is updated the app will automatically restart.',
      ios: 'After the password is updated the app will automatically close. Please reopen it manually.',
    },
  },
  website: {
    title: 'Website',
  },
  preOvu: {
    title: 'Infertile days at cycle start',
    note: `drip. applies the sympto-thermal method for calculating infertile days at the start of the cycle (see ${links.wiki.url} for more info). However, drip. does not currently apply the so called 20-day-rule, which determines infertile days at the cycle start from past cycle lengths in case no past symptothermal info is available.`,
  },
}
