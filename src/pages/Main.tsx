import { Link } from 'react-router';
import { useAppSelector } from '../store/hooks';
import DataView from './../components/DataView';

function Main() {
  const uncontrollerFormData = useAppSelector(
    (state) => state.uncontrolledForm.data
  );

  return (
    <div className="main">
      <div>
        <h2>Uncontrolled Form</h2>
        <Link to="/uncontrolled-form">Link to Form</Link>
        {uncontrollerFormData && <DataView data={uncontrollerFormData} />}
      </div>
      <div>
        <h2>React Hook Form</h2>
        <div>
          <Link to="/react-hook-form">Link to Form</Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
