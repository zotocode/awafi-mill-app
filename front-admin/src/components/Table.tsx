import React from 'react';

interface TableColumn {
  header: string;
  accessor: string; // This should ideally be more descriptive, maybe "key" or "field" for clarity
  render?: (row: { [key: string]: any }) => React.ReactNode; // Pass the entire row for rendering
}

interface TableProps {
  data: Array<{ [key: string]: any }>;
  columns: TableColumn[];
  actions?: (row: { [key: string]: any }) => JSX.Element;
}

const Table: React.FC<TableProps> = ({ data, columns, actions }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                  {column.render
                    ? column.render(row) // Pass the entire row to the render function
                    : row[column.accessor]} 
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
    </div>
  );
};

export default Table;
