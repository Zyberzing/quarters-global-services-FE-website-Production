// components/common/CommonTable.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ErrorBox from '../shared/ErrorBox';
 
interface Column<T> {
  header: string;
  accessor: keyof T | string;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const CommonTable = <T,>({ columns, data }: CommonTableProps<T>) => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx + '-table-header-col'} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length <= 0 && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <ErrorBox />
              </TableCell>
            </TableRow>
          )}
          {data.map((row, index) => (
            <TableRow key={index + '-table-row'}>
              {columns.map((col, idx) => (
                <TableCell key={idx + '-table-col'} className={col.className}>
                  {col.render ? col.render(row) : (row as any)[col.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommonTable;