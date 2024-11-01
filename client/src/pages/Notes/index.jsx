// import { UserAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loding, setloding] = useState(true);
  const deleteNote = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();

    if (data.success) {
      setNotes(notes.filter((note) => note._id !== id));
      toast.success(" Note deleted successfully");
    }
    if (!data.success) {
      toast.error(data.error);
    }
  };

  const getallNotes = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/notes/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // Authorization: `Bearer ${user}`,
      },
    });
    const allnotes = await res.json();
    setNotes(allnotes.data);
    setloding(false);
  };
  useEffect(() => {
    getallNotes();
  }, []);

  if (loding) return <div>Loading...</div>;

  return (
    <div className='mx-4 my-3 '>
      <div className='mt-2 mb-2 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-gray-900'>Notes</h1>
        <Link
          className='py-2 px-3 rounded-lg bg-blue-400 text-white'
          to={"./create"}>
          Create Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <h4 className='text-4xl font-bold text-center mt-5'>No notes found!</h4>
      ) : (
        <div className='flex flex-wrap gap-4'>
          {notes.map((note) => (
            <div
              className='border-[1px] border-neutral-200 shadow-lg w-fit overflow-hidden   rounded-lg'
              key={note._id}>
              <h4 className='capitalize ps-2 py-1 pe-28 text-xl font-semibold relative'>
                {note.title}
                <Link
                  to={`./${note._id}`}
                  className='absolute top-2 cursor-pointer right-10'>
                  <BsPencil className='text-green-400 text-lg' />
                </Link>
                <button
                  className='absolute top-2 cursor-pointer right-2'
                  onClick={() => {
                    deleteNote(note._id);
                  }}>
                  <BsFillTrashFill className='text-red-400 text-lg' />
                </button>
              </h4>
              <p
                className='px-2 py-4 font-medium border-t-neutral-200 border-t-[1px]'
                style={{ backgroundColor: note.color }}>
                {note.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
