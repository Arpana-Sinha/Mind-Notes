import type { Note } from "../types/Note";

interface Props { note: Note; onDelete: (id: string) => void; }

export default function NoteItem({ note, onDelete }: Props) {
  return (
    <div className="note-item">
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
    <div style={{flex:1}}>
      <h3>{note.title || 'untitled'}</h3>
      <p>{note.body}</p>
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      <button className="btn-ghost" onClick={()=>note._id && onDelete(note._id)}>Delete</button>
    </div>
  </div>

  <div className="note-meta">
    <small className="small">{note.createdAt ? new Date(note.createdAt).toLocaleString() : ''}</small>
    <div style={{display:'flex',gap:8}}>
      {note.tags?.slice(0,3).map(t=>(
        <div key={t} className="tag">{t}</div>
      ))}
    </div>
  </div>
</div>
  );
}
