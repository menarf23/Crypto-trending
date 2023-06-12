import * as React from "react";
import { useMemo } from "react";
import {useTable, usePagination} from "react-table";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";


function FavoriteCoinsTable(props) {

  const favCoins = props.favCoins;
  
  const tableData = useMemo(() => favCoins, [favCoins]);
  
  const columns = useMemo(() => [
    {
      Header: '',
      Cell: tableProps => (
        <img
          src={tableProps.row.original.item.small}
          alt="logo"
        />
      ),
      accessor: "item.large",
    },
    {
      Header: 'COIN',
      accessor: "item.name",
    },
    {
      Header: 'SYMBOL',
      accessor: "item.symbol",
    },
    {
      Header: 'MKT CAP #',
      accessor: "item.market_cap_rank",
    },
    {
      Header: 'PRICE BTC',
      Cell: tableProps => (
        tableProps.row.original.item.price_btc.toExponential(5)
      ),
      accessor: "item.price_btc",
    },
    {
      Header: 'FAVORITE',
      Cell: tableProps => (
        <Fab className="favFab" size="medium" onClick={() => props.favoriteStatus(tableProps.row)}>
        <FavoriteIcon className="favIcon" style={{color: red[900]}}/>
        </Fab>),
      accessor: "item.favorite_status",
    }
  ], [favCoins]);

  const {getTableProps, getTableBodyProps, headerGroups, page, 
    nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, 
    gotoPage, pageCount, prepareRow} 
  = useTable({columns, data: tableData, initialState: { pageSize: 20 } }, usePagination);

  const {pageIndex} = state;

  return (
      <div className="favorites-table">
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
        {favCoins.length > 20 ? 
          <div>
            <span>
              Page{" "}
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

export default FavoriteCoinsTable;

