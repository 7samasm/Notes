const fs = require('fs');

function Notes (title,body) 
{

    this.title = title;
    this.body  =  body;
    this.note  = {
        title : this.title,
        body  : this.body
    };

    let fetchNotes = () => 
    {
        try {
            var notesString = fs.readFileSync('notes-data.json');
            return JSON.parse(notesString);
        } catch (e) {
            return [];
        }
    };

    let saveNotes = (notes) => 
    {
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    };

    this.addNote = () => 
    {
        var fetchedNotes = fetchNotes();
        var duplicateNotes = fetchedNotes.filter((note) => note.title === this.title);
        if (duplicateNotes.length === 0) {
            fetchedNotes.push(this.note);
            saveNotes(fetchedNotes);
            return true;
        }
        return false;
    };

    this.getAll = () => 
    {
        return fetchNotes();
    };

    this.getNote = () => 
    {
        var notes = fetchNotes();
        var filteredNotes = notes.filter((note) => note.title === this.title);
        return filteredNotes[0];
    };
    
    this.removeNote = () => 
    {
        var notes = fetchNotes();
        var filteredNotes = notes.filter((note) => note.title !== this.title);
        saveNotes(filteredNotes);
    
        return notes.length !== filteredNotes.length;
    };
}

Notes.prototype.logNote = (note,msg) => 
{
    msg = msg || '';
    console.log(msg)
    console.log('------------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    Notes
};