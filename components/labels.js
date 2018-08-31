export const shared = {
  cancel: 'Cancel',
  save: 'Save',
  errorTitle: 'Error',
  successTitle: 'Success',
  warning: 'Warning'
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
  SexEditView: 'Sex'
}

export const stats = {
  emptyStats: 'At least one completed cycle is needed to present you with stats here.',
  oneCycleStats: (number) => `You have documented one cycle of ${number} days.`,
  getBasisOfStats: (numberOfCycles) => `Stats are based on ${numberOfCycles} completed cycles.`,
  daysLabel: 'days',
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