import Stack from '@mui/material/Stack';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import type { AtmoRecord } from '../models/AtmoRecord';
import { getEnvironmentData } from '../providers/api';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Chart from '../components/Chart';
import { TempUnits } from '../models/TempUnits';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Fermentorium = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState<DateTime | null>(
    DateTime.local().minus({ months: 1 })
  );
  const [endDate, setEndDate] = useState<DateTime | null>(DateTime.local());
  const [temperatureUnits, setTemperatureUnits] = useState<TempUnits>(
    TempUnits.Celsius
  );
  const [data, setData] = useState<AtmoRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return;
      setIsLoading(true);
      try {
        const response = await getEnvironmentData(startDate, endDate);
        setData(response);
      } catch (error) {
        console.error('Error fetching environment data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    if (temperatureUnits === TempUnits.Fahrenheit) {
      setData((prevData) =>
        prevData.map((record) => ({
          ...record,
          weatherTemperatureC: record.weatherTemperatureC * 1.8 + 32,
          ambientTemperatureC: record.ambientTemperatureC * 1.8 + 32,
        }))
      );
    } else {
      setData((prevData) =>
        prevData.map((record) => ({
          ...record,
          weatherTemperatureC: (record.weatherTemperatureC - 32) / 1.8,
          ambientTemperatureC: (record.ambientTemperatureC - 32) / 1.8,
        }))
      );
    }
  }, [temperatureUnits]);

  return (
    <Stack>
      <Box
        style={{ background: 'lightgrey', display: 'flex', padding: '10px' }}
        sx={{ gap: 2 }}
      >
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DatePicker
            label="Start Date:"
            disableFuture
            value={startDate}
            onChange={setStartDate}
            format="MMMM d, yyyy"
          />
          <DatePicker
            label="End Date:"
            disableFuture
            value={endDate}
            onChange={setEndDate}
            minDate={startDate || undefined}
            format="MMMM d, yyyy"
          />
        </LocalizationProvider>
        <Grid component="label" container alignItems="center">
          <Grid>Fahrenheit</Grid>
          <Grid>
            <Switch
              checked={temperatureUnits === TempUnits.Celsius}
              onChange={() => {
                setTemperatureUnits((prev) =>
                  prev === TempUnits.Celsius
                    ? TempUnits.Fahrenheit
                    : TempUnits.Celsius
                );
              }}
              name="tempUnit"
            />
          </Grid>
          <Grid>Celsius</Grid>
        </Grid>
      </Box>
      {isLoading ? (
        <Box sx={{ textAlign: 'center', padding: '20px' }}>
          <h2>Loading...</h2>
        </Box>
      ) : (
        <Chart data={data} temperatureUnits={temperatureUnits} />
      )}
    </Stack>
  );
};

export default Fermentorium;
