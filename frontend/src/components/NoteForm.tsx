import { useState } from "react";
import type { Note } from "../types/Note";
import { request } from "../api/api";

interface Props { onCreated: (note: Note) => void; }

export default function NoteForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;
    setLoading(true);
    try {
      const note = await request<Note>("/notes", {
        method: "POST",
        body: JSON.stringify({ title, body }),
      });
      onCreated(note);
      setTitle("");
      setBody("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
   <div className="card">
  <h3 style={{margin:0}}>Add a little note ✨</h3>
  <p className="small" style={{marginTop:6}}>Tip: press Add to save</p>

  <form onSubmit={handleSubmit} style={{marginTop:10}}>
    <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title (optional)"/>
    <textarea value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Write something sweet..."/>
    <div style={{display:'flex',gap:8,marginTop:8}}>
      <button className="btn" type="submit">{loading ? 'Saving...' : 'Add Note'}</button>
      <button type="button" className="btn-ghost" onClick={()=>{ setTitle(''); setBody(''); }}>Clear</button>
    </div>
  </form>
</div>

  );
}
