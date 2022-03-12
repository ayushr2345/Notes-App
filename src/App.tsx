import './App.css';
// axios for connecting with backend
import axios from 'axios';
import { useEffect, useState } from "react";
import Note from './components/Note/Note';
import INote from './interfaces/note.interface';
import { createNote, deleteNote, getNotes, updateNote } from './services/notesService';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';

function App() {
  const [notesList, setNotesList] = useState<INote[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNote, setNewNote] = useState<Partial<INote>>({
    link: "",
    text: ""
  });

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewNote({
      link: "",
      text: ""
    });
  };
  const handleShowAddModal = () => setShowAddModal(true);
  //useEffect hook is used in begining to get data and render directly
  // and is used when a state is updated
  useEffect(() => {
    getNotesFromServer();
  }, []);

  const getNotesFromServer = async () => {
    const notes = await getNotes();
    setNotesList(notes);
  };

  const addNote = async () => {
    const savedNote =  await createNote(newNote);
    setNotesList([...notesList, savedNote]);
    handleCloseAddModal(); 
  };

  const deleteNoteItem = async (noteToDelete: INote) => {
    await deleteNote (noteToDelete._id);
    const remainingNotes = notesList.filter((noteItem) => {
      return noteItem._id !== noteToDelete._id;
    });
    setNotesList(remainingNotes);
  };

  const updateNoteItem = async (updatedNote: INote) => {
    const noteFromServer = await updateNote(updatedNote); 
    const updatedList = notesList.map((noteItem: INote) => {
      if(noteItem._id === noteFromServer._id) {
        return noteFromServer;
      }
      return noteItem; 
    }); 
    setNotesList(updatedList);
  }


  return (
    <div className="App">
      <Button variant="dark" className='add-button' onClick={handleShowAddModal}>
        <div className='add-button-text'>+</div>
      </Button>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="Text">
            <Form.Control
              onChange={(event) => {
                const newTextValue = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  text: newTextValue
                }); 
              }}
              as="textarea"
              placeholder="Enter your text here"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea" label="Link" className='mb-3 note-link'>
            <Form.Control
              onChange={(event) => {
                const newLinkValue = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  link: newLinkValue
                }); 
              }}
              type='url'
              placeholder="Enter your text here"
            />
          </FloatingLabel>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="notes-list">
        {
          notesList.map((noteItem, index) => {
            return (
              <Note note={noteItem} onNoteUpdate={updateNoteItem} onNoteDelete={deleteNoteItem} key={index}/>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
