import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { setReactHookFormData } from '../store/formSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { convertToBase64 } from '../utils/convertToBase64';
import { formSchema } from '../utils/zod';
import Autocomplete from './Autocomplete';

type FormData = z.infer<typeof formSchema>;

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector(
    (state) => state.countries.selectedCountries
  );
  const isDisable = !!Object.keys(errors).length;

  const onSubmit = async (data: FormData) => {
    const file = data.image[0];

    try {
      const base64 = await convertToBase64(file);

      dispatch(setReactHookFormData({ ...data, image: base64, countries }));
      navigate('/');
    } catch (error) {
      console.error('Failed to convert image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="controller">
        <label htmlFor="name">Name</label>
        <input type="text" {...register('name')} id="name" />
        <p className="error">{errors.name?.message}</p>
      </div>

      <div className="controller">
        <label htmlFor="age">Age</label>
        <input type="number" {...register('age')} id="age" />
        <p className="error">{errors.age?.message}</p>
      </div>

      <div className="controller">
        <label htmlFor="email">Email</label>
        <input type="text" {...register('email')} id="email" />
        <p className="error">{errors.email?.message}</p>
      </div>

      <div className="controller">
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} id="password" />
        <p className="error">{errors.password?.message}</p>
      </div>

      <div className="controller">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword')}
          id="confirmPassword"
        />
        <p className="error">{errors.confirmPassword?.message}</p>
      </div>

      <Autocomplete />

      <div className="controller">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          {...register('image')}
          id="image"
        />
        <p className="error">{errors.image?.message?.toString()}</p>
      </div>

      <div className="controller">
        <div className="radios">
          <div className="radio">
            <input
              type="radio"
              {...register('gender')}
              value="male"
              id="male"
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="radio">
            <input
              type="radio"
              {...register('gender')}
              value="female"
              id="female"
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <p className="error">{errors.gender?.message}</p>
      </div>

      <div className="controller">
        <div className="checkbox-wrapper">
          <input type="checkbox" {...register('terms')} id="terms" />
          <label htmlFor="terms">Accept Terms and Conditions</label>
        </div>
        <p className="error">{errors.terms?.message}</p>
      </div>

      <button type="submit" disabled={isDisable}>
        Submit
      </button>
    </form>
  );
}
