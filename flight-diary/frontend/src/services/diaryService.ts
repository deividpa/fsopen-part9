import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = '/api/diaries';

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then(response => response.data);
};