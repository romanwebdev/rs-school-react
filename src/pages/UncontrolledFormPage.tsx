import { Link } from 'react-router';
import UncontrolledForm from '../components/UncontrolledForm';

export default function UncontrolledFormPage() {
  return (
    <>
      <Link to="/">Back to Main</Link>
      <h2>Uncontrolled Form</h2>
      <UncontrolledForm />
    </>
  );
}
