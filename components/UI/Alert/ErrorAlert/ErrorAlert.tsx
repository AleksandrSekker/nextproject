import { AlertError } from '../../../../interfaces';
import ErrorAlertView from './ErrorAlertView';

const ErrorAlert = ({ showAlert, setShowAlert }: AlertError) => {
  const closeAlert = () => {
    setShowAlert(false);
  };
  const containerVariant = {
    alertInitial: { x: -100, opacity: 0 },
    alertAnimate: { x: 0, opacity: 1, transition: { duration: 1 } },
    exitAlert: { y: -1000, transition: { duration: 1 } },
  };
  return (
    <ErrorAlertView
      showAlert={showAlert}
      setShowAlert={setShowAlert}
      closeAlert={closeAlert}
      containerVariant={containerVariant}
    />
  );
};
export default ErrorAlert;
