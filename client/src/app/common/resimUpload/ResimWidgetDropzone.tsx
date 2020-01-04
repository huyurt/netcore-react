import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

interface IProps {
  setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
  border: "dashed 3px ",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center" as "center",
  height: "200px"
};

const dropzoneActiveStyles = {
  borderColor: "green"
};

const ResimWidgetDropzone: React.FC<IProps> = ({ setFiles }) => {
  const onDrop = useCallback(acceptedFiles => {
    setFiles(
      acceptedFiles.map((file: object) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  }, [setFiles]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropzoneStyles, ...dropzoneActiveStyles }
          : dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Resmi buraya sürükleyin" />
    </div>
  );
};

export default ResimWidgetDropzone;
