import React, { useState, useEffect } from 'react'
import {graphql, QueryRenderer} from 'react-relay'

import {
  useHistory,
  useParams,
} from "react-router-dom"

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';

import environment from '../environment'

const useStyles = makeStyles(theme => ({
}))

const GET_SPECTRUM_LIST = gql`
  query spectrumListQuery {
    list: spectrumList {
      id
      modifyDate: modify_date
    }
  }
`

const GET_SPECTRUM = gql`
  query spectrumQuery($id: ID!) {
    spectrum: getSpectrum(id: $id) {
      id
      csvLink: csv_link
    }
  }
`
/*
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
*/

const Test = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const id = '1237648720693690487'
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_SPECTRUM_LIST, {
    notifyOnNetworkStatusChange: true,
//    pollInterval: 500,
  })

  const handleListClick = id => () => {
    history.push(`/test/${id}`)
  }

  if (networkStatus === 4) return 'Refetching!'
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <ul>
      {
        data.list.map( d => <li key={d.id} onClick={handleListClick(d.id)} >{d.id}</li>)
      }
      </ul>
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  )  
}

export default Test