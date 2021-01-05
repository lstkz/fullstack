import React from 'react';
import { SpinnerBoarder } from 'src/components/SpinnerBoarder';

interface VMLoadingScreenProps {
  isReady: boolean;
}

export function VMLoadingScreen({ isReady }: VMLoadingScreenProps) {
  return (
    <div
      className="flex items-center justify-center h-full flex-col text-white pb-28"
      style={{
        backgroundColor: '#1e1e1e',
      }}
    >
      <SpinnerBoarder />
      <div className="text-xl mt-4">
        {!isReady ? (
          <>
            Przygotowywanie maszyny... <br />
            Może to potrwać kilka minut.
          </>
        ) : (
          <>Przygotowywanie zadania...</>
        )}
      </div>
    </div>
  );
}
