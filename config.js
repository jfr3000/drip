import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native'

export const ACTION_DELETE = 'delete'
export const ACTION_EXPORT = 'export'
export const ACTION_IMPORT = 'import'

export const SYMPTOMS = [
  'bleeding',
  'temperature',
  'mucus',
  'cervix',
  'sex',
  'desire',
  'pain',
  'mood',
  'note',
]

const windowWidth = Dimensions.get('window').width
const factor = (windowWidth < 1000) && (Platform.OS === 'ios') ? 1.25 : 1
export const fontRatio = PixelRatio.getFontScale() * factor
export const CHART_COLUMN_WIDTH = 32
export const CHART_COLUMN_MIDDLE = CHART_COLUMN_WIDTH / 2
export const CHART_DOT_RADIUS = 6
export const CHART_GRID_LINE_HORIZONTAL_WIDTH =
  PixelRatio.roundToNearestPixel(0.3)
export const CHART_ICON_SIZE = 20
export const CHART_STROKE_WIDTH = 3
export const CHART_SYMPTOM_HEIGHT_RATIO = 0.08
export const CHART_XAXIS_HEIGHT_RATIO = 0.1
export const CHART_YAXIS_WIDTH = 32
export const CHART_TICK_WIDTH = 44

export const TEMP_SCALE_MAX = 37.5
export const TEMP_SCALE_MIN = 35.5
export const TEMP_SCALE_UNITS = 0.1
export const TEMP_MAX = 39
export const TEMP_MIN = 35
export const TEMP_SLIDER_STEP = 0.5

export const HIT_SLOP = { top: 20, bottom: 20, left: 20, right: 20 }

export const STATUSBAR_HEIGHT = StatusBar.currentHeight
