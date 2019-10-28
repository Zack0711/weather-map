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
} from '../../selectors/spectrum'

import {
  fetchSpectrumList, 
} from '../../actions'

import httpService from '../../services/httpService'

import FormDialog from '../form-dialog/index.jsx'

import Progress from '../progress/index.jsx'

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
  form: {
    minWidth: '360px'
  }
}))

const AddSpectrumForm = ({className, value, handleChange, error}) => (
  <form noValidate autoComplete="off" className={className}>
    <TextField
      value={value}
      error={error.isError}
      id="standard-full-width"
      label="ID"
      style={{ margin: 8 }}
      onChange={handleChange}
      helperText={error.message}
      fullWidth
      margin="normal"
    />
  </form>
)

const defaultError = {
  isError: false,
  message: '',
}

const ListPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  const list = useSelector(getList)
  const isFetching = useSelector(getIsFetching)

  const [isFormOpen, setFormOpen] = React.useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [error, setError] = React.useState(defaultError)

  const [addID, setAddID] = React.useState('')
  const [deleteID, setDeleteID] = React.useState('')

  useEffect(() => {
    dispatch(fetchSpectrumList)
  }, [])

  const handleChange = event => {
    setAddID(event.target.value)
  }

  const onFormClose = () => { setFormOpen(false) }
  const onAddConfirm = async () => { 
    if(addID){
      const rsp = await httpService.sendRequest('addSpectrum', { data: {id: addID} })
      if(rsp.message){
        setError({
          isError: true,
          message: rsp.message
        })
      }else{
        setAddID('')
        onFormClose()
        history.push(`/list/${addID}`)
      }
    }
  }

  const onDeleteDialogClose = () => { setDeleteDialogOpen(false) }  
  const onDeleteConfirm = async () => { 
    const rsp = await httpService.sendRequest('deleteSpectrum', { id: deleteID })
    setDeleteID('')
    setDeleteDialogOpen(false)
    dispatch(fetchSpectrumList)
  }

  const handleAddBTNClick = () => { setFormOpen(true) }

  const handleListClick = id => () => {
    history.push(`/list/${id}`)
  }

  const handleDeleteClick = id => () => { 
    setDeleteID(id)
    setDeleteDialogOpen(true)
  }

  return(
    <Paper className={classes.paper}>
      { isFetching && <Progress/> }
      
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
      <FormDialog 
        title={'新增資料'}
        children={<AddSpectrumForm 
          error={error}
          className={classes.form}
          value={addID} 
          handleChange={handleChange} 
        />}
        open={isFormOpen} 
        onClose={onFormClose}  
        onConfirm={onAddConfirm}
      />
      <FormDialog 
        title={'確定刪除這筆資料？'}
        children={deleteID}
        open={isDeleteDialogOpen} 
        onClose={onDeleteDialogClose}  
        onConfirm={onDeleteConfirm}
      />
    </Paper>
  )
}

export default ListPage