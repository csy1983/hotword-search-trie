/* global describe, it */
const expect = require('chai').expect
const HotwordSearchTrie = require('../src')

describe('HotwordSearchTrie', () => {
  const hstrie = new HotwordSearchTrie()
  const hotwords = [
    'ok google',
    'hey google',
    'hey siri',
    'alexa',
    'lights on',
    'lights off',
    'turn on tv',
    'turn off tv',
    'call my wife',
    'what time is it',
    'make coffee'
  ]
  const SILENT = '{SILENT}'
  const clausesWithHotword = [
    ['ok! google'],
    ['hey siri baby'],
    ['hey alexa'],
    ['turn the lights on'],
    ['please turn the lights', 'on now'],
    ['lights off please'],
    ['lights off and on'],
    ['turn the', SILENT, 'lights on'],
    ['turn on the tv'],
    ['turn the tv lights off'],
    ['turn off tv and lights off'],
    ['alexa, call my lovely wife now'],
    ['please call', 'my super lovely', 'wife'],
    ['what the heck time is it?'],
    ['ok google, what time', 'is it'],
    ['hey siri or google, turn on the tv, turn lights on also and make me some coffee!'],
    ['alexa, turn on', 'the tv and lights off']
  ]
  const hotwordAnswers = [
    ['ok google'],
    ['hey siri'],
    ['alexa'],
    ['lights on'],
    ['lights on'],
    ['lights off'],
    ['lights off'],
    ['lights on'],
    ['turn on tv'],
    ['lights off'],
    ['turn off tv', 'lights off'],
    ['alexa', 'call my wife'],
    ['call my wife'],
    ['what time is it'],
    ['ok google', 'what time is it'],
    ['hey siri', 'turn on tv', 'lights on', 'make coffee'],
    ['alexa', 'turn on tv', 'lights off']
  ]
  const clausesWithoutHotword = [
    ['google'],
    ['ok siri'],
    ['hey', SILENT, 'google'],
    ['hey i just met you', SILENT, 'and this is siri'],
    ['turn on lights'],
    ['lights', '{SILENT}', 'off'],
    ['turn the tv on'],
    ['turn the tv', 'off'],
    ['call my', SILENT, 'the other wife'],
    ['what is it'],
    ['is it time to go']
  ]

  it('should build a hotword search trie without error', function (done) {
    hstrie.build(hotwords)
    done()
  })

  clausesWithHotword.forEach(function (clauses, i) {
    it(`should find hotword: ${clauses}`, function (done) {
      let found = []

      for (let clause of clauses) {
        if (clause === SILENT) {
          hstrie.resetSearch()
          continue
        }
        found = found.concat(hstrie.search(clause))
      }

      expect(found).to.eql(hotwordAnswers[i])
      done()
    })
  })

  clausesWithoutHotword.forEach(function (clauses, i) {
    it(`should find no hotword: ${clauses}`, function (done) {
      let found = []

      for (let clause of clauses) {
        if (clause === SILENT) {
          hstrie.resetSearch()
          continue
        }
        found = found.concat(hstrie.search(clause))
      }
      expect(found).to.be.an('array').to.be.empty // eslint-disable-line
      done()
    })
  })
})
