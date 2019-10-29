import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  useHistory,
} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import {
  getIsFetching,
  getIsAddDialogOpen,
  getIsAddSpectrumResult,
} from '../../selectors/spectrum'

import {
  addSpectrum,
  closeAddDialog,
} from '../../actions'

import FormDialog from '../form-dialog/index.jsx'
import Progress from '../progress/index.jsx'

const useStyles = makeStyles(theme => ({
  form: {
    position: 'relative',
    minWidth: '360px',
  },
}))

const AddDialog = ({className, error = { isError: null }}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [id, setId] = React.useState('')

  const isOpen = useSelector(getIsAddDialogOpen)
  const isFetching = useSelector(getIsFetching)
  const result = useSelector(getIsAddSpectrumResult)

  useEffect(() => {
    if(!result.error && result.success){
      history.push(`/list/${id}`)
      setId('')
      dispatch(closeAddDialog())
    }
  }, [result])

  const onChange = e => {
    setId(e.target.value)
  }

  const onClose = () => { 
    dispatch(closeAddDialog())
  }

  const onConfirm = () => {     
    dispatch(addSpectrum(id))
  }

  return(
    <FormDialog 
      title={'新增資料'}
      open={isOpen} 
      onClose={onClose}  
      onConfirm={onConfirm}
      disabled={isFetching}
      isFetching={isFetching}
    >
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          value={id}
          error={result.error}
          id="standard-full-width"
          label="ID"
          onChange={onChange}
          helperText={result.message}
          fullWidth
          margin="normal"
        />
      </form>
    </FormDialog>
  )
}

export default AddDialog
