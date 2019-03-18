import { connect } from 'react-redux';
import { reminderAction } from '../_actions';
import React, { Component } from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../_components/nav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },

  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});


class Reminder extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(reminderAction.getReminder());
    }

      handleChange = event => {
        this.setState({
          anchor: event.target.value,
        });
      };


      handleClick = (event, id) => {
        const { dispatch } = this.props;
        dispatch(reminderAction.deleteReminderById(id))
      };

   render() {
     const { classes } = this.props;
     const { reminder } = this.props.reminder;

      return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar/>
            <Nav />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                      <Typography>{'Reminder'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">

                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">
                      <Button variant="contained" color="primary" className={classes.button} component='a' href="/add-reminder">
                        Add Reminder
                      </Button>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={24}>
                  <Paper className={classes.root}>
                      <Table className={classes.table}>
                          <TableHead>
                          <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell numeric>Departure</TableCell>
                              <TableCell numeric>Destination</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Service Class</TableCell>
                              <TableCell>Action</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {reminder.map(n => {
                              return (
                              <TableRow key={n.id}>
                                  <TableCell component="th" scope="row">
                                  {n.name}
                                  </TableCell>
                                  <TableCell numeric>{n.departure_city_id}</TableCell>
                                  <TableCell numeric>{n.destination_city_id}</TableCell>
                                  <TableCell>{n.price}</TableCell>
                                  <TableCell>{n.service_stars}</TableCell>
                                  <TableCell>
                                    <IconButton className={classes.button} aria-label="Show" component='a' href={`/show-reminder/${n.id}`}>
                                      <ShowChartIcon />
                                    </IconButton>
                                    <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-reminder/${n.id}`}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleClick(event, n.id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                              );
                          })}
                          </TableBody>
                      </Table>
                  </Paper>
                </Grid>
            </main>
            </div>
        </div>
      );
   }
}


Reminder.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>{
  return {
      reminder : state.reminder
  };
}

const connectedReminderPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Reminder)));

export { connectedReminderPage as Reminder };
