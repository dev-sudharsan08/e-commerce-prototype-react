import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SingleBottlePage from './SingleBottlePage';
import { fetchApi } from '../../utils/fetchApi';

// describe('SingleBottlePage', () => {
//   beforeEach(() => {
//     jest.spyOn(window, 'fetch').mockImplementation(() =>
//       Promise.resolve({
//         json: () =>
//           Promise.resolve([
//             { id: 1, productName: 'Product 1', imageUrl: 'image1.jpg' },
//             { id: 2, productName: 'Product 2', imageUrl: 'image2.jpg' }
//           ])
//       })
//     );
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   test('renders the component', () => {
//     render(<SingleBottlePage />);

//     // Assert that the component renders without errors
//     expect(screen.getByTestId('single-bottle-page')).toBeInTheDocument();
//   });

//   test('fetches products and displays them', async () => {
//     render(<SingleBottlePage />);

//     // Wait for the API request to complete
//     await screen.findByText('Product 1');

//     // Assert that the fetched products are displayed
//     expect(screen.getByText('Product 1')).toBeInTheDocument();
//     expect(screen.getByText('Product 2')).toBeInTheDocument();
//   });

//   test('updates state on quantity select change', () => {
//     render(<SingleBottlePage />);

//     const selectElement = screen.getByLabelText('Quantity:');

//     // Simulate a select change event
//     fireEvent.change(selectElement, { target: { value: '5' } });

//     // Assert that the state is updated correctly
//     expect(selectElement.value).toBe('5');
//   });

//   test('toggles select button and updates state on click', () => {
//     render(<SingleBottlePage />);

//     const selectButton = screen.getByText('Select');

//     // Simulate a click event on the select button
//     fireEvent.click(selectButton);

//     // Assert that the select button is toggled and state is updated
//     expect(screen.getByText('Selected')).toBeInTheDocument();
//     expect(selectButton).not.toBeInTheDocument();
//   });

//   test('opens the modal on "View Details" button click', () => {
//     render(<SingleBottlePage />);

//     const viewDetailsButton = screen.getByText('View Details');

//     // Simulate a click event on the "View Details" button
//     fireEvent.click(viewDetailsButton);

//     // Assert that the modal is opened
//     expect(screen.getByTestId('modal')).toBeInTheDocument();
//   });

jest.mock('../../utils/fetchApi');

describe('SingleBottlePage', () => {
  it('should fetch products and render them correctly', async () => {
    const mockProducts = [
      {
        id: 1,
        productName: 'Product 1',
        description: 'Description 1',
        imageUrl: 'image1.jpg',
        sellingPrice: 10
      },
      {
        id: 2,
        productName: 'Product 2',
        description: 'Description 2',
        imageUrl: 'image2.jpg',
        sellingPrice: 20
      }
    ];

    fetchApi.mockResolvedValue(mockProducts);

    render(<SingleBottlePage />);

    const productName = await screen.findByText('Product 1');
    expect(productName).toBeInTheDocument();
  });

  test('[MOCKING]: renders error properly during API call', async () => {
    const error = 'Error occurred';
    fetchApi.mockRejectedValue(error);
    render(<SingleBottlePage />);
    const errorMsg = await screen.findByText('Some Error Occurred. Try again later.');
    expect(errorMsg).toBeInTheDocument();
  });

  it('should toggle hide state and fetch single bottle data when the button is clicked', async () => {
    const mockProducts = [
      {
        id: 1,
        productName: 'Product 1',
        description: 'Description 1',
        imageUrl: 'image1.jpg',
        sellingPrice: 10
      }
    ];

    fetchApi.mockResolvedValue(mockProducts);

    render(<SingleBottlePage />);

    const toggleButton = screen.getByText('Show single bottle options');
    fireEvent.click(toggleButton);

    const productName = await screen.findByText('Hide single bottle options');
    expect(productName).toBeInTheDocument();
  });

  it('should select a product when "Select" button is clicked', () => {
    const mockProducts = [
      {
        id: 1,
        productName: 'Product 1',
        description: 'Description 1',
        imageUrl: 'image1.jpg',
        sellingPrice: 10
      }
    ];

    fetchApi.mockResolvedValue(mockProducts);

    const mockFunc = jest.fn();

    render(<SingleBottlePage func={mockFunc} />);

    const selectButton = screen.getByText('Select');
    fireEvent.click(selectButton);
  });

  it('should show modal content when "View Details" button is clicked', () => {
    const mockProducts = [
      {
        id: 1,
        productName: 'Product 1',
        description: 'Description 1',
        imageUrl: 'image1.jpg',
        sellingPrice: 10
      }
    ];

    fetchApi.mockResolvedValue(mockProducts);

    render(<SingleBottlePage />);

    const viewDetailsButton = screen.getByText('View Details');
    fireEvent.click(viewDetailsButton);
  });
});
