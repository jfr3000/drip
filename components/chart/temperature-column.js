import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Colors } from '../../styles'

import { Surface, Path } from '@react-native-community/art'

import ChartLine from './chart-line'
import DotAndLine from './dot-and-line'

import { CHART_COLUMN_WIDTH, CHART_STROKE_WIDTH } from '../../config'

const TemperatureColumn = ({
  horizontalLinePosition,
  isVerticalLine,
  data,
  columnHeight,
  isWeekend,
}) => {
  const x = CHART_STROKE_WIDTH / 2

  const backgroundColor = isWeekend ? Colors.greyVeryLight : 'white'
  return (
    <Surface
      width={CHART_COLUMN_WIDTH}
      height={columnHeight}
      style={{ backgroundColor: backgroundColor }}
    >
      <ChartLine path={new Path().lineTo(0, columnHeight)} />

      {horizontalLinePosition && (
        <ChartLine
          path={new Path()
            .moveTo(0, horizontalLinePosition)
            .lineTo(CHART_COLUMN_WIDTH, horizontalLinePosition)}
          isNfpLine={true}
          key="ltl"
        />
      )}

      {isVerticalLine && (
        <ChartLine
          path={new Path().moveTo(x, x).lineTo(x, columnHeight)}
          isNfpLine={true}
          key="fhm"
        />
      )}

      {data && typeof data.y !== 'undefined' && (
        <DotAndLine
          y={data.y}
          exclude={data.temperatureExclude}
          rightY={data.rightY}
          rightTemperatureExclude={data.rightTemperatureExclude}
          leftY={data.leftY}
          leftTemperatureExclude={data.leftTemperatureExclude}
          key="dotandline"
        />
      )}
    </Surface>
  )
}

TemperatureColumn.propTypes = {
  horizontalLinePosition: PropTypes.number,
  isVerticalLine: PropTypes.bool,
  data: PropTypes.object,
  columnHeight: PropTypes.number,
  isWeekend: PropTypes.bool,
}

export default TemperatureColumn
