interface IProps {
  message: string;
}

const ErrorMessage = ({ message }: IProps) => {
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
};

export default ErrorMessage;
