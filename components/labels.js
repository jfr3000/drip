export const settings = {
  errors: {
    noData: 'There is no data to export',
    couldNotConvert: 'Could not convert data to CSV',
    problemSharing: 'There was a problem sharing the data export file'
  },
  exportTitle: 'My Drip data export',
  exportSubject: 'My Drip data export',
  buttonLabel: 'Export data'
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