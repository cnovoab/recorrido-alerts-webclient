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


class ShowReminder extends Component {
    componentDidMount() {
        const { match : {params } } = this.props;

        if(params.id){
            const { dispatch } = this.props;
            dispatch(reminderAction.getLookupsByReminderId(params.id));
        }
    }

      handleChange = event => {
        this.setState({
          anchor: event.target.value,
        });
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
                      <div> Hola </div>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">
                      <div> Que tal </div>
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
                              <TableCell>Date</TableCell>
                              <TableCell>Time</TableCell>
                              <TableCell>Service Class</TableCell>
                              <TableCell numeric>Min. Price</TableCell>
                              <TableCell>Bus Operator</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {reminder.map(n => {
                              return (
                              <TableRow key={n.id}>
                                  <TableCell component="th" scope="row">
                                  {n.name}
                                  </TableCell>
                                  <TableCell>{n.departure_date}</TableCell>
                                  <TableCell>{n.departure_date}</TableCell>
                                  <TableCell>{n.service_stars}</TableCell>
                                  <TableCell>{n.price}</TableCell>
                                  <TableCell>{n.bus_operator}</TableCell>
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


ShowReminder.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>{
  return {
      reminder : state.reminder,
      lookups  : state.lookups,
      bustravels: state.bustravels
  };
}

const connectedReminderPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(ShowReminder)));

export { connectedReminderPage as ShowReminder };
