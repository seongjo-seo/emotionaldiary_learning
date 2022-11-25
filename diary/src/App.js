import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';


const reducer = (state, action) =>{

  // 리듀서 하나로 전체 수정할 수 있게 된다.
  switch(action.type){
    case 'INIT' :{
      return action.data;
    }
    case 'CREATE':{
      const created_data = new Date().getTime();
      const newItem = {
        ...action.data,
        created_data
      }
      return [newItem, ...state]
    }
    case 'REMOVE':{
      return state.filter((it)=>it.id !== action.targetId);
    }
    case 'EDIT':{
      return state.map((it)=>
        it.id === action.targetId?
        // content를 돌려준다.
        {...it,content:action.newContent}: it
      );
    }
    default :
    return state;
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


const App = () => {

  // const [data, setData] = useState([]);

  // 상태 변화를 위한 dispatch
  const [data, dispatch] =useReducer(reducer, []);

  const dataId = useRef(0);

  /**
   * https://jsonplaceholder.typicode.com/comments을 통해서 API 값 호출하여 활용한다.
   */
  const getData = async ()=>{
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res)=>res.json());
    
    const initData = res.slice(0,20).map((it)=>{
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5)+1,
        created_date : new Date().getTime(),
        id : dataId.current++
      };
    });

    dispatch({type:"INIT", data:initData});
  }

  useEffect(()=>{
    getData();
  }, []);

  /**
   * 값 호출될 때 렌더링에 대한 최적화 개념
   * 함수를 반환할 때 사용한다.
   */
  const onCreate = useCallback(
    (author, content, emotion) =>{
      // dispatch 함수는 현재 코드를 자동으로 걸어준다.
      dispatch({type:'CREATE',data:{author, content, emotion, id : dataId.current}},)
      dataId.current +=1;
    },
    []
  );

  const onRemove = useCallback((targetId) =>{
    dispatch({type:"REMOVE", targetId})
  },[]);

  const onEdit = useCallback((targetId, newContent) =>{
    dispatch({type:"EDIT", targetId, newContent})
  },[]);

  const memoizedDispatches = useMemo(()=>{
    return {onCreate, onRemove, onEdit}
  },[]);

  /**
   * 
   * 1. 좋은 일기를 분석한다. 좋은 일기의 기준은 3이상이 좋은 일기이다.
   * 2. 나쁜 일기는 전체 데이터 길이에서 좋은 일기 기준을 제외한 것들이 나쁜 일기의 기준이다.
   * 3. 좋은 비율은 좋은 일기를 데이터 길이로 나눠준 후 100을 곱한다.
   * 
   * useMemo는 함수를 반환하는 것이 아닌 값을 반환한다.
   */

  const getDiaryAnalysis = useMemo(() =>{
    console.log("일기 분석 시작");
    
    const goodCount = data.filter((it) => it.emotion >= 3).length; 
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  /**
   * 만약 img 태그에서 process env 태그가 정상적으로 이뤄지지 않는 경우.
   * 다음 env 태그를 선언 후 초기화하여 사용한다.
   */
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <BrowserRouter>
    {/* 
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor onCreate={onCreate}/>
          <div>전체 일기 : {data.length} </div>
          <div>기분 좋은 일기 개수 : {goodCount} </div>
          <div>기분 나쁜 일기 개수 : {badCount} </div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
     */}

      <div className="App">
        <MyHeader
          headText={"App"}
          leftChild={
            <MyButton text ={"왼쪽 버튼"} onClick={()=> alert("왼쪽 클릭")}/>
          }
          rightChild={
            <MyButton
              text={"오른쪽 버튼"}
              onClick={()=>alert("오른쪽 클릭")}
              />
          }
        />
        <h2>App.js</h2>

        <MyButton
          text={"버튼"}
          onClick={()=>alert("버튼 클릭")}
          type={"positive"}
        />

        <MyButton
          text={"버튼"}
          onClick={()=>alert("버튼 클릭")}
          type={"negative"}
        />

        <MyButton
          text={"버튼"}
          onClick={()=>alert("버튼 클릭")}
        />


        {/* process.env.PUBLIC_URL은 폴더의 위치가 어디가 됐더라도 public 위치의 경로로 올라가는 것이다.  */}
        {/* <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`}></img> */}

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new" element={<New/>}/>
          <Route path="/edit" element={<Edit/>}/>
          <Route path="/diary/:id" element={<Diary/>}/>
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
