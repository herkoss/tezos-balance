import React from 'react';
import styles from "./Table.module.css";

import { AddressInfo } from "../../App";

interface TableProps {
  balances: AddressInfo[];
  deleteBalanceFromBalances: (id: number) => void;
}

export const Table = ( { balances, deleteBalanceFromBalances }: TableProps) => {
  return (
    <table>
      <caption className={styles.caption}>Check balance by Public Key Hash</caption>
      <thead>
      <tr>
        <th>Public Key Hash</th>
        <th>Balance(XTZ)</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      {balances.map(({publicKeyHash, balance,id}) => (
        <tr key={id}>
          <td>{publicKeyHash}</td>
          <td>{String(Math.floor(balance / 1_000_000)) + "." + String(balance % 1_000_000)}</td>
          <td>
            <button
              className={styles.delete}
              onClick={() => deleteBalanceFromBalances(id)}
            />
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};
