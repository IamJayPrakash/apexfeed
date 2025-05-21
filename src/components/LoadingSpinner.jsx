import {  PuffLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <PuffLoader
        color="#32321"
        loading={true}
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default LoadingSpinner; 