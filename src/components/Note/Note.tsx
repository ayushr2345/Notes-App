import INote from "../../interfaces/note.interface";
import { FC, FocusEvent } from "react";
import "./Note.css";

// type Props
type Props = {
  // note
  note: INote;
  // onNoteUpdate which is a prop sent by App.tsx to update the note in the noteList
  onNoteUpdate: (note: INote) => void;                            // function prototype: (note: {of type INote}) => void{which returns void}
};

const Note: FC<Props> = ({ note, onNoteUpdate }) => {             // FC is fucntional component: Note: {which is} FC<takes props> = (Props) => {}
    // noteTextUpdated called when onBlur
    // receives an event of type: Focus.....
    const noteTextUpdated = (event: FocusEvent<HTMLDivElement, Element>) => {
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
      <div className="note">
        <div
          onBlur={noteTextUpdated}
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
