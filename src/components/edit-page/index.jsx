import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  useHistory,
  useParams,
} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import SaveIcon from '@material-ui/icons/Save'
import LaunchIcon from '@material-ui/icons/Launch'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import {
  fetchEditedSpectrumData,
  updateSpectrum,
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
    position: 'relative',
    padding: '64px 0 0',
  },
  toolbar: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
  title: {
    flexGrow: 1,
  },
  main: {
    height: '100%',
    overflow: 'auto',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  button: {
    margin: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(4)}px`,
    alignItems: 'center',
  },
  referenceButton: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  textFieldWide: {
    width: '100%'
  }
}))

const EditPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  let { id } = useParams()
  const spectrumData = useSelector(getSelected)
  const isFetching = useSelector(getIsFetching)

  const [values, setValues] = React.useState({
    subclass: '',
    surfaceTemperature: '',
    elementComposition: '',
    redshift: '',
  })

  useEffect(() => {
    dispatch(fetchEditedSpectrumData(id))
  }, [id])

  useEffect(() => {
    const {
      subclass,
      surfaceTemperature,
      elementComposition,
      redshift,
    } = spectrumData

    setValues({
      subclass,
      surfaceTemperature,
      elementComposition,
      redshift,      
    })

  }, [spectrumData])

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleUpdate = () => {
    dispatch(updateSpectrum(id, values))
  }

  const openReference = () =>{
    window.open(spectrumData.reference, '_blank')
  }

  return(
    <Paper className={classes.paper}>
      { isFetching && <Progress/> }
      <Toolbar className={classes.toolbar}>  
        <IconButton onClick={() => history.push(`/list`) }>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6" align="center" className={classes.title}>編輯光譜資料</Typography>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          <SaveIcon />
        </Button>
      </Toolbar>
      <main className={classes.main}>
        <div className={classes.form}>
          <TextField
            label="Spectrum ID"
            value={id}
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Subclass"
            value={values.subclass}
            className={classes.textField}
            onChange={handleChange('subclass')}
            margin="normal"
          />
          <Button variant="contained" color="default" onClick={openReference} className={classes.referenceButton}>
            原始資料網址
            <LaunchIcon />
          </Button>
        </div>
        <Chart spectrumData={ spectrumData.data ? spectrumData : {} } />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="stretch"
          className={classes.form}
          spacing={3}
        >
          <Grid item sm={4}>
            <TextField
              label="表面溫度"
              multiline
              value={values.surfaceTemperature}
              onChange={handleChange('surfaceTemperature')}
              rows="4"
              className={classes.textFieldWide}
              margin="normal"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              label="成分組成"
              multiline
              value={values.elementComposition}
              onChange={handleChange('elementComposition')}
              rows="4"
              className={classes.textFieldWide}
              margin="normal"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              label="紅位移"
              multiline
              value={values.redshift}
              onChange={handleChange('redshift')}
              rows="4"
              className={classes.textFieldWide}
              margin="normal"
            />
          </Grid>
        </Grid>
       </main>
    </Paper>
  )
}

export default EditPage