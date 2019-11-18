import React from 'react'
import PropTypes from 'prop-types'

import { Surface , Path } from 'react-native/Libraries/ART/ReactNativeART'

import ChartLine from './chart-line'
import DotAndLine from './dot-and-line'

import styles from './styles'
import config from '../../config'

const TemperatureColumn = ({
  horizontalLinePosition,
  isVerticalLine,
  data,
  columnHeight
}) => {

  const x = styles.nfpLine.strokeWidth / 2

  return (
    <Surface width={config.columnWidth} height={columnHeight}>

      <ChartLine
        path={new Path().lineTo(0, columnHeight)}
      />

      {horizontalLinePosition && <ChartLine
        path={new Path()
          .moveTo(0, horizontalLinePosition)
          .lineTo(config.columnWidth, horizontalLinePosition)
        }
        isNfpLine={true}
        key='ltl'
      />}

      {isVerticalLine && <ChartLine
        path={new Path().moveTo(x, x).lineTo(x, columnHeight)}
        isNfpLine={true}
        key='fhm'
      />}

      {data && data.y && <DotAndLine
        y={data.y}
        exclude={data.temperatureExclude}
        rightY={data.rightY}
        rightTemperatureExclude={data.rightTemperatureExclude}
        leftY={data.leftY}
        leftTemperatureExclude={data.leftTemperatureExclude}
        key='dotandline'
      />}

    </Surface>
  )
}

TemperatureColumn.propTypes = {
  horizontalLinePosition: PropTypes.number,
  isVerticalLine: PropTypes.bool,
  data: PropTypes.object,
  columnHeight: PropTypes.number,
}

export default TemperatureColumn
