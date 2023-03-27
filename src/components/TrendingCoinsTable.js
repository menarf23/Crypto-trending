import './App.css';
import axios from 'axios';
import * as React from "react";
import { useEffect, useState, useMemo } from 'react';
import {useTable} from "react-table";


function TrendingCoinsTable() {

  const [trendingCoins, setTrendingCoins] = useState([]);

  
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => {
      console.log(response);
      setTrendingCoins(response.data.coins);
    });
  }, []);

  // let favoriteStatusColumn = {
  //   favorite: 0,
  // }

  
  // trendingCoins.forEach(element => {
  //   setTrendingCoins(...element, favoriteStatusColumn);
  // });
  
    
  

  console.log(trendingCoins);
  // console.log(trendingCoins[0].item.id);

  const tableData = useMemo(() => trendingCoins, [trendingCoins]);
  // const tableData = useMemo(() => mockData, []);
  
  console.log(tableData);
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

