import React from 'react';
import styled from 'styled-components';

const Subscribeui = ({planName , data , price}) => {
  return (
    <StyledWrapper>
      <div className="card overflow-x-hidden m-2">
        <div className="content">
          <p className="heading z-10">Subsribe to the {planName}
          </p><p className="para z-10">
            {data}
          </p>
          <button className="btn z-10">₹ {price}</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    padding: 32px;
    overflow: hidden;
    border-radius: 10px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    color: #e8e8e8;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .content .heading {
    font-weight: 700;
    font-size: 32px;
  }

  .content .para {
    line-height: 1.5;
  }

  .content .btn {
    color: #e8e8e8;
    text-decoration: none;
    padding: 10px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% );
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% );
    z-index: 1;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .card:hover::before {
    height: 100%;
  }

  .card:hover {
    box-shadow: none;
  }

  .card:hover .btn {
    color: #212121;
    background: #e8e8e8;
    
  }

  .content .btn:hover {
    outline: 2px solid #e8e8e8;
    background: transparent;
    color: #e8e8e8;
  }

  .content .btn:active {
    box-shadow: none;
  }`;

export default Subscribeui;
