import { gql, useMutation } from '@apollo/client';
import { NextPage } from 'next';
import Dropzone from 'react-dropzone';

const UPLOAD_FILE_MUTATION = gql`
    mutation UploadFile($file: Upload!) {
        uploadFile(file: $file)
    }
`;

const Index: NextPage = () => {
    const [uploadFile] = useMutation(UPLOAD_FILE_MUTATION);

    return (
        <Dropzone
            onDrop={async files => {
                await uploadFile({ variables: { file: files[0] } });
            }}
        >
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
                    </div>
                </section>
            )}
        </Dropzone>
    );
};

export default Index;
