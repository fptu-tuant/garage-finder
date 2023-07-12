import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { isString } from 'lodash-es';

import { useUploadFileApi } from '@/api';

type MultipleUploadProps = {
  folder?: string;
  onChange?: (fileUrl: string) => void;
};

export function MultipleUpload({
  folder = 'hehehe',
  onChange,
}: MultipleUploadProps) {
  const { loading, uploadFile } = useUploadFileApi();

  return (
    <Upload
      customRequest={async ({ file }) => {
        if (isString(file)) {
          console.error('file is string');

          return;
        }

        const { fileUrl } = await uploadFile(folder, file, file.name);

        onChange?.(fileUrl);
      }}
      multiple
      itemRender={() => null}
    >
      <Button
        icon={<UploadOutlined />}
        type="primary"
        loading={loading}
        disabled={loading}
      >
        Thêm ảnh
      </Button>
    </Upload>
  );
}
