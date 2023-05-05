import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import * as React from "react";
import { useMemo } from "react";
import {useTable} from "react-table";
import { red } from "@mui/material/colors";



function FavoriteCoinsTable(props) {

  const favCoins = props.favCoins;
  
  
  const tableData = useMemo(() => favCoins, [favCoins]);
  
  const columns = useMemo(() => [
    {
      Header: "",
      Cell: tableProps => (
        <img
          src={tableProps.row.original.item.small}
          alt="logo"
        />
      ),
      accessor: "item.large",
    },
    {
      Header: "COIN",
      accessor: "item.name",
    },
    {
      Header: "SYMBOL",
      accessor: "item.symbol",
    },
    {
      Header: "MKT CAP #",
      accessor: "item.market_cap_rank",
    },
    {
      Header: "PRICE BTC",
      Cell: tableProps => (
        tableProps.row.original.item.price_btc.toExponential(5)
      ),
      accessor: "item.price_btc",
    },
    {
      Header: "FAVORITE",
      Cell: tableProps => (
        <Fab className="favFab" size="medium" onClick={() => props.favoriteStatus(tableProps.row)}>
        <FavoriteIcon className="favIcon" style={{color: red[900]}}/>
        </Fab>),
      accessor: "item.favorite_status",
    }
  ], [favCoins]);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} 
  = useTable({columns, data: tableData});

  // console.log("Rows: ", rows);

  return (
      <div className="favorites-table">
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
  );

}

export default FavoriteCoinsTable;

