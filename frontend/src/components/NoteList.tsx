import type { Note } from "../types/Note";
import NoteItem from "./NoteItem";

interface Props {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: Props) {
  if (!notes.length) return <div>No notes yet.</div>;
  return (
    <div className="note-list">
      {notes.map((n) => (
        <NoteItem key={n._id} note={n} onDelete={onDelete} />
      ))}
    </div>
  );
}
