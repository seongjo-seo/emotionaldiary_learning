import DiaryItem from './DiaryItem'

const DiaryList = ({diaryList, onDelete})=>{
	return (
		<div className ="DiaryList">
			<h2>일기 리스트</h2>
			<h4>{diaryList.length}개의 일기가 있습니다.</h4>
			<div>
				{diaryList.map((it)=>(
					<DiaryItem key={it.id} {...it} onDelete={onDelete}/>
				))}
			</div>
		</div>
	);
};

/** 더미 데이터가 없는 경우 빈 배열로 초기화 하는 방법 */
DiaryList.defaultProps ={
	diaryList: [],
}

export default DiaryList;