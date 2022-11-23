import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  /**
   * useNavigate 함수는 페이지를 이동시켜주는 함수를 갖고 있다.
   */
  const navigate = useNavigate();

  /**
   * Query String
   * 웹 페이지에 데이터를 전달하는 방법 중 가장 간단한 방법이다.
   * 실시간으로 변경될 수 있는 setSearchParams 상태 변화 함수를 갖고 있다.
   */
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id : ", id);

  const mode = searchParams.get("mode");
  console.log("mode : ", mode);

  return (
    <>
    <h1>Edit</h1>
    <p>이곳은 일기 수정 페이지 입니다.</p>
    <button onClick={()=> setSearchParams({who : "winterlood"})}>
      QS 바꾸기
    </button>

    <button onClick={()=>{
      navigate("/home");
    }}>
      HOME으로 가기
    </button>
    <button onClick={()=>{
      navigate(-1);
    }}>뒤로가기</button>
    </>
  );
};

export default Edit;