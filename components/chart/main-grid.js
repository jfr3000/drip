import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'

import LoadingMoreView from './loading-more'

const MainGrid = (props) => {
  const [endReached, setEndReached] = useState(false)
  return (
    <FlatList
      horizontal={true}
      inverted={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      windowSize={30}
      onEndReached={() => setEndReached(true)}
      ListFooterComponent={<LoadingMoreView end={endReached} />}
      updateCellsBatchingPeriod={800}
      {...props}
    />
  )
}

MainGrid.propTypes = {
  height: PropTypes.number,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  initialNumToRender: PropTypes.number,
  contentContainerStyle: PropTypes.object,
}

export default MainGrid
