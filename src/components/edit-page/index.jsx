import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  useHistory,
  useParams,
} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

import {
  fetchEditedSpectrumData, 
} from '../../actions'

import {
  getIsFetching,
  getSelected,
} from '../../selectors/spectrum'

const useStyles = makeStyles(theme => ({
  paper:{
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },  
}))

const EditPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  let { id } = useParams()
  const spectrumData = useSelector(getSelected)
  const isFetching = useSelector(getIsFetching)

  useEffect(() => {
    dispatch(fetchEditedSpectrumData(id))
  }, [id])

  console.log(spectrumData)

  return(
    <Paper className={classes.paper}>
      Spectrum: {id}
    </Paper>
  )
}

export default EditPage