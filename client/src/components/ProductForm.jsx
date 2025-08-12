import  { useRef } from "react";
import { useState } from "react";

export default function ProductForm({ onAdd }) {
  const [error, setError] = useState("");
  
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = () => {
     const form = {
      name: nameRef.current.value,          
      description: descriptionRef.current.value
    };
    if (!form.name.trim() || !form.description.trim()){
      setError("Please enter a product name and description to add.");
      nameRef.current.value = "";              
      descriptionRef.current.value = "";
      return;
    };
    onAdd(form);
    nameRef.current.value = "";              
    descriptionRef.current.value = "";
  };

  return (
    <div className="bg-gray-800 p-3 rounded-md flex gap-2 mb-4">
      <input
        ref={nameRef}
        placeholder="Name"
        className="flex-1 bg-gray-700 px-2 py-1 rounded-md text-sm outline-none"
      />
      <input
        ref={descriptionRef}
        placeholder="Description"
        className="flex-1 bg-gray-700 px-2 py-1 rounded-md text-sm outline-none"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm"
      >
        Add
      </button>
      {error && (
      <div className="flex items-center justify-between bg-red-900/30 text-red-400 text-xs px-2 py-1 rounded-md">
        {error}
        <button
          onClick={() => setError("")}
          className="ml-2 bg-green-600 hover:bg-red-600 text-white px-2 py-0.5 rounded text-xs"
        >
          OK
        </button>
      </div>
    )}
    </div>
  );
}
