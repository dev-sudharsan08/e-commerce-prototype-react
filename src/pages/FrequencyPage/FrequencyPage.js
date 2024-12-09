import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import './FrequencyPage.scss';

const FrequencyPage = () => {
  const [frequency, setFrequency] = useState([]);
  const [click, setClick] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/frequency', 'GET')
      .then((resInJson) => {
        console.log(resInJson);
        if (resInJson.statusCode !== 404) {
          setFrequency(resInJson);
          setIsError(false);
        } else {
          setFrequency([]);
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
    <div className='mb-4'>
      <div className='text-center mt-4'>
        <h2 className='mb-4 fw-bold'>3. Choose Delivery Frequency</h2>
        <div className='lh-1 mb-5'>
          <p>Set the delivery Frequency of your water bottles.</p>
          <p>
            Not sure how often is right for your household? View our
            <button className='fw-bold btn-link bg-white border-0' style={{ color: '#0078B7' }}>
              Quick Guide.
            </button>
          </p>
        </div>
      </div>
      <div className='col-md-5 mx-auto mb-4'>
        {frequency.map((frequency, index) => (
          <div className='mt-1' data-testid='freqClassName' key={frequency.id}>
            <div
              className={
                click === index
                  ? 'card mb-4 border-2 border-primary border-outline'
                  : 'card mb-4 border-dark'
              }>
              <div
                className='text-decoration-none'
                data-testid='clickBtn'
                onClick={() => setClick(index)}>
                <div className='card-body text-dark'>
                  <p className='badge position-absolute top-0 end-0 me-3 mt-2 freq-style rounded-0 px-2'>
                    {frequency.info}
                  </p>
                  <h5 className='card-title fw-bold freq-font pt-2 mb-0'>{frequency.period}</h5>
                  <p className='card-text pb-2'>{frequency.description}</p>
                </div>
              </div>
            </div>
            {frequency.id === 4 && <hr className='mx-auto mt-5 mb-5' />}
          </div>
        ))}
      </div>
    </div>
  );
};
export default FrequencyPage;
