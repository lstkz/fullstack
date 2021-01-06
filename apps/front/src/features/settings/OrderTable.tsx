import React from 'react';
import { Order } from 'shared';
import { cx, formatShortDate } from 'src/common/helper';
import { Heading } from 'src/components/Heading';

interface OrderTableProps {
  orders: Order[];
}

function Td(props: React.TdHTMLAttributes<HTMLTableDataCellElement>) {
  const { className, ...rest } = props;
  return (
    <td {...rest} className={cx('py-4 border-t border-gray-200', className)} />
  );
}

function Th(props: React.HTMLAttributes<HTMLTableHeaderCellElement>) {
  const { className, ...rest } = props;
  return (
    <th
      {...rest}
      className={cx('py-4 border-t border-gray-200 text-left', className)}
    />
  );
}

export function OrderTable(props: OrderTableProps) {
  const { orders } = props;
  return (
    <div className="mt-12">
      <Heading type={5} className="mb-4">
        Historia zamówień
      </Heading>

      {orders.length == 0 ? (
        <div className="text-center">Brak zamówień</div>
      ) : (
        <table className="text-sm text-gray-600 table-auto w-full">
          <thead>
            <tr>
              <Th>Nazwa</Th>
              <Th>Data</Th>
              <Th>Cena</Th>
            </tr>
          </thead>
          <tbody>
            {orders.map(item => (
              <tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{formatShortDate(item.date)}</Td>
                <Td>{item.amount} zł</Td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
