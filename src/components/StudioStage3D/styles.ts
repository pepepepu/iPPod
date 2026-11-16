import styled from 'styled-components';

export const CanvasStage = styled.div<{ $isInteractive: boolean }>`
  width: 100%;
  height: 100%;
  cursor: ${({ $isInteractive }) => ($isInteractive ? 'grab' : 'default')};

  &:active {
    cursor: ${({ $isInteractive }) =>
    $isInteractive ? 'grabbing' : 'default'};
  }
`;