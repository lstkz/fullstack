import React from 'react';
import { createUrl } from 'src/common/url';
import { Button } from 'src/components/Button';
import { ButtonNext } from 'src/components/ButtonNext';
import { Dashboard } from 'src/components/Dashboard';
import { HeadingNext } from 'src/components/HeadingNext';
import { PricingCard } from 'src/components/PricingCard';

export function PricingPage() {
  return (
    <Dashboard>
      <div className="container">
        <HeadingNext type={2} className="text-center mt-20">
          Prosta oferta
        </HeadingNext>
        <div className="text-lg font-light text-center mb-12 mt-4">
          Zacznij za darmo albo wykup płatny dostęp do całej platformy.
          <br />W wersji darmowej masz dostęp tylko do teori, bez praktyki.
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="lg:w-96 md:ml-auto">
            <PricingCard
              color="white"
              price="0"
              type="Wersja Darmowa"
              features={[
                'Dostęp do wszystkich filmów',
                'Jakość video 720p',
                'Dostęp do przykładowych rozwiązań przez mentora',
              ]}
              button={
                <ButtonNext
                  block
                  type="warning"
                  size="small"
                  href={createUrl({ name: 'subscription' })}
                >
                  Wybróbuj
                </ButtonNext>
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
              ]}
              button={
                <Button
                  block
                  type="neutral"
                  size="small"
                  href={createUrl({ name: 'subscription' })}
                >
                  Kup
                </Button>
              }
            />
          </div>
        </div>
        <div className="text-center my-8 text-sm">
          Wszystkie ceny są cenami brutto za jeden miesiąc przy zakupie
          abonamentu na cały rok z góry.
        </div>
      </div>
    </Dashboard>
  );
}
