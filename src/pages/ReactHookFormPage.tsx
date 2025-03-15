import { Link } from 'react-router';
import ReactHookForm from '../components/ReactHookForm';

export default function ReactHookFormPage() {
  return (
    <>
      <Link to="/">Back to Main</Link>
      <h2>React Hook Form</h2>
      <ReactHookForm />
    </>
  );
}
