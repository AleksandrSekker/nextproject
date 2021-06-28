import React from 'react';
import { useSelector } from 'react-redux';
import { Children } from '../../../interfaces';
import { selectError } from '../../../redux/error/action';
import { selectLoad } from '../../../redux/load/action';

import Loader from '../../UI/Loader/Loader';

const ErrorLoadContainer = ({ children }: Children) => {
  const load = useSelector(selectLoad);
  const error = useSelector(selectError);
  return (
    <div>
      {error && <div>Error</div>}
      {!load ? <Loader /> : <div> {children}</div>}
    </div>
  );
};

export default ErrorLoadContainer;
