// src/components/UploadModal.jsx
import React, { useState } from "react";

const UploadModal = () => {
  const [files, setFiles] = useState([]);

  const handleFiles = (newFiles) => {
    const selectedFiles = Array.from(newFiles).map((file) => ({
      name: file.name,
      status: "Uploading",
    }));
    setFiles(selectedFiles);

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((file) => ({ ...file, status: "Success" }))
      );
    }, 2000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md w-80">
      <h3 className="font-bold mb-2">Upload Files</h3>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-4 4m4-4l4 4M12 3v9" />
    </svg>

      <div
        className="border-2 border-dashed border-gray-400 p-4 text-center cursor-pointer hover:border-blue-500"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drag & drop files here or click to browse
        <input
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="block mt-2 text-blue-500 cursor-pointer hover:underline">
          Browse Files
        </label>
      </div>
      <ul className="mt-2">
        {files.map((file, index) => (
          <li key={index} className="border-b py-1">
            {file.name} - {file.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadModal;
