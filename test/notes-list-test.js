/* eslint-env mocha */

const expect = require('chai').expect
const NotesList = require('../lib/components/state-resources/notes-list')

describe('Notes Trail tests', () => {
  const tymlyNotes = {

  }

  const env = {
    bootedServices: {
      storage: {
        models: {
          tymly_notes: tymlyNotes
        }
      }
    }
  }

  let notesLister
  before(() => {
    notesLister = new NotesList()
    notesLister.init(
      null,
      env
    )
  })

  const tests = [
    [
      'simple key',
      {
        model: 'test_simple',
        keys: {
          id: 'apple'
        }
      },
      opts => {
        expect(opts.where.modelName).to.eql({ equals: 'test_simple' })
        expect(opts.where.keyString).to.eql({ equals: 'apple' })
      }
    ],
    [
      'compound key',
      {
        model: 'test_compound',
        keys: {
          type: 'apple',
          variety: 'royalGala'
        }
      },
      opts => {
        expect(opts.where.modelName).to.eql({ equals: 'test_compound' })
        expect(opts.where.keyString).to.eql({ equals: 'apple_royalGala' })
      }
    ]
  ]

  for (const [label, event, notesMock] of tests) {
    it(`${label} notes`, done => {
      tymlyNotes.find = notesMock
      notesLister.run(
        event,
        {
          sendTaskSuccess: done
        }
      ).catch(err => done(err))
    })
  }
})
