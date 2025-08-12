import React, { useState, useRef } from "react";

export default function ProductItem({ product, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false);

  const nameRef = useRef();
  const descriptionRef = useRef();

  const handleSave = () => {
    const form = {
      name: nameRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
    };

    if (!form.name) {
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      return;
    }

    onUpdate(product.id, form);
    setEditMode(false);
  };

  const handleCancel = () => {
    if (nameRef.current) nameRef.current.value = product.name;
    if (descriptionRef.current) descriptionRef.current.value = product.description || "";
    setEditMode(false);
  };

  return (
    <div className="bg-gray-800 p-3 rounded-md flex justify-between gap-2">
      {editMode ? (
        <div className="flex-1 flex gap-2">
          <input
            ref={nameRef}
            defaultValue={product.name}
            placeholder="Name"
            className="flex-1 bg-gray-700 px-2 py-1 rounded-md text-sm outline-none"
          />
          <input
            ref={descriptionRef}
            defaultValue={product.description}
            placeholder="Description"
            className="flex-1 bg-gray-700 px-2 py-1 rounded-md text-sm outline-none"
          />
        </div>
      ) : (
        <div className="flex-1">
          <p className="font-medium">{product.name}</p>
          {product.description && (
            <p className="text-sm text-gray-400">{product.description}</p>
          )}
        </div>
      )}

      <div className="flex gap-1">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-md text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm"
        >
          Del
        </button>
      </div>
    </div>
  );
}
