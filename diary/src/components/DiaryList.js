const DiaryList = ({diaryList})=>{
  return (
    <div>
      {diaryList.map((it)=>(
        <div key={it.id}></div>
      ))}
    </div>
  );
};

export default DiaryList;