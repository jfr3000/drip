import chai from 'chai'
import dirtyChai from 'dirty-chai'

const expect = chai.expect
chai.use(dirtyChai)

import getSensiplanMucus from '../lib/nfp-mucus'

describe('getSensiplanMucus', () => {

  describe('results in t for:', () => {
    it('dry feeling and no texture', function () {
      const sensiplanValue = getSensiplanMucus(0, 0)
      expect(sensiplanValue).to.eql(0)
    })
  })

  describe('results in Ø for:', () => {
    it('no feeling and no texture', function () {
      const sensiplanValue = getSensiplanMucus(1, 0)
      expect(sensiplanValue).to.eql(1)
    })
  })

  describe('results in f for:', () => {
    it('wet feeling and no texture', function () {
      const sensiplanValue = getSensiplanMucus(2, 0)
      expect(sensiplanValue).to.eql(2)
    })
  })

  describe('results in S for:', () => {
    it('dry feeling and creamy texture', function () {
      const sensiplanValue = getSensiplanMucus(0, 1)
      expect(sensiplanValue).to.eql(3)
    })

    it('no feeling and creamy texture', function () {
      const sensiplanValue = getSensiplanMucus(1, 1)
      expect(sensiplanValue).to.eql(3)
    })

    it('wet feeling and creamy texture', function () {
      const sensiplanValue = getSensiplanMucus(2, 1)
      expect(sensiplanValue).to.eql(3)
    })
  })

  describe('results in +S for:', () => {
    it('dry feeling and egg white texture', function () {
      const sensiplanValue = getSensiplanMucus(0, 2)
      expect(sensiplanValue).to.eql(4)
    })

    it('no feeling and egg white texture', function () {
      const sensiplanValue = getSensiplanMucus(1, 2)
      expect(sensiplanValue).to.eql(4)
    })

    it('wet feeling and egg white texture', function () {
      const sensiplanValue = getSensiplanMucus(2, 2)
      expect(sensiplanValue).to.eql(4)
    })

    it('slippery feeling and egg white texture', function () {
      const sensiplanValue = getSensiplanMucus(3, 2)
      expect(sensiplanValue).to.eql(4)
    })

    it('slippery feeling and creamy texture', function () {
      const sensiplanValue = getSensiplanMucus(3, 1)
      expect(sensiplanValue).to.eql(4)
    })

    it('slippery feeling and no texture', function () {
      const sensiplanValue = getSensiplanMucus(3, 0)
      expect(sensiplanValue).to.eql(4)
    })
  })
})
