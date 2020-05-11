const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => "Your notes..." 

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push(
            {
                title: title,
                body: body,
            }
        )
        console.log('new note')
    } else {
        console.log(chalk.red('Note already exist.'))
    }

    saveNotes(notes)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No Note Found!'))
    }

}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)

    if (foundNote) {
        console.log(chalk.bold(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red('No note found.'))
    }
    
}

const saveNotes = (notes) => {
    fs.writeFileSync('data.json', JSON.stringify(notes))
}

const loadNotes = () => {
    try {
      const data = fs.readFileSync("data.json");
      return JSON.parse(data.toString());
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
} 