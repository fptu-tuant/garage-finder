import { useState } from 'react';

type Pagination = {
  pageSize: number;
  currentPage: number;
  totalPage?: number;
  totalItem?: number;
};

export function usePagination(
  initValue: Pagination = {
    currentPage: 1,
    pageSize: 10,
  }
) {
  const [pagination, setPagination] = useState<Pagination>(initValue);

  return {
    ...pagination,
    goNext: () =>
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 })),
    goPrev: () =>
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 })),
    goPage: (page: number) =>
      setPagination((prev) => ({ ...prev, currentPage: page })),
  };
}
