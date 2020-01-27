class AddNote {
  init (resourceConfig, env) {
    this.notes = env.bootedServices.storage.models.tymly_notes
  } // init

  async run (event, context) {
    const { model, note } = event
    const keyString = Object.values(event.keys).join('_')

    await this.notes.create({
      modelName: model,
      keyString: keyString,
      note: note
    })

    context.sendTaskSuccess()
  } // run
} // class AddNote

module.exports = AddNote
