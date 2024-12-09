import React, { useEffect, useState } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import './GallonWaterPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const GallonWaterPage = ({ func }) => {
  const [isVisible, setVisible] = useState(true);
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState(null);
  const [selectBtn, setSelectBtn] = useState(true);
  const [modalContent, setModalContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [pervPrice, setPervPrice] = useState(0);

  useEffect(() => {
    fetchApi('http://localhost:5000/products', 'GET')
      .then((resInJson) => {
        console.log(resInJson);
        if (resInJson.statusCode !== 404) {
          setProducts(resInJson);
          setIsError(false);
        } else {
          setProducts([]);
          setIsError(true);
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
    <div className='mt-4'>
      <p className='h3 fw-bold text-center' data-testid='pageHeading'>
        1. Choose Your Water
      </p>
      {isVisible && (
        <div className='p-3 text-center text-light mt-3 container jumbotron-style col-md-10'>
          <button
            className='float-end border-0 bg-transparent text-light close-btn'
            onClick={() => setVisible((prev) => !prev)}
            data-testid='visibleBtn'>
            X
          </button>
          <p className='h4 fw-bold pt-2' data-testid='offerInfo'>
            Get $50 OFF + FREE DELIVERY on your first recurring order.
            <button className='fs-6 ms-2 fw-medium text-light border-0 bg-none btn btn-link'>
              See Details
            </button>
          </p>
        </div>
      )}
      <div className='row justify-content-center g-3 mt-2 mx-5'>
        {products?.map((product) => {
          return (
            <div className='col-12 col-md-6 col-lg-4' key={product.id}>
              <div className='card p-3 shadow bg-body-white rounded mx-2'>
                <div className='px-5 pt-5 pb-2 card-image-background'>
                  <img
                    src={product.imageUrl}
                    className='col-md-11 ms-2'
                    alt={product.productName}
                    height={170}
                  />
                </div>
                <div className='card-body p-0 mt-4'>
                  <div className='position-absolute top-0 end-0 rounded-circle px-1 py-1 me-2 mt-2 text-white jumbotron-style'>
                    <div className='rounded-circle border border-1 border-white px-1'>
                      <p className='fw-bold text-center fs-4 gallon-packs px-2 py-1'>
                        {product.gallonPack}
                      </p>
                      <p className='fs-6 fw-medium mb-2 gallon-numbers px-2'>Pack</p>
                    </div>
                  </div>
                  <h6 className='card-title fw-bold mb-0'>{product.productName}</h6>
                  <p className='card-text fw-bold text-muted'>{product.description}</p>
                  <div className='my-4'>
                    <span className='card-text fw-bold'>${product.sellingPrice}</span>
                    <s className='card-text ms-3 text-muted'>${product.maxRetailPrice}</s>
                    <button
                      type='button'
                      className='btn-link fw-medium border-0 bg-transparent float-end view-details-btn'
                      onClick={() => setModalContent({ ...product })}
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop'
                      data-testid='modalBtn'>
                      <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' className='me-2' />
                      View Details
                    </button>
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
                    {selectBtn && product.id === item
                      ? (
                      <button
                        className='bg-danger text-light fw-bold rounded-5 px-5 py-3 col-lg-12 border border-2 my-2'
                        type='button'
                        data-testid='selectedBtn'
                        onClick={() => {
                          func({ amount: -pervPrice });
                          setItem(null);
                          setSelectBtn(false);
                          setPervPrice(0);
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
                          pervPrice > 0 && func({ amount: -pervPrice });
                          setItem(product.id);
                          setSelectBtn(true);
                          func({ amount: product.sellingPrice });
                          setPervPrice(product.sellingPrice);
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
      <div className='modal fade' id='staticBackdrop' aria-hidden='false'>
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
            <div className='modal-body d-flex my-5'>
              <div className='col-md-5 mt-3 ms-4 water-modal-image-background'>
                <img
                  src={modalContent.imageUrl}
                  className='col-md-10 ms-4 mt-5'
                  alt={modalContent.productName}
                  height={180}
                />
              </div>
              <div className='col-md-6 mt-3 ms-3'>
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
  );
};

GallonWaterPage.propTypes = {
  func: PropTypes.func,
  func2: PropTypes.func
};

export default GallonWaterPage;
