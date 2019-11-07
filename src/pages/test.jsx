import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
}));

const fetchNews = async () => {
  const newsKey = 'df40738813c54e5392615c251b129eb0'
  const query = '韓國瑜'
  const url = `https://newsapi.org/v2/everything?
    country=tw
    &apiKey=${newsKey}
    &from=2019-11-04
    &sortBy=popularity
    &q=${query}
  `
  const req = new Request(url);
  const res = await fetch(req)
  const data = await res.json()
  console.log(data)
}

const graphQLFetch = async () => {
  const url = `http://localhost:8080/graphql`

  const dice = 3;
  const sides = 6;
  const spectrumID = '1237648720693690487';
  const query = `query GetSpectrum($spectrumID: String!) {
    spectrum: getSpectrum(id: $spectrumID) {
      id
      csvLink: csv_link
    }
  }`;

  const graphQLQuery = {
    query,
    variables: { dice, sides, spectrumID },
  }

  const req = new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(graphQLQuery)
  })

  const res = await fetch(req)
  const data = await res.json()
  console.log(data.data)
}

const Test = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  //fetchNews()
  graphQLFetch()

  return (
    <div>
      Test
    </div>
  )  
}

export default Test