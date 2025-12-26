'use client';

import { useRef, useCallback } from 'react';

interface InfiniteScrollOptions {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollOptions) {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Create a callback ref that will be called whenever the element is attached/detached
  const setLoaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      loaderRef.current = node;

      // Set up new observer if we have a node and conditions are met
      if (node && hasNextPage && !isFetchingNextPage) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });

        observer.observe(node);
        observerRef.current = observer;
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  return {
    loaderRef: setLoaderRef,
    isFetchingNextPage,
    hasNextPage,
  };
}
