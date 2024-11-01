import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const UpdateNote = () => {
  const navigate = useNavigate();

  const [Loading, setLoading] = useState(true);
  const [note, setNote] = useState({
    title: "",
    description: "",
    color: "",
  });
  const { id } = useParams();
  const handlerForm = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(note),
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(" Note updated successfully");
    }
    if (!data.success) {
      toast.error(data.error);
    }
    navigate("/notes");
  };

  const getNote = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/notes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();

    if (data.success) {
      const noteData = data.data;
      setNote({
        title: noteData.title,
        description: noteData.description,
        color: noteData.color,
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    getNote();
  }, []);
  if (Loading) return <div className=''>Loading...</div>;
  return (
    <div>
      <div className='flex  m-auto  items-center min-h-[80vh] w-[350px]'>
        <form className='flex flex-col gap-4 w-full ' onSubmit={handlerForm}>
          <input
            onChange={(e) => {
              setNote({ ...note, title: e.target.value });
            }}
            value={note.title}
            type='text'
            className='bg-gray-100 p-2 rounded-md'
            placeholder='Tilte'
            name='title'
          />
          <textarea
            key='id'
            onChange={(e) => {
              setNote({ ...note, description: e.target.value });
            }}
            rows={3}
            className='bg-gray-100 p-2 rounded-md'
            placeholder='Description'
            name='description'
            value={note.description}></textarea>
          <select
            className='bg-gray-100 p-2 rounded-md'
            name='color'
            value={note.color}
            onChange={(e) => {
              setNote({ ...note, color: e.target.value });
            }}>
            <option value='#ffffff'>White</option>
            <option value='#fcba03'>Orange</option>
            <option value='#4DF4EC'>Blue</option>
            <option value='#0BB173'>Green</option>
          </select>
          <button
            className='bg-blue-500 p-2 rounded-md text-white'
            type='submit'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNote;
