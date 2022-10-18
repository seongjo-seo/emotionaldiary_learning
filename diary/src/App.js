import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: "서성조",
    content:"하이 1",
    emotion:5,
    /** 밀리초를 받아서 변경하려고 한다. */
    created_date: new Date().getTime()
  },
  {
    id: 2,
    author: "홍길동",
    content:"하이 2",
    emotion:2,
    created_date: new Date().getTime()
  },
  {
    id: 3,
    author: "김치만",
    content:"하이 3",
    emotion:1,
    created_date: new Date().getTime()
  },
]

const App = () => {
  return (
    <div className="App">
      <DiaryEditor/>
      <DiaryList diaryList={dummyList}/>
    </div>
  );
}

export default App;
