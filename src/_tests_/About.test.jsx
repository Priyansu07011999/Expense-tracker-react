import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('About component', () => {
  it('renders "About Us" page correctly', () => {
    const { getByText } = render(<About />);
    
    assert.ok(getByText('About Us'));
    assert.ok(getByText('Welcome to the About Us page!'));
  });
});
