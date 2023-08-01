import { Button, Skeleton, Typography } from 'antd';
import { useRouter } from 'next/router';

import { useAdminGetPaymentLink, useAdminGetSubscriptions } from '@/api';
import { ManageGarageLayout } from '@/layouts';

export default function ManageGarageInfoPage() {
  const { query } = useRouter();
  const { garageId = '' } = query as { garageId: string };

  const { data: subscriptions, isLoading: fetchingSubscriptions } =
    useAdminGetSubscriptions();

  const { mutateAsync: getPaymentLink, isLoading: fetchingPaymentLink } =
    useAdminGetPaymentLink();

  return (
    <div>
      <Typography.Title level={3}> Gói thành viên</Typography.Title>

      <Skeleton active loading={fetchingSubscriptions}>
        <div className="grid grid-cols-2 gap-4 justify-center">
          {subscriptions?.map((subscription) => (
            <div
              key={subscription.subscribeID}
              className="flex flex-col items-center rounded-lg bg-blue-200/50 p-6"
            >
              <h3 className="text-3xl font-black">{subscription.name}</h3>
              <p className="text-xl font-bold text-primary">
                {Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(subscription.price)}
              </p>
              <p>{subscription.content}</p>
              <p>Thời hạn {subscription.period} ngày</p>

              <Button
                className="mt-10"
                type="primary"
                loading={fetchingPaymentLink}
                disabled={fetchingPaymentLink}
                onClick={async () => {
                  const link = await getPaymentLink({
                    params: {
                      garageId: +garageId,
                      subscribeID: subscription.subscribeID,
                    },
                  });

                  window.open(link, '_blank');
                }}
              >
                Mua
              </Button>
            </div>
          ))}
        </div>
      </Skeleton>
    </div>
  );
}

ManageGarageInfoPage.Layout = ManageGarageLayout;
