import { PixelRatio, StatusBar } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

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

export const CHART_COLUMN_WIDTH = 32
export const CHART_COLUMN_MIDDLE = CHART_COLUMN_WIDTH / 2
export const CHART_DOT_RADIUS = scale(6)
export const CHART_GRID_LINE_HORIZONTAL_WIDTH =
  PixelRatio.roundToNearestPixel(0.3)
export const CHART_ICON_SIZE = scale(20)
export const CHART_STROKE_WIDTH = scale(3)
export const CHART_SYMPTOM_HEIGHT_RATIO = scale(0.08)
export const CHART_XAXIS_HEIGHT_RATIO = scale(0.1)
export const CHART_YAXIS_WIDTH = scale(32)
export const CHART_TICK_WIDTH = scale(44)

export const TEMP_SCALE_MAX = 37.5
export const TEMP_SCALE_MIN = 35.5
export const TEMP_SCALE_UNITS = 0.1
export const TEMP_MAX = 39
export const TEMP_MIN = 35
export const TEMP_SLIDER_STEP = 0.5

export const HIT_SLOP = {
  top: verticalScale(20),
  bottom: verticalScale(20),
  left: scale(20),
  right: scale(20),
}

export const STATUSBAR_HEIGHT = StatusBar.currentHeight
