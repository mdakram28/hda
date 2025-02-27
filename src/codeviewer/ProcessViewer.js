import React from "react";
import { Tabs, Tab, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TimelineCodeView from "./TimelineCodeView";
import LiveCodeView from "./LiveCodeView";
import MemoryGraph from "../graphs/MemoryGraph";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class ProcessViewer extends React.Component {
    state = {
        tabValue: 0
	};
	
	changeTab = (event, tabValue) => {
		this.setState({tabValue})
	}

    render() {
        const { tabValue } = this.state;
        const { classes, runId } = this.props;
        if (!runId) {
            return (
                <Typography variant="display1" gutterBottom>
                    Select a process from drawer
                </Typography>
            );
        }

        return (
            <div>
                <Paper className={classes.root}>
                    <Tabs
                        value={tabValue}
                        onChange={this.changeTab}>
                        <Tab label="Live Code View" />
                        <Tab label="Code Timeline" />
                        <Tab label="Resource Usage" />
                    </Tabs>
                </Paper>
                {tabValue === 0 && (
                    <Paper className={"tab-container"} elevation={1}>
                        <Typography variant="headline" component="h3">
                            LIVE CODE VIEW EXECUTION TRACE
                        </Typography>
                        <LiveCodeView runId={runId} />
                    </Paper>
                )}
                {tabValue === 1 && (
                    <Paper className={"tab-container"} elevation={1}>
                        <Typography variant="headline" component="h3">
                            TIME TRAVEL
                        </Typography>
                        <TimelineCodeView runId={runId} />
                    </Paper>
                )}
                {tabValue === 2 && (
                    <Paper className={"tab-container"} elevation={1}>
                        <Typography variant="headline" component="h3">
                            RESOURCE GRAPHS
                        </Typography>
                        <MemoryGraph runId={runId} />
                    </Paper>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(ProcessViewer);
