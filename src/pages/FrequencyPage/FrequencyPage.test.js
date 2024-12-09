import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FrequencyPage from './FrequencyPage';
import { fetchApi } from '../../utils/fetchApi';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../utils/fetchApi');

describe('FrequencyPage', () => {
  test('click function to be called', () => {
    const setClick = jest.fn();
    render(
      <BrowserRouter>
        <FrequencyPage clickBtn={setClick} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId('clickBtn'));
    expect(setClick).toHaveBeenCalled();
  });

  test('click button to have class', () => {
    render(
      <BrowserRouter>
        <FrequencyPage />
      </BrowserRouter>
    );
    expect(screen.getByTestId('freqClassName')).toHaveClass('mt-1');
  });

  it('[MOCKING]: fetches productList via REST api call', async () => {
    const mockProductList = [
      {
        id: 1,
        period: 'Every Month',
        description: 'Poland Spring'
      },
      {
        id: 2,
        productName: 'Every Week',
        description: 'Deer Park'
      }
    ];
    fetchApi.mockResolvedValue(mockProductList);
    render(
      <BrowserRouter>
        <FrequencyPage />
      </BrowserRouter>
    );
    const productName = await screen.findByText('Every Month');
    expect(productName).toBeInTheDocument();
  });

  test('[MOCKING]: renders error properly during API call', async () => {
    const error = 'Error occurred';
    fetchApi.mockRejectedValue(error);
    render(
      <BrowserRouter>
        <FrequencyPage />
      </BrowserRouter>
    );
    const errorMsg = await screen.findByText('Some Error Occurred. Try again later.');
    expect(errorMsg).toBeInTheDocument();
  });
});
