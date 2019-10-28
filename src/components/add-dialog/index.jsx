import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import {
  getIsFetching,
  getIsAddDialogOpen,
} from '../../selectors/spectrum'

import FormDialog from '../form-dialog/index.jsx'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '360px',
  },
}))

const AddDialog = ({className, value, handleChange, error}) => {
  const classes = useStyles();

  const isOpen = useSelector(getIsAddDialogOpen)
  const isFetching = useSelector(getIsFetching)

  return(
    <FormDialog 
      title={'新增資料'}
      open={isOpen} 
      onClose={onFormClose}  
      onConfirm={onAddConfirm}
    >
      <form noValidate autoComplete="off" className={classes.root}>
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
    </FormDialog>
  )
}

export default AddDialog
