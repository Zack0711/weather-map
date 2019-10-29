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
import Typography from '@material-ui/core/Typography'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import DescriptionIcon from '@material-ui/icons/Description'
import DeleteIcon from '@material-ui/icons/Delete'

import {
  getIsFetching,
  getList,
  getIsAddDialogOpen,
} from '../../selectors/spectrum'

import {
  openAddDialog,
  fetchSpectrumList, 
} from '../../actions'

import httpService from '../../services/httpService'

import FormDialog from '../form-dialog/index.jsx'

import Progress from '../progress/index.jsx'
import AddDialog from '../add-dialog/index.jsx'

const useStyles = makeStyles(theme => ({
  paper:{
    position: 'relative',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
  },
}))

const ListPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  const list = useSelector(getList)
  const isFetching = useSelector(getIsFetching)
  const isAddDialogOpen = useSelector(getIsAddDialogOpen)

  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [deleteID, setDeleteID] = React.useState('')

  useEffect(() => {
    dispatch(fetchSpectrumList)
  }, [])

  const onDeleteDialogClose = () => { setDeleteDialogOpen(false) }  
  const onDeleteConfirm = async () => { 
    setIsDeleting(true)
    const rsp = await httpService.sendRequest('deleteSpectrum', { id: deleteID })
    setIsDeleting(false)
    setDeleteID('')
    setDeleteDialogOpen(false)
    dispatch(fetchSpectrumList)
  }

  const handleAddBTNClick = () => { 
    dispatch(openAddDialog())
  }

  const handleListClick = id => () => {
    history.push(`/list/${id}`)
  }

  const handleDeleteClick = id => () => { 
    setDeleteID(id)
    setDeleteDialogOpen(true)
  }

  return(
    <Paper className={classes.paper}>
      { (isFetching && !isAddDialogOpen && !isDeleteDialogOpen) && <Progress/> }      
      <Fab 
        disabled={isFetching}
        className={classes.fab} 
        onClick={handleAddBTNClick} 
        aria-label="Add" 
        color="primary" 
        size="small"
      >
        <AddIcon />
      </Fab>
      <Typography variant="h4" align="center" gutterBottom>
        光譜資料列表
      </Typography>
      <List>
        {
          list.map( d => (
            <ListItem key={d.id} onClick={handleListClick(d.id)} button>
              <ListItemAvatar>
                <Avatar>
                  <DescriptionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={d.id}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick(d.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
      <AddDialog />
      <FormDialog 
        title={'確定刪除這筆資料？'}
        children={deleteID}
        open={isDeleteDialogOpen} 
        onClose={onDeleteDialogClose}  
        onConfirm={onDeleteConfirm}
        isFetching={isDeleting}
      />
    </Paper>
  )
}

export default ListPage