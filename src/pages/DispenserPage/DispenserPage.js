import React, { useEffect, useState } from 'react';
import './DispenserPage.scss';
import { fetchApi } from '../../utils/fetchApi';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DispenserPage = ({ func }) => {
  const [isVisible, setVisible] = useState(true);
  const [selectedBlack, setSelectedBlack] = useState(false)
  const [outline, setOutline] = useState('')
  // const [selectedWhite, setSelectedWhite] = useState(false)
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState(null);
  const [selectBtn, setSelectBtn] = useState(true);
  const [warning, setWarning] = useState({ condition: false, index: null });
  const [pervPrice, setPervPrice] = useState({ prev: 0, index: null });
  const [modalContent, setModalContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [color, setColor] = useState([
    {
      color: 'black'
    },
    {
      color: 'white'
    },
    {
      color: 'black'
    }
  ]);
  const [amount, setAmount] = useState([
    {
      price: 0,
      quantity: 1
    },
    {
      price: 0,
      quantity: 1
    },
    {
      price: 0,
      quantity: 1
    }
  ]);

  useEffect(() => {
    fetchApi('http://localhost:5000/dispensers', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setProducts(resInJson);
          setIsError(false);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className='spinner-border text-success' data-test-id='spinner'></div>;
  }

  if (isError) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  return (
    <div className='mx-4 mt-4 mb-5'>
      <p className='h3 fw-bold text-center'>2. Choose Dispenser</p>
      {isVisible && (
        <div className='p-3 text-center text-light mt-3 container jumbotron-style col-md-10'>
          <button
            className='float-end border-0 bg-transparent text-light close-btn'
            onClick={() => setVisible((prev) => !prev)}>
            X
          </button>
          <p className='h4 fw-bold py-1'>
            Get $50 OFF + FREE DELIVERY on your first recurring order.
            <but to='/'>
              <u className='fs-6 ms-3 fw-medium text-light'>See Details</u>
            </but>
          </p>
        </div>
      )}
      <div className='row justify-content-center g-3 mt-2 mx-4'>
        {products?.map((dispenser, index) => {
          return (
            <div className='col-12 col-md-6 col-lg-4' key={dispenser.id}>
              <div className='card p-3 shadow bg-body-white rounded' style={{ height: '720px' }}>
                <div className='px-5 pt-5 pb-2 card-image-background'>
                  <img
                    src={
                      color[index].color === 'black'
                        ? dispenser.imageUrlBlack
                        : dispenser.imageUrlWhite
                    }
                    className='card-img-top'
                    alt={dispenser.productName}
                    height={160}
                  />
                </div>
                <div className='card-body p-0 mt-4'>
                  <h5 className='card-title fw-bold mb-0'>{dispenser.productName}</h5>
                  <p className='card-text fw-bold text-muted mt-1'>{dispenser.description}</p>
                  <p className='my-4'>
                    <span className='card-text fw-bold'>From ${dispenser.sellingPrice}/mo.</span>
                    {dispenser.maxRetailPrice < 20
                      ? (
                      <s className='card-text text-muted ms-2'>${dispenser.maxRetailPrice}</s>
                        )
                      : (
                      <span className='card-text fw-bold'> or ${dispenser.sellingPrice}</span>
                        )}
                    <button
                      type='button'
                      className='btn-link border-0 bg-transparent float-end view-details-btn fw-medium'
                      onClick={() => setModalContent({ ...dispenser })}
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop'>
                      View Details
                    </button>
                  </p>
                    <div className='row row-cols-2'>
                      <div className='col text-start fw-bold'>Available Colors</div>
                      <div className='col text-end fw-bold'>
                        Qty (max 2):<span className='text-danger'>*</span>
                      </div>
                      <div className='col text-start d-flex'>
                        {dispenser.black && (
                          <div>
                            <button
                              aria-label='black color'
                              onClick={() => {
                                color[index].color = 'black';
                                setColor({ ...color });
                                setOutline('outline')
                                // setSelectedBlack(() => selectedBlack(!selectedBlack))
                                setSelectedBlack(!selectedBlack)
                                // setSelectedWhite(selectedWhite)
                                // setSelectedWhite((selectedWhite) => selectedWhite)
                              }}
                              className={`rounded-circle border-0 p-2 col-md-2 bg-dark ms-2 ${outline === 'outline' ? 'outline' : ''}`}
                              aria-selected={selectedBlack}></button>
                            <p className='fw-bold color-text-size'>Black</p>
                          </div>
                        )}
                        {/* {dispenser.gray && (
                          <div className='ms-3'>
                            <button
                              aria-label='black gray'
                              className='rounded-circle border-0 p-2 col-md-2 bg-secondary ms-2'
                              onClick={(e) => e.preventDefault()}
                              disabled></button>
                            <p className='fw-bold color-text-size'>Gray</p>
                          </div>
                        )} */}
                        {dispenser.white && (
                          <div className='ms-3'>
                            {/* <div className='outline'> */}
                            <button
                              aria-label='white color'
                              // className='rounded-circle border-1 p-2 col-md-2 bg-white ms-2'
                              onClick={() => {
                                color[index].color = 'white';
                                setColor({ ...color });
                                setOutline('outline1')
                                // setSelectedWhite((selectedWhite) => !selectedWhite)
                                // setSelectedBlack((selectedBlack) => selectedBlack)
                                setSelectedBlack(selectedBlack)
                                // setSelectedWhite(!selectedWhite)
                              }}
                              className={`rounded-circle border-1 p-2 col-md-2 bg-white ms-2 ${outline === 'outline1' ? 'outline' : ''}`}
                              aria-selected={selectedBlack}></button>
                              {/* </div> */}
                            <p className='fw-bold color-text-size'>White</p>
                          </div>
                        )}
                        {/* {dispenser.stainlessSteel && (
                          <div>
                            <button
                              className='rounded-circle border-0 p-2 col-md-2 bg-secondary ms-4'
                              onClick={(e) => e.preventDefault()}></button>
                            <p className='fw-bold col-md-8 text-center color-text-size'>
                              Stainless Steel
                            </p>
                          </div>
                        )} */}
                      </div>
                      <div className='col text-end mt-2'>
                        <select
                          className='px-4 py-2 fw-bold select'
                          onChange={(e) => {
                            amount[index].quantity = Number(e.target.value);
                            setAmount({ ...amount });
                            console.log(amount);
                          }}>
                          <option>1</option>
                          <option>2</option>
                        </select>
                      </div>
                    </div>
                  <div className='pt-3 pb-4'>
                    <select
                      className='fw-bold select col-md-12 py-2 ps-3'
                      onChange={(e) => {
                        amount[index].price = Number(e.target.value);
                        setAmount({ ...amount });
                        console.log(amount);
                      }}>
                      <option className='d-none'>Payment Options*</option>
                      {dispenser.rent.map((opt, index) => (
                        <option key={index + 200} value={opt.dropDownNumber}>
                          ${opt.dropDownName}
                        </option>
                      ))}
                    </select>
                    {warning.condition && warning.index === index && (
                      <small className='text-danger fw-bold text-start'>
                        <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" className='mt-2 me-2 fs-5' />
                        Please choose a payment option
                      </small>
                    )}
                  </div>
                  <div className='text-center mb-4'>
                    {selectBtn && dispenser.id === item
                      ? (
                      <button
                        className='btn bg-danger text-light fw-bold rounded-5 px-5 py-3 col-lg-12 border border-2 my-2'
                        type='button'
                        data-testid='selectedBtn'
                        onClick={() => {
                          setItem(null);
                          setSelectBtn(false);
                          func({ price: -pervPrice.prev, quantity: 1 });
                          pervPrice.prev = 0;
                          pervPrice.index = null;
                          setPervPrice({ ...pervPrice });
                        }}>
                        Selected
                      </button>
                        )
                      : (
                      <button
                        className='btn text-danger border-danger fw-bold rounded-5 px-5 py-3 col-lg-12 border border-2 my-2'
                        type='button'
                        data-testid='selectBtn'
                        onClick={() => {
                          amount[index].price > 0
                            ? (() => {
                                pervPrice.index === index &&
                                  func({ price: -pervPrice.prev, quantity: 1 });
                                pervPrice.prev = amount[index].price * amount[index].quantity;
                                pervPrice.index = index;
                                setPervPrice({ ...pervPrice });
                                setItem(dispenser.id);
                                setSelectBtn(true);
                                func(amount[index]);
                                warning.condition = false;
                                warning.index = null;
                                setWarning({ ...warning });
                                console.log(warning);
                              })()
                            : (() => {
                                warning.condition = true;
                                warning.index = index;
                                setWarning({ ...warning });
                                console.log(warning);
                              })();
                        }}>
                        Select
                      </button>
                        )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal */}
      <div className='modal fade ' id='staticBackdrop' aria-hidden='false'>
        <div className='modal-dialog modal-xl mt-5' style={{ maxWidth: '700px' }}>
          <div className='modal-content'>
            <div>
              <button
                type='button'
                className='btn-close position-absolute top-0 end-0 me-4 mt-4'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body d-flex mt-5'>
              <div className='col-md-5 mt-3 ms-4 modal-image-background'>
                <img
                  src={modalContent.imageUrlBlack}
                  className='col-md-10 ms-4 mt-5'
                  alt={modalContent.productName}
                  height={180}
                />
              </div>
              <div className='col-md-6 mt-3 ms-3'>
                <h5 className='fw-bold'>{modalContent.productName}</h5>
                <p className='fw-medium text-muted mt-3' >{modalContent.productInfo}</p>
                <p className='card-text fw-medium'>{modalContent.productTerms}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DispenserPage.propTypes = {
  func: PropTypes.func
};

export default DispenserPage;
