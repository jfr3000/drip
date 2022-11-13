export default function getSensiplanMucus(feeling, texture) {
  if (typeof feeling != 'number' || typeof texture != 'number') return null

  const feelingMapping = {
    0: 0,
    1: 1,
    2: 2,
    3: 4,
  }
  const textureMapping = {
    0: 0,
    1: 3,
    2: 4,
  }
  const nfpFeelingValue = feelingMapping[feeling]
  const nfpTextureValue = textureMapping[texture]
  return Math.max(nfpFeelingValue, nfpTextureValue)
}
