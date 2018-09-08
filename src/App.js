import React from "react";
import Text from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
//import Badge from '@material-ui/core/Badge';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
//import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SimpleLineChart from "./SimpleLineChart";
import Button from "@material-ui/core/Button";
//import CodeView from './CodeView';
// import Websocket from "react-websocket";
import LiveCodeView from "./codeviewer/LiveCodeView";

import { fetchFiles, fetchSources } from "./fetchfiles";
import TimelineCodeView from "./codeviewer/TimelineCodeView";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  }
});

class App extends React.Component {
  state = {
    open: true,
    file_list: [],
    CodeView: "Hello world",
    divState: true,
    selected_file: "fib.c"
  };

  getAllData() {
    console.log("sdfdsfdsf");
    fetchFiles("")
      .then(files => {
        var new_file_list = [];
        files.forEach(file =>
          new_file_list.push(
            <ListItem button key={file}>
              <ListItemIcon onClick={()=>this.setState({selected_file: file})}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={file} />
            </ListItem>
          )
        );
        this.setState({ file_list: new_file_list });
      })
      .catch(err => console.error(err));
  }

  constructor(props) {
    super(props);
    this.getAllData();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleCode(code) {
    let result = JSON.parse(code);
    this.setState({ CodeView: code });
  }
  display() {
    alert("Will be done soon");
  }

  changeView() {
    if (this.state == true) this.setState({ divState: false });
    else this.setState({ divState: true });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}>
            <Toolbar
              disableGutters={!this.state.open}id
              className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden
                )}>
                <MenuIcon />
              </IconButton>
              {/* <Typography variant="title" color="inherit" noWrap className={classes.title}>
                Basic
              </Typography> */}
              <div />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{this.state.file_list}</List>
            {/* <List>{mainListItems}</List> */}
            <Divider />
            {/* <List>{secondaryListItems}</List> */}
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Typography variant="display1" gutterRight>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}>
                CodeView
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}>
                Memory UsageS
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}>
                Overview
              </Button>
            </Typography>
            <Typography component="div" className={classes.chartContainer}>
              <SimpleLineChart />
            </Typography>
			  <LiveCodeView file={this.state.selected_file} />
			  <TimelineCodeView file={this.state.selected_file} />
            <Typography variant="display1" gutterBottom>
              Lines of Code Executed
            </Typography>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
