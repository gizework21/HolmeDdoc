import React from 'react';
import { usePagination, DOTS } from '../hooks/usePagination.js';

const CustomPagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize  
} = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (totalCount === 0){
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if(currentPage === lastPage){
        return
    }
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if(currentPage === 1){
        return
    }
    onPageChange(currentPage - 1);
  };

  return (
    <ul
      className={'flex flex-row items-center justify-center paginate-doctor-search my-8'}
    >
      <li
        className={'pagination-item'}
        onClick={onPrevious}
      >
        <button className="h-5 p-0 mt-1 mr-[0.5rem] sm:mr-[1rem]" disabled={currentPage === 0}><img className="h-full" alt="prev" src={require('../assets/images/specialities/PaginationArrow.png')}/></button>
      </li>
      {paginationRange.map(pageNumber => {
        let btnClassName = ''
        if(currentPage === pageNumber){
            btnClassName = 'paginate-btn__active'
        }else if(currentPage - 1 === pageNumber){
            btnClassName = 'previousClassName'
        }else if(currentPage + 1 === pageNumber){
            btnClassName = 'nextClassName'
        } 
        if (pageNumber === DOTS) {
          return <li className="pagination-dots pt-2" key={Math.random()}>
              <div className="h-2 space-x-[1px] mx-2"><span>.</span><span>.</span><span>.</span><span>.</span></div>
          </li>;
        }
        return (
          <li
            className={`paginate-btn ${btnClassName}`}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            <span className='paginate-btn__link'>{pageNumber}</span>
          </li>
        );
      })}
      <li
        className={'pagination-item'}
        onClick={onNext}
      >
        <button className="h-5 p-0 ml-[0.5rem] sm:ml-[1rem] mt-1"><img className="h-full rotate-180" alt="next" src={require('../assets/images/specialities/PaginationArrow.png')}/></button>
      </li>
    </ul>
  );
};

export default CustomPagination;
