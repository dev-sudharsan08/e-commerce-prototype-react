import { React } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DispenserPage from './DispenserPage';
import { fetchApi } from '../../utils/fetchApi';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../utils/fetchApi');
describe('Products', () => {
  test('[MOCKING]: fetches productList via REST api call', async () => {
    const mockProductList = [
      {
        id: 1,
        productName: 'Product 1',
        description: 'Hot Dispenser'
      },
      {
        id: 2,
        productName: 'Product 2',
        description: 'Cold Dispenser'
      }
    ];
    fetchApi.mockResolvedValue(mockProductList);
    render(
      <BrowserRouter>
        <DispenserPage />
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
        <DispenserPage />
      </BrowserRouter>
    );
    const errorMsg = await screen.findByText('Some Error Occurred. Try again later.');
    expect(errorMsg).toBeInTheDocument();
  });

  test('renders the component', () => {
    render(
      <BrowserRouter>
        <DispenserPage />
      </BrowserRouter>
    );
    expect(screen.getByText('2. Choose Dispenser')).toBeInTheDocument();
  });

  test('setVisible function to be called', () => {
    const setVisible = jest.fn();
    render(
      <BrowserRouter>
        <DispenserPage visibleBtn={setVisible} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId('visibleBtn'));
    expect(setVisible).toHaveBeenCalled();
  });

  test('setModalContent function to be called', () => {
    const setModalContent = jest.fn();
    render(
      <BrowserRouter>
        <DispenserPage modalBtn={setModalContent} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId('modalBtn'));
    expect(setModalContent).toHaveBeenCalled();
  });

  test('has properly working decrement button', () => {
    render(<DispenserPage />);
    const selectedBtn = screen.getByTestId('selectedBtn');
    expect(selectedBtn.textContent).toEqual('Selected');

    const selectBtn = screen.getByTestId('selectBtn');
    expect(selectBtn.textContent).toEqual('Select');
  });
});
