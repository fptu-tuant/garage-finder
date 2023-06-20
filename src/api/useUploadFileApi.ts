import { BlobServiceClient } from '@azure/storage-blob';
import { useState } from 'react';

import { useGetSASUriForUploadApi } from './useGetSASUriForUploadApi';

export function useUploadFileApi() {
  const [loading, setLoading] = useState(false);

  const { refetch: getUploadUri } = useGetSASUriForUploadApi();

  const uploadFile = async (
    container: string,
    file: Blob | Buffer,
    fileName: string
  ) => {
    setLoading(true);

    const { data: uploadUri, error } = await getUploadUri();

    if (!uploadUri) {
      console.error(error);
      throw Error(String(error));
    }

    await new BlobServiceClient(uploadUri)
      .getContainerClient(container)
      .getBlockBlobClient(fileName)
      .uploadData(file);

    setLoading(false);

    return {
      fileUrl: `https://garagefinder.blob.core.windows.net/garage-finder/${container}/${fileName}`,
    };
  };

  return { uploadFile, loading };
}
