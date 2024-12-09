import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss';
import { useState } from 'react';

function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <nav className='navbar navbar-expand-lg header'>
        <div className='container-fluid'>
          <div className='ms-4 text-white'>
            ReadyRefresh is ensuring consistent delivery that is sustainable too!
            <button className='text-white text-link border-0 bg-transparent fs-smaller btn-link header-link'>
              Learn more.
            </button>
          </div>
          <button
            className='fw-bold rounded-1 border-0 p-1 bg-white me-4 ms-4 d-none d-sm-none d-md-none d-lg-block header-button'
            type='button'>
            <img src='./assets/images/rr-business.svg' height={22} className='me-1' />
            ReadyRefresh Business
            <FontAwesomeIcon className='ms-2' icon='fa-solid fa-arrow-right' />
          </button>
        </div>
      </nav>
      <div className='d-flex mb-2'>
        <button className='border-0 bg-transparent'>
          <img
            src='./assets/images/RR-logo-navy.svg'
            alt='RR-logo'
            className='mt-3 site-logo'
            height={30}
          />
        </button>
        <button className='fw-bold ms-2 border-0 bg-transparent mt-2 d-none d-sm-none d-md-block d-lg-block pin-code'>
          <FontAwesomeIcon
            icon='fa-solid fa-location-dot'
            className='ms-5 fs-4 me-2 location-icon '
          />
          08701 LAKEWOOD
          <FontAwesomeIcon className='ms-1 align-middle' icon='fa-solid fa-angle-down' />
        </button>
        <div className='mt-2 me-4 d-flex mx-auto'>
          <button className='me-3 border-0 bg-transparent'>
            <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' className='fs-5' />
            <div className='icon-text'>
              Search
              <FontAwesomeIcon className='ms-1 align-middle' icon='fa-solid fa-angle-down' />
            </div>
          </button>
          <button className='me-3 border-0 bg-transparent'>
            <FontAwesomeIcon icon='fa-regular fa-user' className='fs-5' />
            <div className='icon-text'>
              Log In
              <FontAwesomeIcon className='ms-1 align-middle' icon='fa-solid fa-angle-down' />
            </div>
          </button>
          <button className='border-0 bg-transparent'>
            <FontAwesomeIcon icon='fa-solid fa-cart-shopping' className='fs-5' />
            <div className='me-2 icon-text'>
              Cart
              <FontAwesomeIcon className='ms-1 align-middle' icon='fa-solid fa-angle-down' />
            </div>
          </button>
        </div>
      </div>
      <hr className='mb-0 mt-0 mx-4' />
      <nav className='navbar d-flex navbar-expand-lg bg-body-white py-2 shadow-sm mb-3 rounded'>
        <button
          className='navbar-toggler shadow-none ms-4'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#myNavBar'
          aria-label='Toggle navigation'>
          <FontAwesomeIcon icon='fa-solid fa-bars' className='fs-6' />
        </button>
        <div className='collapse navbar-collapse menus-font-size' id='myNavBar'>
          <ul className='navbar-nav ml-auto ms-4'>
            <li className='nav-item'>
              <button className='nav-link fw-bold' style={{ color: '#0078B7' }}>
                <img src='./assets/images/5-gallon-icon.svg' height={22} className='me-1 gallon-icon' />
                5-Gallon Quick Shop
              </button>
            </li>
            <li className='nav-item'>
              <button className='nav-link text-dark dropdown-toggle fw-bold'>Cold Drinks</button>
            </li>
            <li className='nav-item'>
              <button className='nav-link text-dark dropdown-toggle fw-bold'>
                Water Dispensers
              </button>
            </li>
            <li className='nav-item'>
              <button className='nav-link text-dark dropdown-toggle fw-bold'>Coffee & Cups</button>
            </li>
            <li className='nav-item'>
              <button className='nav-link text-dark dropdown-toggle fw-bold'>Shop by Brand</button>
            </li>
            <li className='nav-item'>
              <button className='nav-link text-dark dropdown-toggle fw-bold'>
                Water Filtration
              </button>
            </li>
            <li className='nav-item'>
              <button className='nav-link fw-bold text-danger'>Offers</button>
            </li>
          </ul>
        </div>
        <div className='nav-brand me-4' style={{ fontSize: '13px' }}>
          <FontAwesomeIcon icon='fa-solid fa-truck' className='me-2 ms-4' />
          Delivery by <span className='fw-bold ms-1 me-3'>Mon Jun 12</span>
        </div>
      </nav>
      <div className='h2 fw-bold header-title' id='myDIV'>
        ReadyRefresh Quick Shop - 5-Gallon Bottle Delivery
        <button
          className='fs-4 border-0 bg-transparent'
          data-testid='toggleBtn'
          onClick={() => setToggle(!toggle)}>
          <FontAwesomeIcon
            icon={toggle ? 'fa-solid fa-circle-chevron-up' : 'fa-solid fa-circle-chevron-down'}
            className='text-danger ms-1'
          />
        </button>
        {toggle && (
          <p className='fw-normal mt-4 header-text me-3'>
            Set up ReadyRefresh bottled water delivery service for your home by choosing the
            quantity and type (100% natural spring water or purified water) of 5-gallon bottles
            you&apos;d like delivered to your door. Next, select from our assortment of hot and cold
            dispensers and bottom load water dispensers. Finally, schedule your home water delivery
            frequency featuring contactless delivery service.
          </p>
        )}
      </div>
    </div>
  );
}

export default Header;
