import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { formSchema } from '../lib/zod';
import { useAppDispatch } from '../store/hooks';
import { setData } from '../store/uncontrolledFormSlice';
import { IData } from '../types/data.type';
import Autocomplete from './Autocomplete';

export default function UncontrolledForm() {
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData) as unknown as IData;
      const convertedData = {
        ...data,
        age: Number(data.age || ''),
        terms: Boolean(data.terms),
      };

      try {
        formSchema.parse(convertedData);

        dispatch(setData(data));
        navigate('/');
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationErrors: { [key: string]: string } = {};
          error.errors.forEach((err) => {
            validationErrors[err.path[0]] = err.message;
          });
          setErrors(validationErrors);
        }
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="controller">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <p className="error">{errors.name}</p>
      </div>

      <div className="controller">
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" />
        <p className="error">{errors.age}</p>
      </div>

      <div className="controller">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
        <p className="error">{errors.email}</p>
      </div>

      <div className="controller">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <p className="error">{errors.password}</p>
      </div>

      <div className="controller">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <p className="error">{errors.confirmPassword}</p>
      </div>

      <Autocomplete />

      <div className="controller">
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
        <p className="error">{errors.gender}</p>
      </div>

      <div className="controller">
        <div className="checkbox-wrapper">
          <input type="checkbox" id="terms" name="terms" className="ckeckbox" />
          <label htmlFor="terms">Accept Terms and Conditions</label>
        </div>
        <p className="error">{errors.terms}</p>
      </div>

      {/* <div className="controller">
        <input type="file" name="picture" />
      </div> */}

      <button>Submit</button>
    </form>
  );
}
