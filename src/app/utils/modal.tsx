import React from "react";
import styled from "styled-components";

// Modal Overlay
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.01);
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  transition: opacity 0.3s ease;
  z-index: 1000; // Ensure it's above other content
`;

// Modal Content
const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.lightPrimaryColor};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.7), 0 1px 6px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1001; // Ensure it's above the overlay
  @media (max-width: 600px) {
    height: 100vh;
    width: 100vw;
    border-radius: 0; /* Optional: Remove border-radius if needed */
    padding: 0.4rem; /* Optional: Adjust padding if needed */
  }
`;

// Modal Window Component
const ModalWindow = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <ModalOverlay $isOpen={isOpen} onClick={()=>onClose()}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export { ModalWindow };
