import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Switch,
  Route,
  useHistory,
  useRouteMatch,
} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

import {
  getList,
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

const List = () => {

  const list = useSelector(getList)

  const classes = useStyles()
  const history = useHistory()

  return(
    <Paper className={classes.paper}>
      {
        list.map( d => d.id)
      }
    </Paper>
  )
}

export default List