import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Switch,
  Route,
  useHistory,
  useRouteMatch,
} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'

import {
  fetchSpectrumList, 
} from '../actions'

import List from '../components/list/index.jsx'
import EditPage from '../components/edit-page/index.jsx'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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

const SpectrumList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  let { path, url } = useRouteMatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchSpectrumList)
  }, [])

  return(
    <main>
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path={path}>
            <List />
          </Route>
          <Route path={`${path}/:id`}>
            <EditPage />
          </Route>
        </Switch>
      </Container>
    </main>
  )
}

export default SpectrumList