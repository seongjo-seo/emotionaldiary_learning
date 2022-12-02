import { useState } from "react";

const sortOptionList = [
  {value : "latest", name:"최신순"},
  {value : "oldest", name:"오래된 순"},
]


/** 컨트롤 메뉴가 어떤 것을 선택하는지, 변화했을 때 바꿀 함수, 말 그대로 옵션  */
const ControlMenu = ({value, onChange, optionList}) =>{
  return(
    <select value={value} onChange={(e)=>onChange(e.target.value)}>
      {optionList.map((it, idx)=><option key={idx} value={it.value}>{it.name}</option>)}
    </select>
  );
};

const DiaryList = ({diaryList})=>{

  const [sortType, setSortType] = useState('lastest');

  const getProcessedDiaryList = () =>{
    const compare = (a, b)=>{
      if (sortType ==='lastest'){
        return parseInt(b.date) - parseInt(a.date);
      }
      else{
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  }

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedDiaryList().map((it)=>(
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

export default DiaryList;