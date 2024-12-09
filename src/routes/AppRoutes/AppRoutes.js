import React, { useState } from 'react';
import FrequencyPage from '../../pages/FrequencyPage/FrequencyPage';
import GallonWaterPage from '../../pages/GallonWaterPage/GallonWaterPage';
import DispenserPage from '../../pages/DispenserPage/DispenserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AppRoutes.scss';
import lodash from 'lodash';
import SingleBottlePage from '../../pages/SingleBottlePage/SingleBottlePage';

const AppRoutes = () => {
  const [dispenserDetails, setDispenserDetails] = useState({
    sellingPrice: 0
  });
  const [component, setComponent] = useState(1);
  const [freqPage, setFreqPage] = useState({ amount: 0 });

  const nextBtn1 = (
    <div className='d-flex justify-content-end ms-5 me-4 pb-0 next-step-btn'>
      <span className='fw-bold me-3 fs-5 align-middle pt-1'>
        Subtotal: $
        {dispenserDetails.sellingPrice > 0 ? lodash.round(dispenserDetails.sellingPrice, 2) : 0}
      </span>
      <button
        className={
          dispenserDetails.sellingPrice <= 0
            ? 'border-0 bg-secondary text-white rounded-5 px-4 fw-bold mb-2 py-2'
            : 'border-0 bg-danger text-white rounded-5 px-4 fw-bold mb-2 py-2'
        }
        disabled={dispenserDetails.sellingPrice <= 0}
        onClick={() => {
          if (component === 1) {
            setComponent(2);
          }
        }}
        data-testid='navNxt'>
        Next Step
      </button>
    </div>
  );

  const nextBtn2 = (
    <div className='d-flex justify-content-end ms-5 me-4 pb-0'>
      <span className='fw-bold me-3 fs-5 align-middle pt-1'>
        Subtotal: $
        {dispenserDetails.sellingPrice > 0 ? lodash.round(dispenserDetails.sellingPrice, 2) : 0}
      </span>
      <span className='mt-1'>
        {freqPage.amount <= 0 && (
          <button
            className='border-0 bg-white text-decoration-underline fw-bold view-details'
            onClick={() => setComponent(3)}>
            Skip this Step
          </button>
        )}
      </span>
      {freqPage.amount > 0 && (
        <button
          className={
            dispenserDetails.sellingPrice === 0
              ? 'border-0 bg-secondary text-white rounded-5 px-4 fw-bold mb-2 py-2'
              : 'border-0 bg-danger text-white rounded-5 px-4 fw-bold mb-2 py-2'
          }
          disabled={dispenserDetails.sellingPrice === 0}
          onClick={() => {
            if (component === 2) {
              setComponent(3);
            }
          }}>
          Next Step
        </button>
      )}
    </div>
  );

  const nextBtn3 = (
    <div className='d-flex justify-content-end ms-5 me-4 marg-btm'>
      <span className='fw-bold me-3 fs-5 align-middle pt-1'>
        Subtotal: $
        {dispenserDetails.sellingPrice > 0 ? lodash.round(dispenserDetails.sellingPrice, 2) : 0}
      </span>
      <button className='border-0 bg-danger text-white rounded-5 px-4 fw-bold mb-2 py-2'>
        Next Step
      </button>
    </div>
  );

  const handleGallonWaterPage = (value) => {
    dispenserDetails.sellingPrice += value.amount;
    setDispenserDetails({ ...dispenserDetails });
    console.log(dispenserDetails);
    console.log(value);
  };

  const handleDispenserPage = (value) => {
    freqPage.amount = value.price * value.quantity;
    setFreqPage({ ...freqPage });
    console.log(freqPage);
    dispenserDetails.sellingPrice += freqPage.amount;
    setDispenserDetails({ ...dispenserDetails });
  };

  const handleSingleBottlePage = (value) => {
    dispenserDetails.sellingPrice += value.amount;
    setDispenserDetails({ ...dispenserDetails });
    console.log(dispenserDetails);
    console.log(value);
  };

  return (
    <>
      <nav className='navbar d-flex navbar-expand-lg bg-body-white p-0 mt-5'>
        <button
          className='navbar-toggler shadow-none ms-4'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#myMenuBar'
          aria-label='Toggle navigation'>
          <FontAwesomeIcon icon='fa-solid fa-bars' className='fs-6' />
        </button>
        <div className='collapse navbar-collapse menus-font-size pb-0' id='myMenuBar'>
          <ul className='navbar-nav ml-auto nav-menu'>
            <li className='nav-item'>
              <p className='fw-bold me-4 pt-1' data-testid='quickShop'>Quick Shop</p>
            </li>
            <li className='nav-item'>
              <button
                className={
                  component === 1
                    ? 'fw-medium text-dark me-4 svg-border-bottom'
                    : 'fw-medium text-dark border-0 bg-white me-3'
                }
                onClick={() => setComponent(1)}
                data-testid='quickLinkEle'>
                <img
                  src={
                    component === 1
                      ? './assets/images/qs-water-active.svg'
                      : './assets/images/qs-water.svg'
                  }
                  alt='water container'
                  height={30}
                  className='me-2'
                />
                1. Water
                {component !== 1 && (
                  <img
                    src='./assets/images/qs-check.svg'
                    alt='water container'
                    height={10}
                    className='ms-1'
                  />
                )}
              </button>
            </li>
            <li className='nav-item'>
              <button
                className={
                  component === 2
                    ? 'fw-medium text-dark me-4 svg-border-bottom '
                    : 'fw-medium text-dark border-0 bg-white me-3'
                }
                onClick={() => setComponent(2)}
                disabled={dispenserDetails.sellingPrice === 0}>
                <img
                  src={
                    freqPage.amount > 0 && (component !== 2 || component === 3)
                      ? './assets/images/qs-dispenser.svg'
                      : component === 2
                        ? './assets/images/qs-dispenser-active.svg'
                        : './assets/images/qs-dispenser-gray.svg'
                  }
                  alt='water dispenser'
                  height={30}
                  className='me-2'
                />
                2. Dispenser
                {freqPage.amount > 0 && (component !== 2 || component === 3) && (
                  <img
                    src='./assets/images/qs-check.svg'
                    alt='water container'
                    height={10}
                    className='ms-1 me-2'
                  />
                )}
              </button>
            </li>
            <li className='nav-item mt-1'>
              <button
                className={
                  component === 3
                    ? 'fw-medium text-dark me-4 svg-border-bottom'
                    : 'fw-medium text-dark border-0 bg-white me-3'
                }
                disabled={true}>
                <img
                  src={
                    component === 3
                      ? './assets/images/qs-frequency-active.svg'
                      : './assets/images/qs-frequency-gray.svg'
                  }
                  alt='frequency'
                  height={25}
                  className='me-1'
                />
                3. Frequency
              </button>
            </li>
          </ul>
        </div>
        {component === 1 && nextBtn1}
        {component === 2 && nextBtn2}
        {component === 3 && nextBtn3}
      </nav>
      <hr className='mt-0 text-muted' />

      {component === 1 && <GallonWaterPage func={handleGallonWaterPage} />}
      {component === 1 && <SingleBottlePage func={handleSingleBottlePage} />}
      {component === 2 && <DispenserPage func={handleDispenserPage} />}
      {component === 3 && <FrequencyPage />}

      {component === 1 && nextBtn1}
      {component === 2 && nextBtn2}
      {component === 3 && nextBtn3}
      <hr className='text-muted' />
    </>
  );
};

export default AppRoutes;
