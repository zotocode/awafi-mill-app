import React from 'react';

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
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
        <div className="text-center py-6 text-black bg-white">
          Data Not Found
        </div>
      )}
    </div>
  );
};

export default Table;
