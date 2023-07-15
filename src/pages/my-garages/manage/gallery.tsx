import { DeleteOutlined } from '@ant-design/icons';
import { Button, Empty, Image as AntImage, Skeleton, Typography } from 'antd';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  useAddGargeImages,
  useDeleteGrageImage,
  useGetGarageByIdApi,
} from '@/api';
import { MultipleUpload } from '@/components';
import { ManageGarageLayout } from '@/layouts';

export default function GarageGalleryManagementPage() {
  const { query } = useRouter();

  const {
    data: garage,
    isLoading: fetchingGarage,
    refetch,
  } = useGetGarageByIdApi(
    { enabled: !isNaN(Number(query?.garageId)) },
    { id: Number(query?.garageId) }
  );

  const { mutateAsync: addGarageImage } = useAddGargeImages();

  const { mutateAsync: deleteImage, isLoading: deleting } =
    useDeleteGrageImage();

  const [deletingId, setDeletingId] = useState<number>();

  const validImages = garage?.imageGarages.filter(
    (item) => !isEmpty(item.imageLink)
  );

  return (
    <div>
      <Typography.Title level={3}>Thư viện ảnh</Typography.Title>

      <div className="mb-10">
        <MultipleUpload
          onChange={async (imageLinks) => {
            await addGarageImage({
              body: imageLinks.map((imageLink) => ({
                imageLink,
                garageID: Number(query?.garageId),
              })),
            });
            refetch();
          }}
        />
      </div>

      <Skeleton active loading={fetchingGarage}>
        <div className="grid grid-cols-3 gap-6">
          <AntImage.PreviewGroup>
            {validImages?.map((image) => (
              <div key={image.imageID}>
                <AntImage
                  src={image.imageLink}
                  className="aspect-square object-cover rounded"
                />

                <Button
                  className="mt-2 mx-auto block bg-red-500 hover:bg-red-500/70"
                  icon={<DeleteOutlined />}
                  type="primary"
                  onClick={async () => {
                    setDeletingId(image.imageID);
                    await deleteImage({ id: image.imageID });
                    await refetch();
                    setDeletingId(undefined);
                  }}
                  disabled={deletingId === image.imageID && deleting}
                  loading={deletingId === image.imageID && deleting}
                >
                  Xóa
                </Button>
              </div>
            ))}
          </AntImage.PreviewGroup>
        </div>

        <div>{!validImages?.length && <Empty />}</div>
      </Skeleton>
    </div>
  );
}

GarageGalleryManagementPage.Layout = ManageGarageLayout;
