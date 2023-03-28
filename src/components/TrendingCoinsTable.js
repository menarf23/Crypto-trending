import './App.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import * as React from "react";
import { useEffect, useState, useMemo } from 'react';
import {useTable} from "react-table";


function TrendingCoinsTable() {

  const [trendingCoins, setTrendingCoins] = useState([]);

  
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => {
      console.log("Raw data: ", response);
      const originalCoins = response.data.coins;
      originalCoins.forEach(element => {
        element.item.favorite_status = "No";
      });
      console.log("Raw coins: ", response.data.coins);
      setTrendingCoins(originalCoins);
    });
  }, []); 
  

  console.log("List of trending coins: ", trendingCoins);

  const tableData = useMemo(() => trendingCoins, [trendingCoins]);
  
  
  console.log("Table Data: ", tableData);
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
        <Fab>
        <FavoriteBorderIcon/>
        </Fab>),
      accessor: "item.favorite_status",
    }
  ], []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} 
  = useTable({columns, data: tableData});

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

export default TrendingCoinsTable;

