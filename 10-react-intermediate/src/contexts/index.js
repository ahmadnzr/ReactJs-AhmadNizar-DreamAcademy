import React from "react";

const CombinedContext = ({ contextProviders = [], children }) => {
  return (
    <>
      {contextProviders.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

export default CombinedContext;
