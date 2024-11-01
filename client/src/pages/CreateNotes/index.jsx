import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Ceatenotes = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [color, setcolor] = useState("#ffffff");

  const handlerForm = async (e) => {
    e.preventDefault();
    const note = {
      title,
      description,
      color,
    };
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(note),
      });
      const data = await res.json();

      console.log(data);

      if (data.success) {
        toast.success(" Note created successfully");

        navigate("/notes");
      }
      if (!data.success) {
        toast.error(data.error);
        navigate("/notes/create");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className='flex  m-auto  items-center min-h-[80vh] w-[350px]'>
      <form className='flex flex-col gap-4 w-full ' onSubmit={handlerForm}>
        <input
          onChange={(e) => {
            settitle(e.target.value);
          }}
          value={title}
          type='text'
          className='bg-gray-100 p-2 rounded-md'
          placeholder='Tilte'
          name='title'
        />
        <textarea
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          rows={3}
          className='bg-gray-100 p-2 rounded-md'
          placeholder='Description'
          name='description'>
          {description}
        </textarea>
        <select
          className='bg-gray-100 p-2 rounded-md'
          name='color'
          value={color}
          onChange={(e) => {
            setcolor(e.target.value);
          }}>
          <option value='#ffffff'>White</option>
          <option value='#fcba03'>Orange</option>
          <option value='#4DF4EC'>Blue</option>
          <option value='#0BB173'>Green</option>
        </select>
        <button className='bg-blue-500 p-2 rounded-md text-white' type='submit'>
          Create
        </button>
      </form>
    </div>
  );
};

export default Ceatenotes;
