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
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label>Weather:</label>
          <div>
            <label>
              <input 
                type="radio" 
                value="sunny" 
                checked={weather === 'sunny'} 
                onChange={(e) => setWeather(e.target.value)} 
              />
              Sunny
            </label>
            <label>
              <input 
                type="radio" 
                value="rainy" 
                checked={weather === 'rainy'} 
                onChange={(e) => setWeather(e.target.value)} 
              />
              Rainy
            </label>
            <label>
              <input 
                type="radio" 
                value="cloudy" 
                checked={weather === 'cloudy'} 
                onChange={(e) => setWeather(e.target.value)} 
              />
              Cloudy
            </label>
            <label>
              <input 
                type="radio" 
                value="stormy" 
                checked={weather === 'stormy'} 
                onChange={(e) => setWeather(e.target.value)} 
              />
              Stormy
            </label>
            <label>
              <input 
                type="radio" 
                value="windy" 
                checked={weather === 'windy'} 
                onChange={(e) => setWeather(e.target.value)} 
              />
              Windy
            </label>
          </div>
        </div>
        
        <div>
          <label>Visibility:</label>
          <div>
            <label>
              <input 
                type="radio" 
                value="great" 
                checked={visibility === 'great'} 
                onChange={(e) => setVisibility(e.target.value)} 
              />
              Great
            </label>
            <label>
              <input 
                type="radio" 
                value="good" 
                checked={visibility === 'good'} 
                onChange={(e) => setVisibility(e.target.value)} 
              />
              Good
            </label>
            <label>
              <input 
                type="radio" 
                value="ok" 
                checked={visibility === 'ok'} 
                onChange={(e) => setVisibility(e.target.value)} 
              />
              Ok
            </label>
            <label>
              <input 
                type="radio" 
                value="poor" 
                checked={visibility === 'poor'} 
                onChange={(e) => setVisibility(e.target.value)} 
              />
              Poor
            </label>
          </div>
        </div>
        
        <div>
          <label>Comment:</label>
          <input 
            type="text" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
          />
        </div>
        
        <button type="submit">Add Diary Entry</button>
      </form>
    </div>
  );
};

export default AddDiaryForm;