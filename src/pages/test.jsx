import React, { useState, useEffect } from 'react'

import {
  useHistory,
  useParams,
} from "react-router-dom"

import { 
  useQuery,
  useLazyQuery,
  useApolloClient,
} from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';

//import environment from '../environment'
import {
  GET_SPECTRUM_LIST,
  GET_SPECTRUM
} from '../graphql'

import {
  fetchGraphQL
} from '../actions'

const useStyles = makeStyles(theme => ({
}))

/*
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
*/

const Test = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const id = '1237648720693690487'

/*
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_SPECTRUM_LIST, {
    notifyOnNetworkStatusChange: true,

  })
*/

  const client = useApolloClient()
  let list =[]

  try{
    const data = client.readQuery({ query: GET_SPECTRUM_LIST })
    list = data.list
  }catch(e){

  }

  /*
  const [getSpectrumList, { called, loading, data }] = useLazyQuery(
    GET_SPECTRUM_LIST, {}
  )
  */

  const handleListClick = id => () => {
    history.push(`/test/${id}`)
  }

  const refreshClick = async () => {
    //console.log(client, client.readQuery({ query: GET_SPECTRUM_LIST }))
    const rsp = await client.query({ query: GET_SPECTRUM_LIST, fetchPolicy: 'network-only'})
    console.log(rsp)
    console.log(client.readQuery({ query: GET_SPECTRUM_LIST }))
    //dispatch(fetchGraphQL(client))
  }

  console.log(list)

  //if (networkStatus === 4) return 'Refetching!'
  //if (loading) return <p>Loading...</p>
  //if (error) return <p>Error :(</p>

  return (
    <div>
      <ul>
      {
        list.map( d => <li key={d.id} onClick={handleListClick(d.id)} >{d.id}</li>)
      }
      </ul>
      <button onClick={refreshClick}>Refetch!</button>
    </div>
  )  
}

export default Test