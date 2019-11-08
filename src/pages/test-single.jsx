import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  useHistory,
  useParams,
} from "react-router-dom"

import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
}))

const GET_SPECTRUM = gql`
  query spectrumQuery($id: ID!) {
    spectrum: getSpectrum(id: $id) {
      id
      csvLink: csv_link
      redshift
      elementComposition: element_composition
      surfaceTemperature: surface_temperature
    }
  }
`

const UPDATE_SPECTRUM = gql`
  mutation UpdateSpectrum($id: String!, $input: SpectrumInput) {
    modifySpectrum(id: $id, input: $input) {
      id
      csvLink: csv_link
      redshift
      elementComposition: element_composition
      surfaceTemperature: surface_temperature
    }
  }
`

const TestSingle = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const { id } = useParams()
  const [update, { variables }] = useMutation(UPDATE_SPECTRUM)

  const { loading, error, data, networkStatus } = useQuery(GET_SPECTRUM, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  })

  if (networkStatus === 4) return 'Refetching!'
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div>
      <button onClick={() => {
        update({ variables: { 
          id, 
          input: {
            surface_temperature: 'test',
          },
        }})
      }}>Update</button>
      <button onClick={() => history.push(`/test`)}>Back to list</button>
      <h3>{id}</h3>
      <div>
        { data.spectrum.csvLink }
      </div>
    </div>
  )  
}

export default TestSingle