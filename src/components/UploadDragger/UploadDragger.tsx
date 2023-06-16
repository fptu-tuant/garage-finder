import { UploadOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Upload } from 'antd';
import { first } from 'lodash-es';
import Image from 'next/image';
import { useState } from 'react';

type UploadDraggerProps = {
  multiple?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

const StyledDragger = styled(Upload.Dragger)`
  .tl-upload-btn {
    padding: 0 !important;
  }
`;

export function UploadDragger({
  value,
  onChange,
  multiple = false,
}: UploadDraggerProps) {
  const [images, setImages] = useState<string[]>();

  return (
    <StyledDragger showUploadList={false}>
      <div className="w-60 h-60 flex items-center justify-center">
        {images ? (
          <Image src={first(images) || ''} alt="avatar" />
        ) : (
          <div className="flex flex-col items-center">
            <UploadOutlined className="text-3xl" />
            <span>Upload</span>
          </div>
        )}
      </div>
    </StyledDragger>
  );
}
