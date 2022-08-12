import getSensiplanMucus from '../lib/nfp-mucus'

describe('getSensiplanMucus', () => {
  test('returns null if there is no value for feeling or texture', () => {
    expect(getSensiplanMucus()).toBeNull()
    expect(getSensiplanMucus(undefined, 3)).toBeNull()
    expect(getSensiplanMucus(2, undefined)).toBeNull()
  })

  describe('results in t for:', () => {
    test('dry feeling and no texture', function () {
      const sensiplanValue = getSensiplanMucus(0, 0)
      expect(sensiplanValue).toEqual(0)
    })
  })

  describe('results in Ø for:', () => {
    test('no feeling and no texture', function () {
      const sensiplanValue = getSensiplanMucus(1, 0)
      expect(sensiplanValue).toEqual(1)
    })
  })

  describe('results in f for:', () => {
    test('wet feeling and no texture', function () {
      const sensiplanValue = getSensiplanMucus(2, 0)
      expect(sensiplanValue).toEqual(2)
    })
  })

  describe('results in S for:', () => {
    test('dry feeling and creamy texture', function () {
      const sensiplanValue = getSensiplanMucus(0, 1)
      expect(sensiplanValue).toEqual(3)
    })

    test('no feeling and creamy texture', function () {
      const sensiplanValue = getSensiplanMucus(1, 1)
      expect(sensiplanValue).toEqual(3)
    })

    test('wet feeling and creamy texture', function () {
      const sensiplanValue = getSensiplanMucus(2, 1)
      expect(sensiplanValue).toEqual(3)
    })
  })

  describe('results in +S for:', () => {
    test('dry feeling and egg white texture', function () {
      const sensiplanValue = getSensiplanMucus(0, 2)
      expect(sensiplanValue).toEqual(4)
    })

    test('no feeling and egg white texture', function () {
      const sensiplanValue = getSensiplanMucus(1, 2)
      expect(sensiplanValue).toEqual(4)
    })

    test('wet feeling and egg white texture', function () {
      const sensiplanValue = getSensiplanMucus(2, 2)
      expect(sensiplanValue).toEqual(4)
    })

    test('slippery feeling and egg white texture', function () {
      const sensiplanValue = getSensiplanMucus(3, 2)
      expect(sensiplanValue).toEqual(4)
    })

    test('slippery feeling and creamy texture', function () {
      const sensiplanValue = getSensiplanMucus(3, 1)
      expect(sensiplanValue).toEqual(4)
    })

    test('slippery feeling and no texture', function () {
      const sensiplanValue = getSensiplanMucus(3, 0)
      expect(sensiplanValue).toEqual(4)
    })
  })
})
