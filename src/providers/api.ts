import axios from 'axios';
import type { AtmoRecord } from '../models/AtmoRecord';
import type { DateTime } from 'luxon';

axios.defaults.baseURL =
  'https://manbrewingapi.azurewebsites.net/beerroom/environment/';

/**
 * Gets the most recent environment records, defaulting to 20.
 * @param {*} count
 */
export const getLatestEnvironmentData = async (
  count = 20
): Promise<AtmoRecord[]> => {
  const response = await axios.get<AtmoRecord[]>(`/history/${count}`);
  return response.data;
};

/**
 * Gets the environment data between the dates.
 * @param {*} startDate
 * @param {*} endDate
 */
export const getEnvironmentData = async (
  startDate: DateTime,
  endDate: DateTime
): Promise<AtmoRecord[]> => {
  let uriStartDate = encodeURIComponent(startDate.startOf('day').toISO() ?? '');
  let uriEndDate = encodeURIComponent(endDate.endOf('day').toISO() ?? '');
  const response = await axios.get<AtmoRecord[]>(
    `/history/${uriStartDate}/${uriEndDate}`
  );
  return response.data;
};
