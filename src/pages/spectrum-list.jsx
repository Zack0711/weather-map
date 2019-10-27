import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import ListPage from '../components/list-page/index.jsx'
import EditPage from '../components/edit-page/index.jsx'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: '100vh',
  },
}))

const SpectrumList = () => {
  const classes = useStyles()
  let { path } = useRouteMatch()

  return(
    <main>
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path={path}>
            <ListPage />
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