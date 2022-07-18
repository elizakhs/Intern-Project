import "./Buttons.css";

function Button(props) {
  const button = props.button;
  const type = button.type;
  const text = button.text;
  return <button className={type}>{text}</button>;
}

export default Button;