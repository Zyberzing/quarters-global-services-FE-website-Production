
'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Loader2, SearchIcon } from 'lucide-react';

const QueryInputSearch = ({
  placeholder = 'Search...',
  isReplaceExistFilters = true,
}: {
  placeholder?: string;
  isReplaceExistFilters?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('q') || '';
  const [search, setSearch] = useState(currentSearch);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (isReplaceExistFilters) {
          router.replace(search ? `?q=${search}` : '?');
          return;
        } else {
          if (search) {
            params.set('q', search);
          } else {
            params.delete('q');
          }
        }
        router.replace(`?${params.toString()}`);
      });
      setLoading(false);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setLoading(true);
        }}
        placeholder={placeholder}
      />
      <InputGroupAddon>
        {loading || isPending ? <Loader2 className="animate-spin" /> : <SearchIcon />}
      </InputGroupAddon>
    </InputGroup>
  );
};

export default QueryInputSearch;
