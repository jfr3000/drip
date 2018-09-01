export const bleeding = ['spotting', 'light', 'medium', 'heavy']
export const mucusFeeling = ['dry', 'nothing', 'wet', 'slippery']
export const mucusTexture = ['nothing', 'creamy', 'egg white']
export const mucusNFP = ['t', 'Ø', 'f', 'S', 'S+']
export const intensity = ['low', 'medium', 'high']

export const cervix = {
  opening: {
    categories: ['closed', 'medium', 'open'],
    explainer: 'Is your cervix open or closed?'
  },
  firmness: {
    categories: ['hard', 'soft'],
    explainer: "When it's hard it might feel like the tip of your nose"
  },
  position: {
    categories: ['low', 'medium', 'high'],
    explainer: 'How high up in the vagina is the cervix?'
  }
}

export const desire = {
  header: 'Intensity',
  explainer: 'How would you rate your sexual desire?'
}

export const sex = {
  solo: 'Solo',
  partner: 'Partner',
  condom: 'Condom',
  pill: 'Pill',
  iud: 'IUD',
  patch: 'Patch',
  ring: 'Ring',
  implant: 'Implant',
  other: 'Other'
}

export const pain = {
  cramps: 'Cramps',
  ovulationPain: 'Ovulation pain',
  headache: 'Headache',
  backache: 'Backache',
  nausea: 'Nausea',
  tenderBreasts: 'Tender breasts',
  migraine: 'Migraine',
  other: 'Other',
  note: 'Note'
}

export const fertilityStatus = {
  fertile: 'fertile',
  infertile: 'infertile',
  fertileUntilEvening: 'Fertile phase ends in the evening',
  unknown: 'We cannot show any cycle information because no menses has been entered'
}

export const temperature = {
  outOfRangeWarning: 'This temperature value is out of the current range for the temperature chart. You can change the range in the settings.',
  outOfAbsoluteRangeWarning: 'This temperature value is too high or low to be shown on the temperature chart.',
  saveAnyway: 'Save anyway'
}
