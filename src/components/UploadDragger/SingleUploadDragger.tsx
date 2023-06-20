import { EditFilled, UploadOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Spin, Upload } from 'antd';
import { isString } from 'lodash-es';
import Image from 'next/image';
import { useState } from 'react';

import { useUploadFileApi } from '@/api';
import { useHover } from '@/hooks';
import { twcx } from '@/utils';

type UploadDraggerProps = {
  value?: string;
  onChange?: (value: string) => void;
  folder?: string;
  disabled?: boolean;
  className?: string;
};

const StyledDragger = styled(Upload.Dragger)`
  .tl-upload-btn {
    padding: 0 !important;
  }
`;

export function SingleUploadDragger({
  value,
  onChange,
  folder = 'no-container',
  disabled = false,
  className,
}: UploadDraggerProps) {
  const [image, setImage] = useState<string>();
  const { loading, uploadFile } = useUploadFileApi();
  const { isHovering, ref, changeHover } = useHover<HTMLDivElement>();

  const computeImage = value ?? image;

  return (
    <StyledDragger
      showUploadList={false}
      customRequest={async ({ file }) => {
        if (isString(file)) {
          throw Error('file is string');
        }

        const { fileUrl } = await uploadFile(folder, file, file.name);

        setImage(fileUrl);
        onChange?.(fileUrl);
        changeHover(false);
      }}
    >
      <div
        ref={ref}
        className={twcx(
          'flex items-center justify-center relative min-w-[240px] min-h-[240px] overflow-hidden rounded-lg',
          className
        )}
      >
        {isHovering && computeImage && !loading && !disabled && (
          <div className="flex justify-center items-center z-20 w-full h-full absolute bg-gray-400/70 gap-2 text-white">
            <EditFilled />
            <span>Edit Image</span>
          </div>
        )}

        {loading && (
          <div className="absolute w-full h-full flex justify-center items-center z-20 bg-gray-400/30">
            <Spin />
          </div>
        )}

        {computeImage && (
          <Image
            src={computeImage}
            alt="avatar"
            fill
            className="object-cover z-10"
          />
        )}

        {!computeImage && !loading && (
          <div className="flex flex-col items-center">
            <UploadOutlined className="text-3xl" />
            <span>Upload</span>
          </div>
        )}
      </div>
    </StyledDragger>
  );
}
