import React from 'react';
import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import GetEnvironmentData from '../util/api'

const lineColors = {
    red: '#FF0000',
    green: '#0000FF',
    purple: '#8000FF',
    yellow: '#FFC300',
    blue: '#3339FF',
}

/**
 * Chart to show the environment data.
 */
export default class Chart extends React.Component {
    // this is where the example code was lifted from
    static example = 'http://recharts.org/en-US/examples/SimpleLineChart';
    
    /**
     * Initializes this component with default state.
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true
        };
    }

    /**
     * Runs when the component gets mounted to the DOM.
     */
    componentDidMount() {
        GetEnvironmentData() // this returns a Promise
            .then(response => response.json()) // JSON-ify the response body
            .then(json => {
                // put the data in the component state and we are no longer loading
                this.setState({
                    data: json.results,
                    loading: false
                });
            });
    }

    /**
     * Draws the component on the DOM.
     */
    render() {
        // get these values out of the component's state
        const { data, loading } = this.state;
        
        // render a loading placeholder until we have data
        if (loading === true) {
            return <p>Loading</p>
        }

        // we are not loading so let's render the line chart
        return (
            <ResponsiveContainer>
                <div>
                    <LineChart
                        style={{ margin: '0 auto' }}                   
                        width={window.screen.width - 100}
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
                        >
                            <Label angle={-90} value='Temperature °C' position='insideLeft' style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <YAxis
                            orientation="right"
                            allowDataOverflow
                            type="number"
                            yAxisId="2"
                            domain={['dataMin - 10', 'dataMax + 10']}
                        >
                            <Label angle={90} value='Humidity %' position='insideRight' style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <Tooltip />
                        <Legend layout='horizontal' align='center' verticalAlign='top' />
                        <Line yAxisId="1" type="natural" dataKey="temperature" name="Room Temperature" stroke={lineColors.red} animationDuration={300} />
                        <Line yAxisId="2" type="natural" dataKey="humidity" name="Room Humidity" stroke={lineColors.blue} animationDuration={300} />
                        <Line yAxisId="1" type="natural" dataKey="ambient_temp" name="Outdoor Temperature" stroke={lineColors.yellow} animationDuration={300} />
                        <Line yAxisId="2" type="natural" dataKey="ambient_humid" name="Outdoor Humidity" stroke={lineColors.purple} animationDuration={300} />
                    </LineChart>
                </div>
            </ResponsiveContainer>
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
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
        </g>
      );
    }
  }
