import React, { useEffect, useState } from 'react';
import { FileQuestion } from 'lucide-react';
import LoadingSpinner from '../Spinner/LoadingSpinner';

export interface TableColumn {
  header: string;
  accessor: string;
  render?: (row: { [key: string]: any }) => React.ReactNode;
}

interface TableProps {
  data: Array<{ [key: string]: any }>;
  columns: TableColumn[];
  actions?: (row: { [key: string]: any }) => JSX.Element;
}

const Table: React.FC<TableProps> = ({ data, columns, actions }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {data.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {columns.map((column) => (
                    <th key={column.accessor} scope="col" className="px-6 py-3">
                      {column.header}
                    </th>
                  ))}
                  {actions && <th scope="col" className="px-6 py-3">Action</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    {columns.map((column) => (
                      <td key={column.accessor} className="px-6 py-4">
                        {column.render ? column.render(row) : row[column.accessor]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4">
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-900">
              <FileQuestion className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Data Available
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No records found to display.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
