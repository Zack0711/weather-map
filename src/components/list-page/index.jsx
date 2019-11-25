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
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import DescriptionIcon from '@material-ui/icons/Description'
import DeleteIcon from '@material-ui/icons/Delete'
import AssignmentIcon from '@material-ui/icons/Assignment'

import {
  getIsFetching,
  getList,
  getIsAddDialogOpen,
  getDefaultAnswer,
} from '../../selectors/spectrum'

import {
  openAddDialog,
  fetchSpectrumList, 
  fetchDefaultAnswer,
  saveDefaultAnswer,
} from '../../actions'

import httpService from '../../services/httpService'

import FormDialog from '../form-dialog/index.jsx'

import Progress from '../progress/index.jsx'
import AddDialog from '../add-dialog/index.jsx'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={0}>{children}</Box>
    </Typography>
  );
}

const a11yProps = index => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
})

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
  fabAdd: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
  },
  fabEditDefault: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(10),
  },
  editDialog: {
    width: '80vh'
  },
  textFieldWide: {
    margin: 0,
    width: '100%'
  },
}))

const useStylesReddit = makeStyles(theme => ({
  root: {
    backgroundColor: '#eee',
    padding: theme.spacing(2)
  },
  focused: {},
}));

const ListPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const redditClasses = useStylesReddit()
  const history = useHistory()

  const list = useSelector(getList)
  const isFetching = useSelector(getIsFetching)
  const isAddDialogOpen = useSelector(getIsAddDialogOpen)
  const defaultAnswer = useSelector(getDefaultAnswer) 

  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [deleteID, setDeleteID] = React.useState('')
  const [editDefaultOpen, setEditDefaultOpen] = React.useState(false)

  const [values, setValues] = React.useState({
    surfaceTemperature: '',
    elementComposition: '',
    redshift: '',
  })

  const [tab, setTab] = React.useState(0);

  useEffect(() => {
    dispatch(fetchDefaultAnswer)
    dispatch(fetchSpectrumList)
  }, [])

  useEffect(() => {
    if(defaultAnswer.surface_temperature){
      const {
        surface_temperature,
        element_composition,
        redshift,
      } = defaultAnswer

      setValues({
        surfaceTemperature: surface_temperature,
        elementComposition: element_composition,
        redshift,        
      })
    }

  }, [defaultAnswer])

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  }


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

  const handleEditBTNClick = () => { 
    setEditDefaultOpen(true)
  }

  const handleSaveDefault = async () => { 
    await dispatch(saveDefaultAnswer(values))
    setEditDefaultOpen(false)
  }

  const closeEditDefaultDialog = () => { 
    setEditDefaultOpen(false)
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return(
    <Paper className={classes.paper}>
      { (isFetching && !isAddDialogOpen && !isDeleteDialogOpen) && <Progress/> }      
      <Fab 
        disabled={isFetching}
        className={classes.fabEditDefault} 
        onClick={handleEditBTNClick} 
        aria-label="Add" 
        color="secondary" 
        size="small"
      >
        <AssignmentIcon />
      </Fab>
      <Fab 
        disabled={isFetching}
        className={classes.fabAdd} 
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
              >
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs="4">{d.id}</Grid>
                  <Grid item xs="3">{d.subclass}</Grid>
                  <Grid item xs="5">{d.redshift}</Grid>
                </Grid>
              </ListItemText>
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
      <FormDialog 
        title={'編輯各單元通用答案'}
        open={editDefaultOpen} 
        onClose={closeEditDefaultDialog}  
        onConfirm={handleSaveDefault}
        isFetching={isFetching}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="表面溫度" {...a11yProps(0)} />
          <Tab label="成分組成" {...a11yProps(1)} />
          <Tab label="紅位移" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <TextField
            multiline
            value={values.surfaceTemperature}
            onChange={handleChange('surfaceTemperature')}
            rows="5"
            InputProps={{ classes: redditClasses, disableUnderline: true }}
            className={classes.textFieldWide}
            margin="normal"
          />        
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <TextField
            multiline
            value={values.elementComposition}
            onChange={handleChange('elementComposition')}
            rows="5"
            InputProps={{ classes: redditClasses, disableUnderline: true }}
            className={classes.textFieldWide}
            margin="normal"
          />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <TextField
            multiline
            value={values.redshift}
            onChange={handleChange('redshift')}
            rows="5"
            InputProps={{ classes: redditClasses, disableUnderline: true }}
            className={classes.textFieldWide}
            margin="normal"
          />
        </TabPanel>
       </FormDialog>
    </Paper>
  )
}

export default ListPage