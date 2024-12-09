import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import { shallow } from 'enzyme';
// import { HashRouter, MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import FrequencyPage from '../../pages/FrequencyPage/FrequencyPage';
import DispenserPage from '../../pages/DispenserPage/DispenserPage';

describe('AppRoutes', () => {
  //   it('should render home page', () => {
  //     render(
  //       <HashRouter>
  //         <AppRoutes />
  //       </HashRouter>
  //     );
  //     expect(screen.getByText(/Welcome to The Spark Clothing/i)).toBeInTheDocument();
  //   });

  //   it('should render about us page', () => {
  //     render(
  //       <MemoryRouter initialEntries={['/about-us-page']}>
  //         <AppRoutes />
  //       </MemoryRouter>
  //     );

  //     expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  //   });

  //   it('should render contact us page', () => {
  //     render(
  //       <MemoryRouter initialEntries={['/contact-us']}>
  //         <AppRoutes />
  //       </MemoryRouter>
  //     );

  //     expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  //   });
  // });
  // import DispenserPage from '../../pages/DispenserPage/DispenserPage';

  // import GallonWaterPage from '../../pages/GallonWaterPage/GallonWaterPage';

  // describe('AppRoutes', () => {
  //   // testing for the contact us page

  //   // testing for the PageNotFound page

  //   it('has proper ProductsPage Component', () => {
  //     expect(DispenserPage).toBeTruthy();
  //   });

  //   // testing for the PageNotFound page

  //   it('has proper ProductDetails Component', () => {
  //     expect(GallonWaterPage).toBeTruthy();
  //   });

  // it('has proper ProductDetails Component', () => {
  //   render(<AppRoutes />);
  // });

  //   import React from 'react';
  // import { render, fireEvent } from '@testing-library/react';
  // import AppRoutes from './AppRoutes';

  // describe('AppRoutes', () => {
  it('renders without error', () => {
    render(<AppRoutes />);
  });

  it('changes component when Next Step button is clicked in component 1', () => {
    const { getByText } = render(<AppRoutes />);
    const nextStepButton = getByText('Next Step');
    fireEvent.click(nextStepButton);
    expect(getByText('DispenserPage')).toBeInTheDocument();
  });

  it('changes component when Next Step button is clicked in component 2', () => {
    const { getByText } = render(<AppRoutes />);
    const nextStepButton = getByText('Next Step');
    fireEvent.click(nextStepButton);
    fireEvent.click(nextStepButton);
    expect(getByText('FrequencyPage')).toBeInTheDocument();
  });

  it('changes component when Skip this Step button is clicked in component 2', () => {
    const { getByText } = render(<AppRoutes />);
    const skipStepButton = getByText('Skip this Step');
    fireEvent.click(skipStepButton);
    expect(getByText('FrequencyPage')).toBeInTheDocument();
  });

  it('changes component when Next Step button is clicked in component 3', () => {
    const { getByText } = render(<AppRoutes />);
    fireEvent.click(getByText('Next Step'));
    fireEvent.click(getByText('Next Step'));
    expect(getByText('Next Step')).toBeDisabled();
  });

  it('should render GallonWaterPage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Choose Your Water/i)).toBeInTheDocument();
  });

  it('has `Quick Shop` as text content', () => {
    render(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    const quickShop = screen.getByTestId('quickShop');
    expect(quickShop).toBeInTheDocument();
    expect(quickShop.textContent).toBe('Quick Shop');
  });

  it('has proper FrequencyPage Component', () => {
    render(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    expect(FrequencyPage).toBeTruthy();
  });

  it('has proper DispenserPage Component', () => {
    render(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    expect(DispenserPage).toBeTruthy();
  });

  it('has `1. Water` as quickLink element', () => {
    render(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    const quickLinkEle = screen.getByTestId('quickLinkEle');
    expect(quickLinkEle).toBeInTheDocument();
    expect(quickLinkEle.textContent).toBe('1. Water');
  });

  it('has `Next Step` as navigation element', () => {
    render(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    const navNxt = screen.getByTestId('navNxt');
    expect(navNxt).toBeInTheDocument();
    expect(navNxt.textContent).toBe('Next Step');
  });
});
