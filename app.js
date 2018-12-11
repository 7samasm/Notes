/**
 * on dev branch
 */
// const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./src/notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions,
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

var command = argv._[0];



let note,
notesObj = new notes.Notes(argv.title,argv.body);

if (command === 'add')
{
   note = notesObj.addNote();
   note ? notesObj.logNote(note,'Note created') : console.log('Note title taken');
}
else if (command === 'list')
{
    var allNotes = notesObj.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notesObj.logNote(note));
}
else if (command === 'read')
{
    note = notesObj.getNote();
    note ? notesObj.logNote(note,'Note found'): console.log('Note not found');
}
else if (command === 'remove')
{
    var noteRemoved = notesObj.removeNote();
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}
else { console.log('Command not recognized');}