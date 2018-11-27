import React from 'react'
import { Surface, Group as G, Shape, Transform } from 'react-native/Libraries/ART/ReactNativeART'

export default function HomeDropIcon(props) {
  return (
    <Surface width={83} height={103.56}>
      <G transform={new Transform().scale(props.scale).translate(-345, -330)}>
        <Shape stroke="#89113E" strokeWidth="2" d="M492.723,455.44
 c-5.531,39.136-41.74,66.377-80.876,60.847C372.712,510.757,351,483.64,351,444.115c0-37.555,79.739-114.673,80.391-105.969
 C434.248,376.247,499.843,405.058,492.723,455.44z"/>
      </G>
    </Surface>
  )
}
