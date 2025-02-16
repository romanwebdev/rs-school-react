import { Link } from 'react-router';
import UncontrolledForm from '../components/UncontrolledForm';

export default function UncontrolledFormPage() {
  return (
    <>
      <nav>
        <Link to="/">Back to Main</Link>
      </nav>
      <h2>Uncontrolled Form</h2>
      <UncontrolledForm />
    </>
  );
}
