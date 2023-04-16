import './App.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import * as React from "react";
import { useMemo } from 'react';
import {useTable} from "react-table";


function FavoriteCoinsTable(props) {

  const favCoins = props.favCoins;
  // const temporaryFavoriteCoins = temporaryTrendingCoins.filter (element => element.item.favorite_status === true);
  // setFavoriteCoins(temporaryFavoriteCoins);
  
  
  const tableData = useMemo(() => favCoins, [favCoins]);
  
  const columns = useMemo(() => [
    {
      Header: "IMAGE",
      Cell: tableProps => (
        <img
          src={tableProps.row.original.item.small}
          width={50}
          alt='logo'
        />
      ),
      accessor: "item.small",
    },
    {
      Header: "NAME",
      accessor: "item.name",
    },
    {
      Header: "SYMBOL",
      accessor: "item.symbol",
    },
    {
      Header: "MARKET CAP RANK",
      accessor: "item.market_cap_rank",
    },
    {
      Header: "PRICE BTC",
      accessor: "item.price_btc",
    },
    {
      Header: "FAVORITE",
      Cell: tableProps => (
        <Fab size="medium" onClick={() => props.favoriteStatus(tableProps.row)}>
        {tableProps.row.original.item.favorite_status ? <FavoriteIcon/> : <FavoriteBorderIcon/> }
        </Fab>),
      accessor: "item.favorite_status",
    }
  ], [favCoins]);

  

  

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

export default FavoriteCoinsTable;

