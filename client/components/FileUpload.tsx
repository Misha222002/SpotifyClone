import React, { Children, useRef } from "react";
interface FileUploadProps {
  setFile: Function;
  accept: string;
  children: React.ReactNode;
}
const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <div onClick={() => ref.current?.click()}>
      <input
        accept={accept}
        type="file"
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};

export default FileUpload;
