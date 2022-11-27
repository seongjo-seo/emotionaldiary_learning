import React, {useState} from 'react';

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';

const Home = () => {
  const [curDate, setCurDate] = useState(new Date());
  console.log(curDate);

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={() => {}}/>}
        rightChild={<MyButton text={">"} onClick={() => {}}/>}
      />
    </div>
  );
};

export default Home;