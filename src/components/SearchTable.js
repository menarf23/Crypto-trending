import './App.css';
import * as React from "react";
import { useMemo } from 'react';
import {useTable} from "react-table";

function SearchTable(props) {

    const searchCoins = props.searchCoins;
  
  
    const tableData = useMemo(() => searchCoins, [searchCoins]);
    
    const columns = useMemo(() => [
      {
        Header: "IMAGE",
        Cell: tableProps => (
          <img
            src={tableProps.row.original.large}
            width={50}
            alt='logo'
          />
        ),
        accessor: "large",
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "SYMBOL",
        accessor: "symbol",
      },
      {
        Header: "MARKET CAP RANK",
        accessor: "market_cap_rank",
      }
    ], [searchCoins]);
  
    
  
    
  
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} 
    = useTable({columns, data: tableData});
  
    // console.log("Rows: ", rows);
  
    return (
      <div>
          <div className='container'>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ) )}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default SearchTable;