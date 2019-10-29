import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  useHistory,
  useParams,
} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import {
  fetchEditedSpectrumData, 
} from '../../actions'

import {
  getIsFetching,
  getSelected,
} from '../../selectors/spectrum'

import Progress from '../progress/index.jsx'
import Chart from '../chart/index.jsx'

const useStyles = makeStyles(theme => ({
  paper:{
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4),
    height: '100%',
    overflow: 'auto',
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

  const handleClick = id => () => {
    history.push(`/list/${id}`)
  }

  console.log(spectrumData)

  return(
    <Paper className={classes.paper}>
      { isFetching && <Progress/> }      
      <IconButton edge="end" aria-label="delete" onClick={() => history.push(`/list`) }>
        <ArrowBackIosIcon />
      </IconButton>

      Spectrum: {id}
    </Paper>
  )
}

export default EditPage