import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import Header from '.';
import { store } from './../../store/index';

describe('Header', () => {
  it('should render header', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
