import React from 'react';

const Card = ({ children, className = '', padding = 'lg' }) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;