import React from 'react';
import { PricingCard } from 'src/components/PricingCard';
import { createUrl } from 'src/common/url';
import { Button } from 'src/components/Button';
import { Heading } from './Heading';
import { useUser } from 'src/features/AuthModule';
import { track } from 'src/track';

interface PricingProps {}

export function Pricing(props: PricingProps) {
  const user = useUser();
  return (
    <div className="container">
      <Heading type={2} className="text-center mt-20">
        Prosta oferta
      </Heading>
      <div className="text-lg font-light text-center mb-12 mt-4">
        Zacznij za darmo albo wykup płatny dostęp do całej platformy.
        <br />W wersji darmowej masz dostęp tylko do teorii, bez praktyki.
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="lg:w-96 md:ml-auto">
          <PricingCard
            color="white"
            price="0"
            type="Wersja Darmowa"
            features={[
              'Dostęp do wszystkich filmów',
              'Jakość video 4k',
              'Dostęp do przykładowych rozwiązań przez mentora',
              'Bez podawania karty kredytowej',
            ]}
            button={
              <Button
                block
                type="warning"
                size="small"
                href={createUrl({ name: user ? 'modules' : 'register' })}
                onClick={() => {
                  track({
                    type: 'pricing_try_clicked',
                  });
                }}
              >
                Wybróbuj
              </Button>
            }
          />
        </div>
        <div className="lg:w-96 md:mr-auto">
          <PricingCard
            color="blue"
            price="129"
            type="Wersja Premium"
            features={[
              'Dostęp do wszystkich filmów',
              'Jakość video 4k',
              'Dostęp do przykładowych rozwiązań przez mentora',
              'Dostęp do wszystkich praktycznych zadań',
              'Automatyczne sprawdzanie rozwiązań',
              'Dostęp do społeczności',
              'Bez płatności cyklicznych',
            ]}
            button={
              <Button
                block
                type="neutral"
                size="small"
                href={createUrl({ name: user ? 'subscription' : 'register' })}
                onClick={() => {
                  track({
                    type: 'pricing_purchase_clicked',
                  });
                }}
              >
                Kup
              </Button>
            }
          />
        </div>
      </div>
      <div className="text-center py-8 text-sm">
        Wszystkie ceny są cenami brutto za jeden miesiąc przy zakupie abonamentu
        na cały rok z góry.
      </div>
    </div>
  );
}
