import { useRef } from 'react';
import Autocomplete from './Autocomplete';

export default function UncontrolledForm() {
  const formRef = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('submit', formRef.current);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="controller">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>

      <div className="controller">
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" />
      </div>

      <div className="controller">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
      </div>

      <div className="controller">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <div className="controller">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
      </div>

      <Autocomplete />

      <div className="radios">
        <div className="radio">
          <input type="radio" name="gender" value="male" id="male" />
          <label htmlFor="male">Male</label>
        </div>
        <div className="radio">
          <input type="radio" name="gender" value="female" id="female" />
          <label htmlFor="female">Female</label>
        </div>
      </div>

      <div className="checkbox-wrapper">
        <input type="checkbox" id="terms" name="terms" className="ckeckbox" />
        <label htmlFor="terms">Accept Terms and Conditions</label>
      </div>

      <div className="controller">
        <input type="file" name="picture" />
      </div>

      <button>Submit</button>
    </form>
  );
}
