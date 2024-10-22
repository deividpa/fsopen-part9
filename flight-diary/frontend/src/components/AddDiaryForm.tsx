import React, { useState } from 'react';
import { createDiary } from '../services/diaryService';
import { DiaryEntry } from '../types';

const AddDiaryForm = ({ pushNewDiary }: { pushNewDiary: (newDiary: DiaryEntry) => void }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('sunny');
  const [visibility, setVisibility] = useState('great');
  const [comment, setComment] = useState('');

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
    } catch (error) {
      console.error('Error adding diary entry:', error);
    }
  };

  return (
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
  );
};

export default AddDiaryForm;