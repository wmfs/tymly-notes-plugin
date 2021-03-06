class NotesList {
  init (resourceConfig, env) {
    this.notes = env.bootedServices.storage.models.tymly_notes
  } // init

  async run (event, context) {
    const model = event.model
    const keyString = Object.values(event.keys).join('_')

    const notes = await this.notes.find({
      where: {
        modelName: { equals: model },
        keyString: { equals: keyString }
      }
    })

    context.sendTaskSuccess(notes)
  }
} // class NotesList

module.exports = NotesList
