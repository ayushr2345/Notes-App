import './App.css';
// axios for connecting with backend
import axios from 'axios';
import { useEffect, useState } from "react";
import DUMMY_NOTES from './DUMMY_NOTES';
import Note from './components/Note/Note';
import INote from './interfaces/note.interface';

function App() {
  const [notesList, setNotesList] = useState<INote[]>([]);
  //useEffect hook is used in begining to get data and render directly
  // and is used when a state is updated

  // first useEffect for load the notes using DUMMY_NOTES and then do not re render the page
  useEffect(() => {
    // check if there is a localstorage list available and if not the render the DUMMY_NOTES
    const listFromStorageString = localStorage.getItem('my-notes');
    if (listFromStorageString) {
      // convert string to array
      const listFromStorageArray = JSON.parse(listFromStorageString);
      setNotesList(listFromStorageArray);
    } else {
      setNotesList(DUMMY_NOTES);
    }
  }, []);

  useEffect(() => {
    console.log("Saving to local storage");
    
    // localStorage.setItem uses the second parameter as as string so we convert the array to string
    
    const notesListString = JSON.stringify(notesList);
    localStorage.setItem('my-notes', notesListString);
  }, [notesList]);

  const updateNoteItem = (updatedNote: INote) => {
    const updatedList = notesList.map((noteItem: INote) => {
      if(noteItem._id === updatedNote._id) {
        return updatedNote;
      }
      return noteItem; 
    }); 
    setNotesList(updatedList);
  }

  return (
    <div className="App">
      <div className="notes-list">
        {
          notesList.map((noteItem, index) => {
            return (
              <Note note={noteItem} onNoteUpdate={updateNoteItem} key={index}/>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
