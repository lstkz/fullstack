import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import * as R from 'remeda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { SpinnerBoarder } from 'src/components/SpinnerBoarder';
import { Heading } from 'src/components/Heading';
import { Button } from 'src/components/Button';
import styles from './TesterMock.module.css';
import classNames from 'classnames';

export function TesterMock() {
  const contentRef = React.useRef<HTMLDivElement>(null!);
  const [items, setItems] = React.useState<Array<'success' | 'danger'>>([
    'success',
    'danger',
    'danger',
    'danger',
    'success',
    'success',
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const loadTimeout = React.useRef<any>(null!);
  const animate = () => {
    clearTimeout(loadTimeout.current);
    setIsLoading(true);
    contentRef.current.classList.add(styles.beforeAnim);
    loadTimeout.current = setTimeout(() => {
      setIsLoading(false);
      setItems(
        R.range(0, 6).map(() => (Math.random() < 0.33 ? 'danger' : 'success'))
      );
      setTimeout(() => {
        contentRef.current.classList.remove(styles.beforeAnim);
      }, 50);
    }, 500);
  };

  React.useEffect(() => {
    animate();
    return () => {
      clearTimeout(loadTimeout.current);
    };
  }, []);
  1;
  return (
    <div className="flex flex-col h-full">
      <div className="p-2 rounded-t-md flex justify-between items-center border-b border-alpha-black20">
        <div className="text-white">
          <div className="text-gray-100 text-sm">Zadanie 2</div>
          <Heading type={6} white>
            Cykliczna tablica
          </Heading>
        </div>
        <Button
          loading={isLoading}
          size="extra-small"
          type="neutral"
          onClick={animate}
        >
          Testuj
        </Button>
      </div>
      <div className="p-4 flex-auto" ref={contentRef as any}>
        {isLoading ? (
          <div className="flex items-center justify-center h-4/5">
            <SpinnerBoarder />
          </div>
        ) : (
          items.map((color, i) => (
            <div
              className={classNames(styles.item, `bg-${color}`)}
              style={{
                transitionDelay: `${i * 150}ms`,
              }}
              key={i}
            >
              <FontAwesomeIcon
                icon={color === 'danger' ? faTimesCircle : faCheckCircle}
              />
              <div className="flex-auto h-3 rounded-md bg-current ml-2" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
