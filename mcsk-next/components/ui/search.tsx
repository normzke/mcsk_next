'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from './search-provider';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './search-dialog';
import { Loader2, FileText, Newspaper, Cog, Globe } from 'lucide-react';

export function SearchCommand() {
  const { isOpen, setIsOpen, query, setQuery, results, loading, performSearch } = useSearch();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setIsOpen]);

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 300);

    return () => clearTimeout(searchDebounce);
  }, [query, performSearch]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="mr-2 h-4 w-4" />;
      case 'news':
        return <Newspaper className="mr-2 h-4 w-4" />;
      case 'service':
        return <Cog className="mr-2 h-4 w-4" />;
      default:
        return <Globe className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput
        placeholder="Search across MCSK..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {loading && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
          </div>
        )}
        {!loading && query && !results.length && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {!loading &&
          results.length > 0 &&
          ['news', 'document', 'service', 'page'].map((type) => {
            const typeResults = results.filter((result) => result.type === type);
            if (!typeResults.length) return null;

            return (
              <CommandGroup
                key={type}
                heading={type.charAt(0).toUpperCase() + type.slice(1) + 's'}
              >
                {typeResults.map((result) => (
                  <CommandItem
                    key={result.id}
                    onSelect={() => {
                      setIsOpen(false);
                      router.push(result.url);
                    }}
                  >
                    {getIcon(result.type)}
                    <div>
                      <div className="text-sm font-medium">{result.title}</div>
                      {result.description && (
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {result.description}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
      </CommandList>
    </CommandDialog>
  );
} 