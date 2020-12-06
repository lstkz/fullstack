// import React from 'react';
// import * as R from 'remeda';
// import { RouteResolver } from './RouteResolver';
// import { GlobalModals } from './GlobalModals';
// import { useGlobalModule } from '../features/global/module';
// import { useRouterModule } from '../features/router';
// import { getGlobalState } from 'src/features/global/interface';
// import { useSubscriptionModule } from 'src/features/email-subscription/module';
// import { GlobalStyles } from 'src/components/GlobalStyles';

// export function App() {
//   useGlobalModule();
//   useSubscriptionModule();
//   useRouterModule();

//   const { isLoaded } = useMappedState([getGlobalState], R.pick(['isLoaded']));
//   if (!isLoaded) {
//     return null;
//   }
//   return (
//     <>
//       <GlobalStyles />
//       <RouteResolver />
//       <GlobalModals />
//     </>
//   );
// }
