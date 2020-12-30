import React from 'react';
import { SpinnerBoarder } from 'src/components/SpinnerBoarder';

interface VMLoadingScreenProps {
  isReady: boolean;
}

export function VMLoadingScreen({ isReady }: VMLoadingScreenProps) {
  return (
    <div className="flex items-center justify-center h-full flex-col text-gray-800 pb-28">
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
