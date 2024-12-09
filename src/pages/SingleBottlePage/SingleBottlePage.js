import React, { useEffect, useState } from 'react';
import './SingleBottlePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchApi } from '../../utils/fetchApi';
import PropTypes from 'prop-types';

const SingleBottlePage = ({ func }) => {
  const [products, setProducts] = useState([]);
  const [dropDownIteration, setDropDownIteration] = useState([]);
  const [modalContent, setModalContent] = useState({});
  const [bottlesData, setBottlesData] = useState([]);
  const [hide, setHide] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    for (let i = 0; i <= 99; i++) {
      dropDownIteration.push(i);
      setDropDownIteration([...dropDownIteration]);
    }

    fetchApi('http://localhost:5000/singleProducts', 'GET')
      .then((resInJson) => {
        console.log(resInJson);
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

  const handleFetchSingleBottleData = () => {
    fetchApi('http://localhost:5000/singleProducts', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          const data = resInJson.map(() => {
            return { index: undefined, price: 0, quantity: 0, amount: 0, warning: false };
          });
          setBottlesData([...data]);
        } else {
          setBottlesData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log(bottlesData);
      });
  };

  if (isLoading) {
    return <div className='spinner-border text-success' data-test-id='spinner'></div>;
  }

  if (isError) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  return (
    <>
      <div className='mt-5'>
        <span className='ms-5 mt-5 mb-3'>
          <button
            className='border-0 bg-white btn btn-link fw-bold ms-1 d-inline-block z-1 position-absolute'
            style={{ color: '#0078B7' }}
            onClick={() => {
              handleFetchSingleBottleData();
              setHide(!hide);
            }}>
            {hide ? 'Show single bottle options' : 'Hide single bottle options'}
          </button>
        </span>
      </div>
      {!hide && (
        <div
          className='row justify-content-center g-3 mt-1 mx-5 mb-5 position-relative'
          data-testid='single-bottle-page'>
          {products?.map((product, index) => {
            return (
              <div className='col-12 col-md-6 col-lg-4' key={product.id}>
                <div
                  className='card p-3 shadow bg-body-white rounded mx-2'
                  style={{ height: '680px' }}>
                  <div className='px-5 pt-3 pb-2 card-image-background'>
                    <img
                      src={product.imageUrl}
                      className='ol-md-12 ms-3'
                      alt={product.productName}
                      height={180}
                    />
                  </div>
                  <div className='card-body p-0 mt-4'>
                    <h6 className='card-title fw-bold mb-0'>{product.productName}</h6>
                    <p className='card-text fw-bold text-muted'>{product.description}</p>
                    <div className='mt-4 mb-1'>
                      <span className='card-text fw-bold'>${product.sellingPrice}</span>
                      <s className='card-text ms-3 text-muted'>${product.maxRetailPrice}</s>
                      <button
                        type='button'
                        className='btn-link border-0 bg-transparent float-end view-details-btn fw-medium'
                        onClick={() => setModalContent({ ...product })}
                        data-bs-toggle='modal'
                        data-bs-target='#modalBackdrop'>
                        <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' className='me-2' />
                        View Details
                      </button>
                    </div>
                    <div className='col text-start'>
                      <p className='fw-bold'>
                        Quantity:<span className='text-danger ms-1'>*</span>
                      </p>
                      <select
                        className='px-4 py-2 fw-bold'
                        onChange={
                          bottlesData.length &&
                          ((e) => {
                            bottlesData[index].quantity = Number(e.target.value);
                            setBottlesData([...bottlesData]);
                            console.log(bottlesData);
                          })
                        }>
                        {dropDownIteration.map((i, index) => (
                          <option key={index}>{i}</option>
                        ))}
                      </select>
                      {bottlesData.length && bottlesData[index].warning && (
                        <div className='text-start'>
                          <FontAwesomeIcon
                            icon='fa-solid fa-circle-exclamation'
                            className='mt-2 me-2 fs-5 text-danger'
                          />
                          Quantity is mandatory
                        </div>
                      )}
                    </div>
                    <div className='card-text my-4 px-3 offer-info'>
                      <div className='d-flex'>
                        <FontAwesomeIcon
                          icon='fa-solid fa-check'
                          className='me-2 mt-2 text-success'
                        />
                        <p>{product.offerInfo}</p>
                      </div>
                      <p className='product-terms'>{product.productTerms}</p>
                    </div>
                    <div className='text-center mb-4'>
                      {bottlesData.length && bottlesData[index].index === index
                        ? (
                        <button
                          className='btn bg-danger text-light fw-bold rounded-5 px-5 py-3 col-lg-12 border border-2 my-2'
                          type='button'
                          onClick={() => {
                            func({ amount: -bottlesData[index].amount });
                            bottlesData[index].index = null;
                            bottlesData[index].amount = 0;
                            setBottlesData([...bottlesData]);
                            console.log(bottlesData);
                          }}>
                          Selected
                        </button>
                          )
                        : (
                        <button
                          className='btn text-danger border-danger fw-bold rounded-5 px-5 py-3 col-lg-12 border border-2 my-2'
                          type='button'
                          onClick={() => {
                            bottlesData.length && bottlesData[index].quantity !== 0
                              ? (() => {
                                  bottlesData[index].price = product.sellingPrice;
                                  bottlesData[index].index = index;
                                  bottlesData[index].amount =
                                    bottlesData[index].quantity * bottlesData[index].price;
                                  bottlesData[index].warning = false;
                                  setBottlesData([...bottlesData]);
                                  console.log(bottlesData);
                                  func({ id: 1, amount: bottlesData[index].amount });
                                })()
                              : (() => {
                                  bottlesData[index].warning = true;
                                  setBottlesData([...bottlesData]);
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
          {/* Modal */}
          <div className='modal fade ' id='modalBackdrop' aria-hidden='false' data-testid='modal'>
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
                      src={modalContent.imageUrl}
                      className='col-md-10 ms-4 mt-5'
                      alt={modalContent.productName}
                      height={180}
                    />
                  </div>
                  <div className='col-md-6 mt-2 ms-3'>
                    <h5 className='fw-bold'>{modalContent.productName}</h5>
                    <p className='fw-bold text-muted'>{modalContent.description}</p>
                    <div className='mt-4 mb-1'>
                      <span className='card-text fw-bold'>${modalContent.sellingPrice}</span>
                      <s className='card-text ms-3 text-muted'>${modalContent.maxRetailPrice}</s>
                    </div>
                    <p className='text-muted'>{modalContent.productInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

SingleBottlePage.propTypes = {
  func: PropTypes.func,
  func2: PropTypes.func
};
export default SingleBottlePage;
