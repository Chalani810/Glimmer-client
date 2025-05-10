import React, { useState } from "react";

const FileUpload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Optional: Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 5 * 1024 * 1024; // 5MB max file size

      if (!validTypes.includes(selectedFile.type)) {
        alert("Invalid file type. Only images and PDFs are allowed.");
        return;
      }

      if (selectedFile.size > maxSize) {
        alert("File size exceeds the limit of 5MB.");
        return;
      }

      setFile(selectedFile);
      onFileSelect(selectedFile); // Pass the selected file to the parent component
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Receipt Upload</label>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
      />
      {file && (
        <div className="mt-2 text-sm text-gray-500">
          {`Selected file: ${file.name}`}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
