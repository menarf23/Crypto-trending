import "./App.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import axios from "axios";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import {useTable} from "react-table";


function TrendingCoinsTable() {

  const [trendingCoins, setTrendingCoins] = useState([]);
  const [favoriteCoins, setFavoriteCoins] = useState([]);

  
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => {
      console.log("Raw data: ", response);
      const originalCoins = response.data.coins;
      originalCoins.forEach(element => {
        element.item.favorite_status = false;
      });
      console.log("Raw coins: ", response.data.coins);
      setTrendingCoins(originalCoins);
    });
  }, []); 
  

  // console.log("List of trending coins: ", trendingCoins);

  

  function toggleFavoriteStatus(row) {
    console.log(row);
    const coinToUpdateIndex = trendingCoins.findIndex(coin => coin.item.coin_id === row.original.item.coin_id
      );
    const temporaryTrendingCoins = [...trendingCoins];
    temporaryTrendingCoins[coinToUpdateIndex].item.favorite_status = !row.original.item.favorite_status;
    setTrendingCoins(temporaryTrendingCoins);

    const temporaryFavoriteCoins = temporaryTrendingCoins.filter (element => element.item.favorite_status === true);
    setFavoriteCoins(temporaryFavoriteCoins);
    // const temporaryCoins = [...trendingCoins];
    // temporaryCoins[id].item.favorite_status = !trendingCoins[id].item.favorite_status;
    // setTrendingCoins(temporaryCoins);
  }

  console.log("Favorite coins: ", favoriteCoins);
  
  
  const tableData = useMemo(() => trendingCoins, [trendingCoins]);
  
  const columns = useMemo(() => [
    {
      Header: "IMAGE",
      Cell: tableProps => (
        <img
          src={tableProps.row.original.item.small}
          width={50}
          alt="logo"
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
        <Fab size="medium" onClick={() => toggleFavoriteStatus(tableProps.row)}>
        {tableProps.row.original.item.favorite_status ? <FavoriteIcon/> : <FavoriteBorderIcon/> }
        </Fab>),
      accessor: "item.favorite_status",
    }
  ], [trendingCoins]);

  

  

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} 
  = useTable({columns, data: tableData});

  console.log("Rows: ", rows);

  return (
    <div>
        <div className="container">
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

