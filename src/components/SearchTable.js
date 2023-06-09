import * as React from "react";
import { useMemo } from "react";
import { useTable, usePagination } from "react-table";


function SearchTable(props) {

    const searchCoins = props.searchCoins;
  
    const tableData = useMemo(() => searchCoins, [searchCoins]);
    
    const columns = useMemo(() => [
      {
        Header: '',
        Cell: tableProps => (
          <img
            src={tableProps.row.original.large}
            width={50}
            alt="logo"
          />
        ),
        accessor: "large",
      },
      {
        Header: 'COIN',
        accessor: "name",
      },
      {
        Header: 'SYMBOL',
        accessor: "symbol",
      },
      {
        Header: 'MKT CAP #',
        accessor: "market_cap_rank",
      }
    ], [searchCoins]);
   
  
    const {getTableProps, getTableBodyProps, headerGroups, 
      page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, 
      gotoPage, pageCount, prepareRow} 
    = useTable({columns, data: tableData, initialState: { pageSize: 20 } }, usePagination);
  
    const {pageIndex} = state;
  
    return (
      <div className="search-table">
          <div >
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
              {page.map((row) => {
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
          {searchCoins.length > 20 ? 
          <div>
            <span>
              Page {" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong> {" "}
            </span>
            <span style={{margin:10}}>
              | Go to page: {" "}
              <input type="number" defaultValue={pageIndex + 1} 
              onChange={e => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
              }}
                style={{width: "50px"}}
              />
            </span>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
          </div> : null}
        </div>
      </div>
    );
}

export default SearchTable;