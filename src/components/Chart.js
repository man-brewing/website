import React from 'react';
import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getEnvironmentData } from '../util/api'
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import { largestTriangleThreeBucket } from 'd3fc-sample';
import { Grid, Switch } from '@material-ui/core';
import { toCelsius, toFahrenheit } from '../util/helpers';

function Alert(props) {
    return <MuiAlert elevation={8} variant="filled" {...props} />;
}

const lineColors = {
    red: '#FF0000',
    green: '#0000FF',
    purple: '#8000FF',
    yellow: '#FFC300',
    blue: '#3339FF',
}

const TempUnits = {
    Celsius: 'Celsius',
    Fahrenheit: 'Fahrenheit',
}

/**
 * Chart to show the environment data.
 */
export default class Chart extends React.Component {
    // this is where the example code was lifted from
    static example = 'http://recharts.org/en-US/examples/SimpleLineChart';
    
    // data sampler to reduce rendered elements on the chart
    sampler = largestTriangleThreeBucket();

    /**
     * Initializes this component with default state.
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            hasError: false,
            showErrorAlert: false,
            startDate: moment().subtract(1, 'M'),
            endDate: moment(),
            currentTempUnit: TempUnits.Celsius, // data comes in as celsius
        };
    }

    /**
     * Runs when the component gets mounted to the DOM.
     */
    componentDidMount() {
        this.loadData();
    }

    /**
     * Formats the tooltip label data.
     * @param {*} value 
     * @param {*} name 
     */
    labelFormatter(value, name) {
        switch (name) {
            case 'Outdoor Temperature':
            case 'Room Temperature':
                return [value + '°C', name]
            case 'Outdoor Humidity':
            case 'Room Humidity':
                return [value + '%', name]
            default:
                return [value, name]
        }
    }

    /**
     * Load the chart data.
     */
    loadData = () => {
        this.setState({
            loading: true,
        });

        let { startDate, endDate } = this.state;

        getEnvironmentData(startDate, endDate) // this returns a Promise
            .then(response => {
                let dataCount = response.data.length;
                let bucketSize = dataCount > 100 ? dataCount * .03 : dataCount;

                this.sampler.bucketSize(bucketSize)
                    .x(d => d.ambientTemperatureC)
                    .y(d => moment(d.id).valueOf());

                let sampledData = this.sampler(response.data);
                
                // put the data in the component state and we are no longer loading
                this.setState({
                    data: sampledData,
                    loading: false,
                });               
            })
            .catch(_ => {                
                this.setState({
                    loading: false,
                    hasError: true,
                    showErrorAlert: true,
                });
            });
    }

    /**
     * Close the error alert.
     */
    handleClose = () => {
        this.setState({
            showErrorAlert: false,
        });
    };

    /**
     * Reloads data with the new start date.
     */
    handleStartDateChange = (date) => {
        this.setState({
            startDate: date,
        }, () => this.loadData());        
    }

    /**
     * Reloads data with the new end date.
     */
    handleEndDateChange = (date) => {
        this.setState({
            endDate: date,
        }, () => this.loadData());
    }

    /**
     * Changes both temp measurements to Fahrenheit.
     * @param {*} celsius 
     */
    convertToFahrenheit = (celsius) => {
        celsius.ambientTemperatureC = toFahrenheit(celsius.ambientTemperatureC);
        celsius.weatherTemperatureC = toFahrenheit(celsius.weatherTemperatureC);
    }

    /**
     * Changes both temp measurements to Celsius
     * @param {*} fahrenheit 
     */
    convertToCelsius = (fahrenheit) => {
        fahrenheit.ambientTemperatureC = toCelsius(fahrenheit.ambientTemperatureC);
        fahrenheit.weatherTemperatureC = toCelsius(fahrenheit.weatherTemperatureC);
    }

