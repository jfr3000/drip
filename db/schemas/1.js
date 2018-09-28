const TemperatureSchema = {
  name: 'Temperature',
  properties: {
    value: 'double',
    exclude: 'bool',
    time: {
      type: 'string',
      optional: true
    },
    note: {
      type: 'string',
      optional: true
    }
  }
}

const BleedingSchema = {
  name: 'Bleeding',
  properties: {
    value: 'int',
    exclude: 'bool'
  }
}

const MucusSchema = {
  name: 'Mucus',
  properties: {
    feeling: 'int',
    texture: 'int',
    value: 'int',
    exclude: 'bool'
  }
}

const CervixSchema = {
  name: 'Cervix',
  properties: {
    opening: 'int',
    firmness: 'int',
    position: {type: 'int', optional: true },
    exclude: 'bool'
  }
}

const NoteSchema = {
  name: 'Note',
  properties: {
    value: 'string'
  }
}

const DesireSchema = {
  name: 'Desire',
  properties: {
    value: 'int'
  }
}

const SexSchema = {
  name: 'Sex',
  properties: {
    solo: { type: 'bool', optional: true },
    partner: { type: 'bool', optional: true },
    condom: { type: 'bool', optional: true },
    pill: { type: 'bool', optional: true },
    iud: { type: 'bool', optional: true },
    patch: { type: 'bool', optional: true },
    ring: { type: 'bool', optional: true },
    implant: { type: 'bool', optional: true },
    diaphragm: { type: 'bool', optional: true },
    none: { type: 'bool', optional: true },
    other: { type: 'bool', optional: true },
    note: { type: 'string', optional: true }
  }
}

const PainSchema = {
  name: 'Pain',
  properties: {
    cramps: { type: 'bool', optional: true },
    ovulationPain: { type: 'bool', optional: true },
    headache: { type: 'bool', optional: true },
    backache: { type: 'bool', optional: true },
    nausea: { type: 'bool', optional: true },
    tenderBreasts: { type: 'bool', optional: true },
    migraine: { type: 'bool', optional: true },
    other: { type: 'bool', optional: true },
    note: { type: 'string', optional: true }
  }
}

const CycleDaySchema = {
  name: 'CycleDay',
  primaryKey: 'date',
  properties: {
    date: 'string',
    temperature: {
      type: 'Temperature',
      optional: true
    },
    bleeding: {
      type: 'Bleeding',
      optional: true
    },
    mucus: {
      type: 'Mucus',
      optional: true
    },
    cervix: {
      type: 'Cervix',
      optional: true
    },
    note: {
      type: 'Note',
      optional: true
    },
    desire: {
      type: 'Desire',
      optional: true
    },
    sex: {
      type: 'Sex',
      optional: true
    },
    pain: {
      type: 'Pain',
      optional: true
    }
  }
}

export default {
  schema: [
    CycleDaySchema,
    TemperatureSchema,
    BleedingSchema,
    MucusSchema,
    CervixSchema,
    NoteSchema,
    DesireSchema,
    SexSchema,
    PainSchema
  ],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion >= 1) return
    const oldCycleDays = oldRealm.objects('CycleDay')
    const newCycleDays = newRealm.objects('CycleDay')

    oldCycleDays.forEach((day, i) => {
      if (!day.sex) return
      newCycleDays[i].sex.diaphragm = null
      newCycleDays[i].sex.none = null
    })
  }
}
