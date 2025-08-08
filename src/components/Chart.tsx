import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Label,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import type { AtmoRecord } from '../models/AtmoRecord';
import Box from '@mui/material/Box';
import { DateTime } from 'luxon';
import { TempUnits } from '../models/TempUnits';

const lineColors = {
  red: '#FF0000',
  green: '#0000FF',
  purple: '#8000FF',
  yellow: '#FFC300',
  blue: '#3339FF',
};

export interface FermentoriumData {
  data: AtmoRecord[];
  temperatureUnits: TempUnits;
}

const CustomizedAxisTick = ({ x, y, payload }: any) => {
  const date = DateTime.fromISO(payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {date.toLocaleString(DateTime.DATE_SHORT)}
      </text>
    </g>
  );
};

const labelFormatter = (value: number, name: string) => {
  switch (name) {
    case 'Outdoor Temperature':
    case 'Room Temperature':
      return [value + '°C', name];
    case 'Outdoor Humidity':
    case 'Room Humidity':
      return [value + '%', name];
    default:
      return [value, name];
  }
};

const Chart = ({ data }: FermentoriumData) => {
  return (
    <Box sx={{ width: '100%', height: '600px', marginTop: '20px' }}>
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
            dataKey="timestamp"
            type="category"
            height={80}
            tick={<CustomizedAxisTick />}
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
            <Label
              angle={-90}
              value={`Temperature °${0}`}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <YAxis
            orientation="right"
            allowDataOverflow
            type="number"
            yAxisId="2"
            domain={['dataMin - 10', 'dataMax + 10']}
            allowDecimals={false}
          >
            <Label
              angle={90}
              value="Humidity %"
              position="insideRight"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip
            formatter={labelFormatter}
            labelFormatter={(value) =>
              DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_MED)
            }
          />
          <Legend layout="horizontal" align="center" verticalAlign="top" />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="ambientTemperatureC"
            name="Room Temperature"
            stroke={lineColors.red}
            animationDuration={300}
          />
          <Line
            yAxisId="2"
            type="natural"
            dataKey="ambientHumidityPercent"
            name="Room Humidity"
            stroke={lineColors.blue}
            animationDuration={300}
          />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="weatherTemperatureC"
            name="Outdoor Temperature"
            stroke={lineColors.yellow}
            animationDuration={300}
          />
          <Line
            yAxisId="2"
            type="natural"
            dataKey="weatherHumidityPercent"
            name="Outdoor Humidity"
            stroke={lineColors.purple}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;
