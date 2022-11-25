const MyButton = ({text, type, onClick})=>{

  const btnType = ['positive', 'negative'].includes(type)? type:'default';
  return(
    <buttuon className={["MyButton", `MyButton_${type}`].join(" ")} onClick={onClick}>
      {text}
    </buttuon>
  );
};

MyButton.defaultProps ={
  type: "default",
};

export default MyButton;