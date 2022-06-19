import labels from './settings'
const settingsTitles = labels.menuItems

export const home = {
  unknown: '?',
  phase: (n) => `${['1st', '2nd', '3rd'][n - 1]} cycle phase`,
}

export const chart = {
  tutorial: 'You can swipe the chart to view more dates.',
}

export const shared = {
  cancel: 'Cancel',
  save: 'Save',
  dataSaved: 'Symptom data was saved',
  dataDeleted: 'Symptom data was deleted',
  errorTitle: 'Error',
  successTitle: 'Success',
  warning: 'Warning',
  incorrectPassword: 'Password incorrect',
  incorrectPasswordMessage: 'That password is incorrect.',
  tryAgain: 'Try again',
  ok: 'OK',
  confirmToProceed: 'Confirm to proceed',
  date: 'Date',
  loading: 'Loading ...',
  noDataWarning: "You haven't entered any data yet.",
  noTemperatureWarning: "You haven't entered any temperature data yet.",
  noDataButtonText: 'Start entering data now',
  enter: 'Enter',
  remove: 'Remove',
  learnMore: 'Learn more',
}

export const headerTitles = {
  Home: 'Home',
  Calendar: 'Calendar',
  Chart: 'Chart',
  Stats: 'Statistics',
  SettingsMenu: 'Settings',
  Reminders: settingsTitles.reminders.name,
  NfpSettings: settingsTitles.nfpSettings.name,
  DataManagement: settingsTitles.dataManagement.name,
  Password: settingsTitles.password.name,
  About: 'About',
  License: 'License',
  PrivacyPolicy: 'Privacy Policy',
  bleeding: 'Bleeding',
  temperature: 'Temperature',
  mucus: 'Cervical Mucus',
  cervix: 'Cervix',
  note: 'Note',
  desire: 'Desire',
  sex: 'Sex',
  pain: 'Pain',
  mood: 'Mood',
}

export const stats = {
  cycleLengthExplainer: 'Basic statistics about the length of your cycles.',
  emptyStats: 'At least one completed cycle is needed to display stats.',
  daysLabel: 'days',
  basisOfStatsEnd: 'completed\ncycles',
  averageLabel: 'Average cycle',
  minLabel: `Shortest`,
  maxLabel: `Longest`,
  stdLabel: `Standard\ndeviation`,
}

export const bleedingPrediction = {
  predictionInFuture: (startDays, endDays) =>
    `Your next period is likely to start in ${startDays} to ${endDays} days.`,
  predictionStartedXDaysLeft: (numberOfDays) =>
    `Your period is likely to start today or within the next ${numberOfDays} days.`,
  predictionStarted1DayLeft:
    'Your period is likely to start today or tomorrow.',
  predictionStartedNoDaysLeft: 'Your period is likely to start today.',
  predictionInPast: (startDate, endDate) =>
    `Based on your documented data, your period was likely to start between ${startDate} and ${endDate}.`,
}

export const passwordPrompt = {
  title: 'Unlock app',
  enterPassword: 'Enter password here',
  deleteDatabaseExplainer:
    "If you've forgotten your password, unfortunately, there is nothing we can do to recover your data, because it is encrypted with the password only you know. You can, however, delete all your encrypted data and start fresh. Once all data has been erased, you can set a new password in the settings, if you like.",
  forgotPassword: 'Forgot your password?',
  deleteDatabaseTitle: 'Forgot your password?',
  deleteData: 'Yes, delete all my data',
  areYouSureTitle: 'Are you sure?',
  areYouSure:
    'Are you absolutely sure you want to permanently delete all your data?',
  reallyDeleteData: 'Yes, I am sure',
}

export const fertilityStatus = {
  fertile: 'fertile',
  infertile: 'infertile',
  fertileUntilEvening: 'Fertile phase ends in the evening',
  unknown:
    'We cannot show any cycle information because no period data has been added.',
  preOvuText:
    "With NFP rules, you may assume 5 days of infertility at the beginning of your cycle, provided you don't observe any fertile cervical mucus or cervix values.",
  periOvuText:
    'We were not able to detect both a temperature shift and cervical mucus or cervix shift.',
  periOvuUntilEveningText: (tempRule) => {
    return (
      'We detected a temperature shift (' +
      ['regular', '1st exception', '2nd exception'][tempRule] +
      ' temperature rule), as well as a cervical mucus/cervix shift according to NFP rules. In the evening today you may assume infertility, but ' +
      'always remember to double-check for yourself. Make sure the data makes sense to you.'
    )
  },
  postOvuText: (tempRule) => {
    return (
      'We detected a temperature shift (' +
      ['regular', '1st exception', '2nd exception'][tempRule] +
      ' temperature rule), as well as a cervical mucus/cervix shift according to NFP rules. You may assume infertility, but always remember to ' +
      'double-check for yourself. Make sure the data makes sense to you.'
    )
  },
}
