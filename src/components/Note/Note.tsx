import INote from "../../interfaces/note.interface";
import { FC, FocusEvent, useState } from "react";
import "./Note.css";

// type Props
type Props = {
  // note
  note: INote;
  // onNoteUpdate which is a prop sent by App.tsx to update the note in the noteList
  onNoteUpdate: (note: INote) => void;                            // function prototype: (note: {of type INote}) => void{which returns void}
  onNoteDelete: (note: INote) => void;
};

const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete }) => {             // FC is fucntional component: Note: {which is} FC<takes props> = (Props) => {}
    
    const [isFocused, setIsFocused] = useState(false);

    // noteTextUpdated called when onBlur
    // receives an event of type: Focus.....
    const noteTextUpdated = (event: FocusEvent<HTMLDivElement, Element>) => {
        setIsFocused(false);
        const newTextValue = event.currentTarget.textContent;
        if (newTextValue === note.text) {
          return ;
        }
        const updatedNoteObject: INote = {
            ...note,
            text: newTextValue || "",
        }
        onNoteUpdate(updatedNoteObject);
    };


    return (
      <div className={isFocused ? "note note--focused" : "note"}>
        <button
          onClick={() => {
            onNoteDelete(note);
          }} 
          type="button" 
          className="btn-close" 
          aria-label="Close"
          >
        </button>
        <div
          onBlur={noteTextUpdated}
          onFocus={() => {
            setIsFocused(true);
          }}
          className="note__text"
          suppressContentEditableWarning={true}
          contentEditable={true}
        >
          {note.text}
        </div>
        <div className="note__link ">
          <a href={note.link}>{note.link}</a>
        </div>
      </div>
  );
};

export default Note;
