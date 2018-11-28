import React from 'react'
import { Group as G, Shape, Transform } from 'react-native/Libraries/ART/ReactNativeART'

const circle = "m 43,12 c -27.59196,17.168 -43.07131,51.34003 -37.74253,83.40217 4.65932,33.15379 31.20731,61.73087 63.90256,68.88417 30.61528,7.42782 64.74574,-4.34916 84.21519,-29.12633 21.61526,-26.12878 24.59233,-65.67005 7.10091,-94.73675 -7.6702,-13.15691 -18.99314,-24.14869 -32.37613,-31.41826"
const pointyPart = "m 43,32 c -0.0509,-6.38363 0.10148,-12.77739 -0.0757,-19.15472 -1.02117,-5.71918 -7.64221,-3.72111 -11.7681,-4.08628 -3.79908,0 -7.59816,0 -11.39724,0"
const color = "#1E0B7A"

export default function CycleDayIcon(props) {
  return (
    <G transform={new Transform().scale(props.scale)}>
      <Shape stroke={color} strokeWidth={props.strokeWidth} d={circle}/>
      <Shape stroke={color} strokeWidth={props.strokeWidth} d={pointyPart}/>
    </G>
  )
}