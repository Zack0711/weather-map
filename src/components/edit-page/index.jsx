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
import Toolbar from '@material-ui/core/Toolbar'

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
  paper: {
    height: '100%',
    overflow: 'auto',
  },
  main: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
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

  return(
    <Paper className={classes.paper}>
      { isFetching && <Progress/> }
      <Toolbar>  
        <IconButton edge="end" aria-label="delete" onClick={() => history.push(`/list`) }>
          <ArrowBackIosIcon />
        </IconButton>
      </Toolbar>
      <main className={classes.main}>
        Spectrum: {id}
        <Chart 
          spectrumData={ spectrumData.data ? spectrumData : {} }
         />
       </main>
    </Paper>
  )
}

export default EditPage