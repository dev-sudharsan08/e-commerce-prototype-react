import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GallonWaterPage from './GallonWaterPage';
import { BrowserRouter } from 'react-router-dom';
import { fetchApi } from '../../utils/fetchApi';

jest.mock('../../utils/fetchApi');
describe('Products', () => {
  test('setVisible function to be called', () => {
    const setVisible = jest.fn();
    render(
      <BrowserRouter>
        <GallonWaterPage visibleBtn={setVisible()} />
      </BrowserRouter>
    );

    const visibleBtn = screen.getByTestId('visibleBtn');
    fireEvent.click(visibleBtn);
    expect(setVisible).toHaveBeenCalled();
  });

  test('select button to be in the document', () => {
    render(
      <BrowserRouter>
        <GallonWaterPage />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId('selectBtn'));
    expect(screen.getByTestId('selectedBtn')).toBeInTheDocument();
  });

  test('selected button to be in the document', () => {
    render(
      <BrowserRouter>
        <GallonWaterPage />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId('selectedBtn'));
    expect(screen.getByTestId('selectBtn')).toBeInTheDocument();
  });
  test('select button to have class', () => {
    render(
      <BrowserRouter>
        <GallonWaterPage />
      </BrowserRouter>
    );
    expect(screen.getByTestId('selectBtn')).toHaveClass(
      'btn text-danger border-danger fw-bold rounded-5 px-5 py-3 col-lg-12 border border-2 my-2'
    );
  });

  test('[MOCKING]: fetches productList via REST api call', async () => {
    const mockProductList = [
      {
        id: 1,
        productName: 'Product 1',
        description: 'Poland Spring'
      },
      {
        id: 2,
        productName: 'Product 2',
        description: 'Deer Park'
      }
    ];
    fetchApi.mockResolvedValue(mockProductList);
    render(
      <BrowserRouter>
        <GallonWaterPage />
      </BrowserRouter>
    );
    const productName = await screen.findByText('Product 1');
    expect(productName).toBeInTheDocument();
  });

  test('[MOCKING]: renders error properly during API call', async () => {
    const error = 'Error occurred';
    fetchApi.mockRejectedValue(error);
    render(
      <BrowserRouter>
        <GallonWaterPage />
      </BrowserRouter>
    );
    const errorMsg = await screen.findByText('Some Error Occurred. Try again later.');
    expect(errorMsg).toBeInTheDocument();
  });

  test('has `1. Choose Your Water` as page heading', () => {
    render(
      <BrowserRouter>
        <GallonWaterPage />
      </BrowserRouter>
    );
    const pageHeading = screen.getByTestId('pageHeading');
    expect(pageHeading).toBeInTheDocument();
    expect(pageHeading.textContent).toBe('1. Choose Your Water');
  });

  test('has `Get $50 OFF + FREE DELIVERY on your first recurring order.See Details` as offer info', () => {
    render(
      <BrowserRouter>
        <GallonWaterPage />
      </BrowserRouter>
    );
    const offerInfo = screen.getByTestId('offerInfo');
    expect(offerInfo).toBeInTheDocument();
    expect(offerInfo.textContent).toBe(
      'Get $50 OFF + FREE DELIVERY on your first recurring order.See Details'
    );
  });
});
