export const settings = {
  export: {
    errors: {
      noData: 'There is no data to export',
      couldNotConvert: 'Could not convert data to CSV',
      problemSharing: 'There was a problem sharing the data export file'
    },
    title: 'My Drip data export',
    subject: 'My Drip data export',
    button: 'Export data',
    segmentExplainer: 'Export data in CSV format for backup or so you can use it elsewhere'
  },
  import: {
    button: 'Import data',
    title: 'Keep existing data?',
    message: `There are two options for the import:
1. Keep existing cycle days and replace only the ones in the import file.
2. Delete all existing cycle days and import cycle days from file.`,
    replaceOption: 'Import and replace',
    deleteOption: 'Import and delete existing',
    errors: {
      couldNotOpenFile: 'Could not open file',
      postFix: 'No data was imported or changed'
    },
    success: {
      message: 'Data successfully imported'
    },
    segmentExplainer: 'Import data in CSV format'
  },
  tempScale: {
    segmentTitle: 'Temperature scale',
    segmentExplainer: 'Change the minimum and maximum value for the temperature chart',
    min: 'Min',
    max: 'Max',
    loadError: 'Could not load saved temperature scale settings',
    saveError: 'Could not save temperature scale settings'
  },
  tempReminder: {
    title: 'Temperature reminder',
    noTimeSet: 'Set a time for a daily reminder to take your temperature',
    timeSet: time => `Daily reminder set for ${time}`,
    notification: 'Record your morning temperature'
  },
  periodReminder: {
    title: 'Next period reminder',
    reminderText: 'Get a notification 3 days before your next period is likely to start.',
    notification: daysToEndOfPrediction => `Your next period is likely to start in 3 to ${daysToEndOfPrediction} days.`
  },
  passwordSettings: {
    title: 'App password',
    explainerDisabled: "Encrypt the app's database with a password. You need to enter the password every time the app is started.",
    explainerEnabled: "Password protection and database encryption is currently enabled",
    setPassword: 'Set password',
    savePassword: 'Save password',
    changePassword: 'Change password',
    deletePassword: 'Delete password',
    enterCurrent: "Please enter your current password",
    enterNew: "Please enter a new password",
    confirmPassword: "Please confirm your password",
    passwordsDontMatch: "Password and confirmation don't match",
    backupReminderTitle: 'Read this before making changes to your password',
    backupReminder: 'Just to be safe, please backup your data using the export function before making changes to your password.\n\nLonger passwords are better! Consider using a passphrase.\n\nPlease also make sure you do not lose your password. There is no way to recover your data if you do.\n\nMaking any changes to your password setting will keep your data as it was before and restart the app.',
    deleteBackupReminderTitle: 'Read this before deleting your password',
    deleteBackupReminder: 'Deleting your password means your data will no longer be encrypted.\n\nJust to be safe, please backup your data using the export function before deleting your password.\n\nMaking any changes to your password setting will keep your data as it was before and restart the app.',
  }
}