import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; 
  width: 100%;
  div ::hover {
    cursor: pointer;
  }
`;

const Loader = ({ count = 1 }) => (
  <LoaderContainer>
    {Array.from({ length: count }).map((_, index) => (
      <ContentLoader
      key={index}
        speed={2}
        width={400}
        height={24}
        viewBox="0 0 calc(100%-20px) 24"
        backgroundColor="#d7ccc8"
        foregroundColor="#795548"
        style={{ width: "100%" }}
      >
        <rect x="1" y="3" rx="10" ry="10" width="calc(60%)" height="21" />
        <rect x="calc(60% + 20px)" y="3" rx="10" ry="10" width="calc(20%)" height="21" />
        <circle cx="calc(100% - 40px)" cy="14" r="10" />
      </ContentLoader>
    ))}
  </LoaderContainer>
);

export default Loader;