    /**
     * Changes the temperature units of the loaded data.
     */
    handleTempUnitChange = () => {
        let { currentTempUnit, data } = this.state;     

        if (currentTempUnit === TempUnits.Celsius) {
            data.forEach((value) => this.convertToFahrenheit(value));
        } else {
            data.forEach((value) => this.convertToCelsius(value));
        }

        this.setState((prevState) => {
            return {
                currentTempUnit: prevState.currentTempUnit === TempUnits.Celsius ? TempUnits.Fahrenheit : TempUnits.Celsius,
                data,
            };
        });
    }

    /**
     * Draws the component on the DOM.
     */
    render() {
        // get these values out of the component's state
        const { data, loading, hasError, showErrorAlert } = this.state       

        // error, don't render the chart
        if (hasError) {
            return (
                <>
                    <div style={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Please try again later.
                    </div>
                    <Snackbar open={showErrorAlert} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="error">
                            Unable to load environment data.
                        </Alert>
                    </Snackbar>
                </>
            )
        }
        
        // we are not loading so let's render the line chart
        return (
            <>
                <Box style={{ background: 'gray', display: 'flex' }}>
                    <KeyboardDatePicker
                        autoOk
                        label={`Start Date:`}
                        disableFuture
                        value={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        format={moment.format}
                    />
                    <KeyboardDatePicker
                        autoOk
                        label={`End Date:`}
                        disableFuture
                        value={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        format={moment.format}
                    />                    
                    <Grid component="label" container alignItems="center">
                        <Grid item>Fahrenheit</Grid>
                        <Grid item>
                            <Switch checked={this.state.currentTempUnit === TempUnits.Celsius} onChange={this.handleTempUnitChange} name="tempUnit" />
                        </Grid>
                        <Grid item>Celsius</Grid>
                    </Grid>
                </Box>
                <div style={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {loading ?
                            <CircularProgress />
                        :                        
                        <ResponsiveContainer>
                            <LineChart
                                style={{ margin: '0 auto' }}                   
                                width={window.innerWidth - 100}
                                height={600}
                                data={data}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    allowDataOverflow
                                    dataKey='timestamp'
                                    type='category'
                                    tick={<CustomizedAxisTick />}
                                    height={150}
                                >
                                    <Label value="Timestamp" offset={0} position="insideBottom" />
                                </XAxis>
                                <YAxis
                                    allowDataOverflow
                                    type="number"
                                    yAxisId="1"
                                    domain={['dataMin - 10', 'dataMax + 10']}
                                    allowDecimals={false}
                                >
                                    <Label angle={-90} value={`Temperature °${this.state.currentTempUnit.charAt(0)}`} position='insideLeft' style={{ textAnchor: 'middle' }} />
                                </YAxis>
                                <YAxis
                                    orientation="right"
                                    allowDataOverflow
                                    type="number"
                                    yAxisId="2"
                                    domain={['dataMin - 10', 'dataMax + 10']}
                                    allowDecimals={false}
                                >
                                    <Label angle={90} value='Humidity %' position='insideRight' style={{ textAnchor: 'middle' }} />
                                </YAxis>
                                <Tooltip formatter={this.labelFormatter} labelFormatter={(value) => {return moment(value).format('LLL')}} />
                                <Legend layout='horizontal' align='center' verticalAlign='top' />
                                <Line yAxisId="1" type="natural" dataKey="ambientTemperatureC" name="Room Temperature" stroke={lineColors.red} animationDuration={300} />
                                <Line yAxisId="2" type="natural" dataKey="ambientHumidityPercent" name="Room Humidity" stroke={lineColors.blue} animationDuration={300} />
                                <Line yAxisId="1" type="natural" dataKey="weatherTemperatureC" name="Outdoor Temperature" stroke={lineColors.yellow} animationDuration={300} />
                                <Line yAxisId="2" type="natural" dataKey="weatherHumidityPercent" name="Outdoor Humidity" stroke={lineColors.purple} animationDuration={300} />
                            </LineChart>              
                        </ResponsiveContainer>
                    }
                </div>
            </>
        );
    }
}

/**
 * Turns the X Axis tick labels on an angle.
 */
class CustomizedAxisTick extends React.Component {
    render() {
        const { x, y, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{moment(payload.value).format('LLL')}</text>
            </g>
        );
    }
}