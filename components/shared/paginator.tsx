'use client';

 
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { buttonVariants } from '../ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '../ui/pagination';

type PaginatorProps = {
  totalItems: number;
  itemsPerPage?: number;
  showPreviousNext?: boolean;
};

export default function Paginator({ totalItems, showPreviousNext = true }: PaginatorProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  // 👇 calculate total pages from total items
  const totalPages = Math.ceil(totalItems);

  const buildHref = (page: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  const PageLink = ({ page }: { page: number }) => (
    <Link
      href={buildHref(page)}
      scroll={false}
      className={cn(
        buttonVariants({
          variant: currentPage === page ? 'default' : 'outline',
        }),
        'focus:border-primary hover:border-primary min-w-[2.25rem] text-center',
      )}
    >
      {page}
    </Link>
  );

  const generatePaginationLinks = (currentPage: number, totalPages: number): JSX.Element[] => {
    const pages: JSX.Element[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={`page-${i}`}>
            <PageLink page={i} />
          </PaginationItem>,
        );
      }
    } else {
      // First two
      for (let i = 1; i <= 2; i++) {
        pages.push(
          <PaginationItem key={`page-${i}`}>
            <PageLink page={i} />
          </PaginationItem>,
        );
      }

      // Middle
      if (2 < currentPage && currentPage < totalPages - 1) {
        pages.push(<PaginationEllipsis key="ellipsis-left" />);
        pages.push(
          <PaginationItem key={`page-${currentPage}`}>
            <PageLink page={currentPage} />
          </PaginationItem>,
        );
      }

      // Right ellipsis
      pages.push(<PaginationEllipsis key="ellipsis-right" />);

      // Last two
      for (let i = totalPages - 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={`page-${i}`}>
            <PageLink page={i} />
          </PaginationItem>,
        );
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return <></>;
  }
  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap justify-center gap-2">
        {showPreviousNext && totalPages > 0 && (
          <PaginationItem>
            <Link
              href={buildHref(Math.max(1, currentPage - 1))}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                currentPage <= 1 && 'pointer-events-none opacity-45',
              )}
            >
              Previous
            </Link>
          </PaginationItem>
        )}

        {generatePaginationLinks(currentPage, totalPages)}

        {showPreviousNext && totalPages > 0 && (
          <PaginationItem>
            <Link
              href={buildHref(Math.min(totalPages, currentPage + 1))}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                currentPage >= totalPages && 'pointer-events-none opacity-45',
              )}
            >
              Next
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}