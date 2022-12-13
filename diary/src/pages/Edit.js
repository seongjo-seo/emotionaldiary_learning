import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit =() => {
    const [originData, setOriginData] = useState(); // targetDiary 관리할 state
    const navigate = useNavigate();
    const {id} = useParams();
    
    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        if(diaryList.length >= 1) { // 일기가 하나라도 있을 때.
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
            // id가 문자열이므로 정수로 변환
            // 일기리스트에서 선택한 일기를 찾아서 할당한다.

            if(targetDiary) {
                setOriginData(targetDiary); // targetDiary를 state로 설정
            } else {
                navigate('/', {replace:true});
                //없는 일기는 홈으로 이동, 뒤로가기 불가능
            }
        }
    }, [id, diaryList])

    return <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>
    
}
export default Edit;