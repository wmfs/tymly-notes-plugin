/* eslint-env mocha */

const expect = require('chai').expect
const NotesList = require('../lib/components/state-resources/add-note')

describe('Notes Add tests', () => {
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
        },
        note: 'a note'
      },
      row => {
        expect(row).to.eql({
          modelName: 'test_simple',
          keyString: 'apple',
          note: 'a note'
        })
      }
    ],
    [
      'compound key',
      {
        model: 'test_compound',
        keys: {
          type: 'apple',
          variety: 'royalGala'
        },
        note: 'crunchy'
      },
      row => {
        expect(row).to.eql({
          modelName: 'test_compound',
          keyString: 'apple_royalGala',
          note: 'crunchy'
        })
      }
    ]
  ]

  for (const [label, event, notesMock] of tests) {
    it(`${label} notes`, done => {
      const isOk = () => { done(tymlyNotes.createed ? null : new Error('No create!')) }

      tymlyNotes.createed = false
      tymlyNotes.create = row => {
        tymlyNotes.createed = true
        notesMock(row)
      }

      notesLister.run(
        event,
        {
          sendTaskSuccess: isOk
        }
      )
        .catch(err => done(err))
    })
  }
})
