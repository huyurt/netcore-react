import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IProps {
  setResim: (file: Blob) => void;
  resimPreview: string;
}

const ResimWidgetKirp: React.FC<IProps> = ({ setResim, resimPreview }) => {
  const kirp = useRef<Cropper>(null);
  const resimKirp = () => {
    if (
      kirp.current &&
      typeof kirp.current.getCroppedCanvas() === "undefined"
    ) {
      return;
    }
    kirp &&
      kirp.current &&
      kirp.current.getCroppedCanvas().toBlob((blob: any) => {
        setResim(blob);
      }, "image/jpeg");
  };

  return (
    <Cropper
      ref={kirp}
      src={resimPreview}
      style={{ height: 200, width: "100%" }}
      aspectRatio={1 / 1}
      preview='.img-preview'
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={resimKirp}
    />
  );
};

export default ResimWidgetKirp;
