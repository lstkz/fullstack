import classNames from 'classnames';
import React from 'react';
import styles from './PricingCard.module.css';

interface PricingCardProps {
  color: 'white' | 'blue';
  price: React.ReactNode;
  type: React.ReactNode;
  button: React.ReactNode;
  features: React.ReactNode[];
}

export function PricingCard(props: PricingCardProps) {
  const { button, features, price, type, color } = props;

  return (
    <div
      className={classNames(styles.card, color === 'blue' && styles.blueCard)}
    >
      <div className="p-12 text-center text-heading">
        <div className="font-semibold text-4xl">
          {price} <small className="text-2xl">zł/mc</small>
        </div>
        <div className="font-semibold mt-4">{type}</div>
      </div>
      <div className="sep" />
      <div className="flex-auto p-7">
        <div className="text-sm mb-6">
          {features.map((item, i) => (
            <ul className="py-2 text-center" key={i}>
              {item}
            </ul>
          ))}
        </div>
        <div className="w-32 mx-auto">{button}</div>
      </div>
    </div>
  );
}
