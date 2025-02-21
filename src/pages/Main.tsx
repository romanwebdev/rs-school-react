import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { resetCountries } from '../store/countriesSlice';
import { useAppSelector } from '../store/hooks';
import DataView from './../components/DataView';

function Main() {
  const uncontrollerFormData = useAppSelector(
    (state) => state.form.uncontrolledFormData
  );
  const reactHookFormData = useAppSelector(
    (state) => state.form.reactHookFormData
  );
  const isHookFormUpdated = useAppSelector(
    (state) => state.form.isHookFormUpdated
  );
  const isUncontrolledFormUpdated = useAppSelector(
    (state) => state.form.isUncontrolledFormUpdated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCountries());
  }, [dispatch]);

  return (
    <div className="main">
      <div>
        <h2>Uncontrolled Form</h2>
        <Link to="/uncontrolled-form">Link to Form</Link>
        {uncontrollerFormData && (
          <DataView
            data={uncontrollerFormData}
            isUpdated={isUncontrolledFormUpdated}
          />
        )}
      </div>
      <div>
        <h2>React Hook Form</h2>
        <div>
          <Link to="/react-hook-form">Link to Form</Link>
          {reactHookFormData && (
            <DataView data={reactHookFormData} isUpdated={isHookFormUpdated} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
