import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

const mockData = [{ id: 1, name: 'Melodi', email: 'melodi@melodi.com' }]
const mockDataChanged = [{ id: 1, name: 'Melodi Demirag', email: 'melodi@melodi.com' }]

localStorage.setItem('tabledata', mockData)
const mockSetLocalData = jest.fn()

describe('Table', () => {
  it('Renders the data table', () => {
    const { container } = render(<Table data={mockData} setLocalData={mockSetLocalData} />);
    expect(container).toMatchSnapshot();
  });

  it('Updates field when row is edited', () => {
    render(<Table data={mockDataChanged} setLocalData={mockSetLocalData} />);
    expect(screen.getByTitle('Melodi Demirag')).toBeInTheDocument();
  });
});