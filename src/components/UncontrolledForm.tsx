import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import {
  setUncontrolledFormUpdated,
  setUncotrolledFormData,
} from '../store/formSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { IData } from '../types/data.type';
import { convertToBase64 } from '../utils/convertToBase64';
import { formSchema } from '../utils/zod';
import Autocomplete from './UncontrolledAutocomplete';

export default function UncontrolledForm() {
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector(
    (state) => state.countries.selectedCountries
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData) as unknown as IData;
      const convertedData = {
        ...data,
        terms: Boolean(data.terms),
        countries,
      };

      try {
        formSchema.parse(convertedData);
        const image = formData.get('image');

        if (image) {
          const base64 = await convertToBase64(image as File);
          dispatch(
            setUncotrolledFormData({
              ...convertedData,
              image: base64,
              countries,
            })
          );
          navigate('/');
          dispatch(setUncontrolledFormUpdated());
        }
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

      <Autocomplete errors={errors} />

      <div className="controller">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg, image/jpg"
          id="image"
        />
        <p className="error">{errors.image}</p>
      </div>

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

      <button>Submit</button>
    </form>
  );
}
