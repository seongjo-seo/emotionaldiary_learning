import React from 'react';
import { useParams } from 'react-router-dom';

const Diary = () => {
  /**
   * useParams은 id 값을 갖고올 때
   * 어떤 일기를 보여줘야 할 지 전달 받아서 사용할 경우 적용.
   */
  const {id} = useParams();
  console.log(id);

  return (
    <>
    <h1>Diary</h1>
    <p>이곳은 일기 상세 페이지 입니다.</p>
    </>
  );
};

export default Diary;