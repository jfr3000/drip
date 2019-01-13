export const mucusNFP = ['t', 'Ø', 'f', 'S', 'S+']
export const intensity = ['low', 'medium', 'high']

export const bleeding = {
    labels: ['spotting', 'light', 'medium', 'heavy'],
    heaviness: {
        header: "Heaviness",
        explainer: "How heavy is the bleeding?",
    },
    exclude: {
        header: "Exclude",
        explainer: "You can exclude this value if it's not menstrual bleeding"
    }
}

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
  },
  actionHint: 'Choose values for at least "Opening" and "Firmness" to save.'
}

export const mucus = {
  feeling: {
    categories: ['dry', 'nothing', 'wet', 'slippery'],
    explainer: 'What does your vaginal entrance feel like?'
  },
  texture: {
    categories: ['nothing', 'creamy', 'egg white'],
    explainer: "Looking at and touching your cervical mucus, which describes it best?"
  },
  excludeExplainer: "You can exclude this value if you don't want to use it for fertility detection",
  actionHint: 'Choose values for both "Feeling" and "Texture" to save.'
}

export const desire = {
  header: 'Intensity',
  explainer: 'How would you rate your sexual desire?'
}

export const sex = {
  categories:{
    solo: 'Solo',
    partner: 'Partner',
  },
  header: "Activity",
  explainer: 'Were you sexually active today?',
}

export const contraceptives = {
  categories:{
    condom: 'Condom',
    pill: 'Pill',
    iud: 'IUD',
    patch: 'Patch',
    ring: 'Ring',
    implant: 'Implant',
    diaphragm: 'Diaphragm',
    none: 'None',
    other: 'Other',
  },
  header: "Contraceptives",
  explainer: 'Did you use contraceptives?'
}

export const pain = {
  categories: {
    cramps: 'Cramps',
    ovulationPain: 'Ovulation pain',
    headache: 'Headache',
    backache: 'Backache',
    nausea: 'Nausea',
    tenderBreasts: 'Tender breasts',
    migraine: 'Migraine',
    other: 'Other'
  },
  explainer: 'How did your body feel today?'
}

export const temperature = {
  outOfRangeWarning: 'This temperature value is out of the current range for the temperature chart. You can change the range in the settings.',
  outOfAbsoluteRangeWarning: 'This temperature value is too high or low to be shown on the temperature chart.',
  saveAnyway: 'Save anyway',
  temperature: {
    header: "Temperature (°C)",
    explainer: 'Take your temperature right after waking up, before getting out of bed'
  },
  time: "Time",
  note: {
    header: "Note",
    explainer: 'Is there anything that could have influenced this value, such as bad sleep or alcohol consumption?'
  },
  exclude: {
    header: "Exclude",
    explainer: "You can exclude this value if you don't want to use it for fertility detection"
  }
}

export const noteExplainer = "Anything you want to add for the day?"

export const sharedDialogs = {
  cancel: 'Cancel',
  areYouSureTitle: 'Are you sure?',
  areYouSureToUnset: 'Are you sure you want to unset all entered data?',
  reallyUnsetData: 'Yes, I am sure',
  save: 'Save',
  unset: 'Unset',
  disabledInfo: 'There is some data missing'
}
