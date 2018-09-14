export const shared = {
  cancel: 'Cancel',
  save: 'Save',
  errorTitle: 'Error',
  successTitle: 'Success',
  warning: 'Warning',
  incorrectPassword: 'Password incorrect',
  incorrectPasswordMessage: 'That password is incorrect.',
  tryAgain: 'Try again',
  ok: 'OK'
}

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
  passwordSettings: {
    title: 'App password',
    explainerDisabled: "Encrypt the app's database with a password. You have to enter the password every time the app is started.",
    explainerEnabled: "Password protection and database encryption is currently enabled",
    deletePassword: "Delete password",
    enterCurrent: "Please enter your current password",
    backupReminderTitle: 'Have you made a backup of your data?',
    backupReminder: 'When you make changes to your password, we delete your old data and store it in a new version. To be safe, please backup your data using the export function before making changes to your password. Making any changes to your password setting will also restart the app immediately.',
  }
}

export const headerTitles = {
  Home: 'Home',
  Calendar: 'Calendar',
  Chart: 'Chart',
  Stats: 'Statistics',
  Settings: 'Settings',
  BleedingEditView: 'Bleeding',
  TemperatureEditView: 'Temperature',
  MucusEditView: 'Mucus',
  CervixEditView: 'Cervix',
  NoteEditView: 'Note',
  DesireEditView: 'Desire',
  SexEditView: 'Sex',
  PainEditView: 'Pain'
}

export const stats = {
  cycleLengthTitle: 'Cycle length',
  cycleLengthExplainer: 'Basic statistics about the length of your cycles.',
  emptyStats: 'At least one completed cycle is needed to present you with stats here.',
  //oneCycleStats: (number) => `You have documented one cycle of ${number} days.`,
  oneCycleStats: 'You have documented one cycle of',
  daysLabel: 'days',
  //getBasisOfStats: (numberOfCycles) => `Stats are based on ${numberOfCycles} completed cycles.`,
  basisOfStatsBeginning: 'Stats are based on',
  basisOfStatsEnd: 'completed cycles.',
  averageLabel: 'Average cycle length',
  minLabel: 'Shortest cycle',
  maxLabel: 'Longest cycle',
  stdLabel: 'Standard deviation'
}

export const bleedingPrediction = {
  noPrediction: 'There is not enough period data to predict the next one.',
  predictionInFuture: (startDays, endDays) => `Your next period is likely to start in ${startDays} to ${endDays} days.`,
  predictionStartedXDaysLeft: (numberOfDays) => `Your period is likely to start today or during the next ${numberOfDays} days.`,
  predictionStarted1DayLeft: 'Your period is likely to start today or tomorrow.',
  predictionStartedNoDaysLeft: 'Your period is likely to start today.',
  predictionInPast: (startDate, endDate) => `Based on your documented data, your period was likely to start between ${startDate} and ${endDate}.`
}

export const passwordPrompt = {
  title: 'Unlock app',
  enterPassword: 'Enter password here'
}