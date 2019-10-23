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

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import DescriptionIcon from '@material-ui/icons/Description'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import {
  getList,
} from '../../selectors/spectrum'

import {
  fetchSpectrumList, 
} from '../../actions'

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

const ListPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  const list = useSelector(getList)

  useEffect(() => {
    dispatch(fetchSpectrumList)
  }, [])

  const handleClick = id => () => {
    history.push(`/list/${id}`)
  }

  return(
    <Paper className={classes.paper}>
      <List>
        {
          list.map( d => (
            <ListItem key={d.id}>
              <ListItemAvatar>
                <Avatar>
                  <DescriptionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={d.id}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={handleClick(d.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>    
    </Paper>
  )
}

export default ListPage