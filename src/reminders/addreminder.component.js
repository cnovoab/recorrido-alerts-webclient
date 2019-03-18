import React, { Component } from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../_components/nav';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { reminderAction } from '../_actions';
import { withRouter } from 'react-router-dom';


const drawerWidth = 240;

const styles = theme => ({

    root: {
        flexGrow: 1,
      },

  contentRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
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
});

class AddReminder extends Component {

    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(reminderAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const { match : {params } } = this.props;

        if(params.id){
            const { dispatch } = this.props;
            dispatch(reminderAction.getReminderById(params.id));
        }
    }


    handleClick(event){
        const { match : {params } } = this.props;
        const { dispatch } = this.props;

        let payload={
            name: this.props.reminder.name,
            departure_city_id: this.props.reminder.departure_city_id,
            destination_city_id: this.props.reminder.destination_city_id,
            price: this.props.reminder.price,
            service_stars: this.props.reminder.service_stars,
        }

        if(params.id){
            dispatch(reminderAction.editReminderInfo(params.id, payload));
        }else{
            dispatch(reminderAction.createReminder(payload));
        }
    }


   render() {
     const { classes } = this.props;
     const { match : {params } } = this.props;

     function InsertText(props) {
        return <Typography>{'Add New Reminder'}</Typography>;
      }

      function EditText(props) {
          return <Typography>{'Edit Reminder'}</Typography>;
      }


    function SegHeader() {
        if(params.id){
            return <EditText />;
        }
        return <InsertText />;
    }

      return (

        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar/>
            <Nav />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <SegHeader />
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <div>
                            <Paper className={classes.contentRoot} elevation={1}>
                                <form className={classes.container}>
                                    <Grid container spacing={24}>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="name"
                                                label="Name"
                                                className={classes.textField}
                                                value={this.props.reminder.name}
                                                onChange={this.handleChange('name')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="departure_city_id"
                                                label="DepartureCity"
                                                className={classes.textField}
                                                value={this.props.reminder.departure_city_id}
                                                onChange={this.handleChange('departure_city_id')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="destination_city_id"
                                                label="DestinationCity"
                                                className={classes.textField}
                                                value={this.props.reminder.destination_city_id}
                                                onChange={this.handleChange('destination_city_id')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="price"
                                                label="Price"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.reminder.price}
                                                onChange={this.handleChange('price')}
                                                margin="normal"
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container spacing={24}>
                                        <Grid item xs={3}>
                                        </Grid>
                                        <Grid item xs={6}>
                                        </Grid>
                                        <Grid item xs={3} container justify="center">
                                            <Grid container spacing={24}>
                                                <Grid item xs={6} container justify="center">
                                                    <Button variant="contained" color="secondary" className={classes.button} component='a' href="/reminder">
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} container justify="flex-start">
                                                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.handleClick(event)}>
                                                        Save
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </form>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </main>
            </div>
        </div>
      );
   }
}

//export default Home;

AddReminder.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default BoxCon
const mapStateToProps = (state) =>{
    return state;
}


const connectedAddReminderPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddReminder)));

export { connectedAddReminderPage as AddReminder };
