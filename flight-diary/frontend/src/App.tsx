import { useEffect, useState } from 'react';
import { getAllDiaries } from './services/diaryService';
import { DiaryEntry } from './types';
import AddDiaryForm from './components/AddDiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const pushNewDiary = (newDiary: DiaryEntry) => {
    setDiaries([...diaries, newDiary]);
  };

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    }).catch(error => {
      console.error("Error fetching diaries:", error);
    });
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      <AddDiaryForm pushNewDiary={pushNewDiary} />
      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            <p><strong>Date:</strong> {diary.date}</p>
            <p><strong>Weather:</strong> {diary.weather}</p>
            <p><strong>Visibility:</strong> {diary.visibility}</p>
            {diary.comment && <p><strong>Comment:</strong> {diary.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
