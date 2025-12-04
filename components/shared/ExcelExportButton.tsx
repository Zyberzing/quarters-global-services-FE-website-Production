'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type AnyRow = Record<string, any>;

export type ExcelColumn<T extends AnyRow> = {
  /** Dot path or key from your data (e.g., "email" or "address.city") */
  key: string;
  /** Header label; defaults to key if not provided */
  header?: string;
  /** Optional value formatter */
  formatter?: (value: any, row: T) => any;
};

type ExcelExportButtonProps<T extends AnyRow> = {
  rows: T[];
  /** Optional explicit columns. If omitted, columns are auto-detected from data (flattened). */
  columns?: ExcelColumn<T>[];
  filename?: string; // default: export.xlsx
  sheetName?: string; // default: Sheet1
  className?: string;
  disabled?: boolean;
  /** If true, silently do nothing on empty rows. Default false shows disabled button state. */
  allowEmpty?: boolean;
  /** Limit column width in characters (default 40) */
  maxColWidth?: number;
  /** When true, tries to auto-detect columns if `columns` not provided (default true) */
  autoDetectColumns?: boolean;
};

function isPlainObject(v: any) {
  return Object.prototype.toString.call(v) === '[object Object]';
}

function getPath(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), obj);
}

function flatten(obj: AnyRow, parent = '', out: AnyRow = {}): AnyRow {
  for (const [k, v] of Object.entries(obj ?? {})) {
    const key = parent ? `${parent}.${k}` : k;
    if (isPlainObject(v)) {
      flatten(v as AnyRow, key, out);
    } else if (Array.isArray(v)) {
      out[key] = v.map((x) => (isPlainObject(x) ? JSON.stringify(x) : x)).join(', ');
    } else if (v instanceof Date) {
      out[key] = v.toISOString();
    } else {
      out[key] = v;
    }
  }
  return out;
}

function unionKeysFromRows<T extends AnyRow>(rows: T[]) {
  const keys = new Set<string>();
  for (const r of rows) {
    const flat = flatten(r);
    Object.keys(flat).forEach((k) => keys.add(k));
  }
  return Array.from(keys);
}

export function ExcelExportButton<T extends AnyRow>({
  rows,
  columns,
  filename = 'export.xlsx',
  sheetName = 'Sheet1',
  className,
  disabled,
  allowEmpty = false,
  maxColWidth = 40,
  autoDetectColumns = true,
}: ExcelExportButtonProps<T>) {
  const [loading, setLoading] = React.useState(false);

  const canExport = rows.length > 0 || allowEmpty;

  const handleExport = async () => {
    if (!canExport) return;
    setLoading(true);
    try {
      const XLSX = await import('xlsx');

      // Build column set
      let cols: ExcelColumn<T>[];
      if (columns && columns.length) {
        cols = columns;
      } else {
        const keys = autoDetectColumns ? unionKeysFromRows(rows) : [];
        cols = keys.map((k) => ({ key: k, header: k }));
      }

      // Map rows to a "header label -> value" object so headers look nice
      const shaped = rows.map((row) => {
        const flat = flatten(row);
        const shapedRow: AnyRow = {};
        for (const c of cols) {
          const header = c.header ?? c.key;
          const rawVal = c.key.includes('.') ? getPath(row, c.key) : flat[c.key];
          shapedRow[header] = c.formatter ? c.formatter(rawVal, row) : rawVal;
        }
        return shapedRow;
      });

      const ws = XLSX.utils.json_to_sheet(shaped, { skipHeader: false });

      // Auto column widths
      const headers = cols.map((c) => c.header ?? c.key);
      const colWidths = headers.map((h) =>
        Math.min(maxColWidth, Math.max(8, String(h).length + 2)),
      );

      for (const r of shaped) {
        headers.forEach((h, i) => {
          const len = String(r[h] ?? '').length + 2;
          if (len > colWidths[i]) colWidths[i] = Math.min(maxColWidth, len);
        });
      }
      (ws as any)['!cols'] = colWidths.map((wch) => ({ wch }));

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName.slice(0, 31)); // Excel sheet name limit
      XLSX.writeFile(wb, filename);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleExport}
      disabled={disabled || loading || !canExport}
      className={cn('inline-flex items-center gap-2', className)}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ExternalLink className="h-4 w-4" />
      )}
      Export
    </Button>
  );
}