import React, { useState } from 'react';
import { createDiary } from '../services/diaryService';
import { DiaryEntry, ValidationError } from '../types';
import axios from 'axios';

const AddDiaryForm = ({ pushNewDiary }: { pushNewDiary: (newDiary: DiaryEntry) => void }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('sunny');
  const [visibility, setVisibility] = useState('great');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addDiary = async (event: React.FormEvent) => {
    event.preventDefault();

    const newDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    };

    try {
      const savedDiary = await createDiary(newDiaryEntry);
      pushNewDiary(savedDiary);
      console.log('Added diary entry:', savedDiary);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError<ValidationError>(error)) {
        if (error.response?.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred while adding the diary entry');
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={addDiary}>
        <div>
          Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          Weather:
          <select value={weather} onChange={(e) => setWeather(e.target.value)}>
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cloudy">Cloudy</option>
            <option value="stormy">Stormy</option>
            <option value="windy">Windy</option>
          </select>
        </div>
        <div>
          Visibility:
          <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="ok">Ok</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <div>
          Comment: <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">Add Diary Entry</button>
      </form>
    </div>
  );
};

export default AddDiaryForm;