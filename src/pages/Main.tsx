import { Link } from 'react-router';

function Main() {
  return (
    <>
      <nav>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        <Link to="/react-hook-form">React Hook Form</Link>
      </nav>
    </>
  );
}

export default Main;
