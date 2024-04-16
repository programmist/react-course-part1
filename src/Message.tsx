interface Props {
  message: string;
}

function Message({ message }: Props) {
  return <div>{message}</div>;
}

export default Message;
