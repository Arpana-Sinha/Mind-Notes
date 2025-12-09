import { useEffect, useState } from "react";
import type { Note } from "../types/Note";
import { request } from "../api/api";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

interface Props {
  onLogout: () => void;
}

export default function Home({ onLogout }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadNotes() {
    setLoading(true);
    try {
      const data = await request<Note[]>("/notes");
      setNotes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function deleteNote(id: string) {
    try {
      await request(`/notes/${id}`, { method: "DELETE" });
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="home-page">
      <header className="main-header card">
  <div style={{display:'flex',alignItems:'center',gap:12}}>
    <div className="brand">✿</div>
    <div>
      <h1 style={{margin:0}}>Sweet Notes</h1>
      <div className="small">Tiny thoughts, safely stored</div>
    </div>
  </div>

  <div style={{display:'flex',gap:8,alignItems:'center'}}>
    <button className="btn-ghost" onClick={onLogout}>Logout</button>
  </div>
</header>
      <main>
        <NoteForm onCreated={(n) => setNotes((prev) => [n, ...prev])} />
        {loading ? <div>Loading...</div> : <NoteList notes={notes} onDelete={deleteNote} />}
      </main>
    </div>
  );
}
