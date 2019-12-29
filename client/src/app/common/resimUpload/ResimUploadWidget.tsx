import React, { Fragment, useState, useEffect } from "react";
import { Header, Grid, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ResimWidgetDropzone from "./ResimWidgetDropzone";
import ResimWidgetKirp from "./ResimWidgetKirp";

interface IProps {
  uploadResim: (file: Blob) => void;
  yukleniyor: boolean;
}

export const ResimUploadWidget: React.FC<IProps> = ({
  uploadResim,
  yukleniyor
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [resim, setResim] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.Preview));
    };
  });

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <ResimWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 && (
            <ResimWidgetKirp
              setResim={setResim}
              resimPreview={files[0].Preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {files.length > 0 && (
            <Fragment>
              <div
                className="img-preview"
                style={{ minHeight: "200px", overflow: "hidden" }}
              />
              <Button.Group widths={2}>
                <Button
                  positive
                  icon="check"
                  loading={yukleniyor}
                  onClick={() => uploadResim(resim!)}
                />
                <Button
                  negative
                  disabled={yukleniyor}
                  onClick={() => setFiles([])}
                />
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ResimUploadWidget);
