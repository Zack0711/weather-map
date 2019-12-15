import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'

import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'

import Divider from '@material-ui/core/Divider';

import {
  useHistory,
} from "react-router-dom"

import {
  getViewed,
  getIsFetching,
  getDefaultAnswer,
} from '../selectors/spectrum'

import {
  updateViewedSpectrum,
} from '../actions'

import ChartWrapper from '../containers/chart-wrapper'
import Chart from '../components/chart/composition.jsx'
import Progress from '../components/progress/index.jsx'
import DropdownMenu from '../components/dropdown-menu/index.jsx'

import { genEnergyDensityDataSet } from '../utilities/formula'
import { redshiftCalibration } from '../utilities/redshift'

import element from '../element.js'

const DEFAULT_TEMPERATURE = 3600

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
  checkForm: {
    margin: 0,
  },
  chip: {
    margin: '0 4px',
  },
  divider: {
    margin: '8px 0',
  }
}))

const elementOption = element.list.map( d => ({ label: d, value: d}))

const spectralType = {
  O: '> 25,000K',
  B: '10,000-25,000K',
  A: '7,500-10,000K',
  F: '6,000-7,500K',
  G: '5,000-6,000K',
  K: '3,500-5,000K',
  M: '< 3,500K',
  C: '< 3,500K',
}

const SpectrumComposition= () => {
  const classes = useStyles()
  const spectrumData = useSelector(getViewed)
  const defaultAnswer = useSelector(getDefaultAnswer) 

  const history = useHistory()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [selectedElement, setSelectedElement] = useState(element.list[0])
  const [elementData, setElementData] = useState([])
  const [redshift, setRedshift] = useState(0)
  const [elementList, setElementList] = useState([])

  const elementComposition = [ 'H', 'O_I', 'O_II', 'He' ]

  const isFetching = useSelector(getIsFetching)

  useEffect(() => {
    if(spectrumData.redshift){
      const redshift = Number(spectrumData.redshift.split(' ')[0])
      const selectedElementData = element.data[selectedElement]
      setElementData(
        selectedElementData.map(d => ({
          ...d,
          Wavelength: redshiftCalibration(d.Wavelength, redshift)
        }))
      )
      setRedshift(redshift)
    }
  }, [spectrumData])

  useEffect(() => {
    dispatch(updateViewedSpectrum)
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleElementChange = option => {
    const newElementData = element.data[option.value]

    setElementData(
      newElementData.map(d => ({
        ...d,
        Wavelength: redshiftCalibration(d.Wavelength, redshift)
      }))
    )
    setSelectedElement(option.value)
  }

  const handleElementSelect = val => () => {
    const eleIndex = elementList.indexOf(val)
    if(eleIndex > -1){
      setElementList(elementList.filter(d => d !== val))
    }else{
      setElementList([...elementList, val])      
    }
  }

  const handleElementUnselect = val => () => {
    setElementList(elementList.filter(d => d !== val))    
  }

  return(
    <>
      { isFetching && <Progress/> }    
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <IconButton 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="home"
            onClick={()=>{
              history.push('/')
            }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            恆星的成分組成
            {
              spectrumData.id && `(ID: ${spectrumData.id})`
            }
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper}>
            <ChartWrapper>
              <Chart
                spectrumData={spectrumData}
                type="composition"
                elementData={elementData}
              />
            </ChartWrapper>
          </Paper>
          {
            elementList.length > 0 && (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                已選擇元素：
                {
                  elementList.map(ele => <Chip
                    color="primary"
                    variant="outlined"
                    onDelete={handleElementUnselect(ele)}
                    classes={{ root: classes.chip }}
                    key={ele}
                    label={ele}
                  />)
                }
              </Grid>
            )
          }
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Typography align="left" color="textSecondary">
              比對元素圖譜，找出該星體組成成分
            </Typography>
            <DropdownMenu
              list={elementOption}
              label={selectedElement}
              onMenuClick={handleElementChange}
              buttonVariant="outlined"
            />
            <Typography align="left" color="textSecondary">
               選擇此元素
            </Typography>
            <FormControlLabel
              classes={{
                root: classes.checkForm
              }}
              control={
                <Checkbox
                  checked={elementList.indexOf(selectedElement) > -1}
                  onChange={handleElementSelect(selectedElement)}
                  value="checkedB"
                  color="primary"
                />
              }
            />
            <Button 
              disabled={elementList.length === 0}
              variant="contained" 
              color="primary" 
              className={classes.button} 
              onClick={handleClickOpen}
            >
              解答
            </Button>
          </Grid>
        </Container>
      </main>
      {
        spectrumData.subclass && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography align="left" color="textSecondary" >
                  恆星的成分為：
                </Typography>
                {
                  elementComposition.map(ele => <Chip
                    color="primary"
                    classes={{ root: classes.chip }}
                    key={ele}
                    label={ele}
                  />)
                }
                <Divider classes={{ root: classes.divider }}/>
                <Typography align="left" color="textSecondary" >
                  你的答案：
                </Typography>
                {
                  elementList.map(ele => <Chip
                    color="primary"
                    variant="outlined"
                    classes={{ root: classes.chip }}
                    key={ele}
                    label={ele}
                  />)
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                關閉
              </Button>
            </DialogActions>
          </Dialog>
        )
      }
    </>
  )
}

export default SpectrumComposition