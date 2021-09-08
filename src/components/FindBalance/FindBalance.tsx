import React from 'react';
import cn from "classnames";
import styles from "./FindBalances.module.css";


interface FindBalanceProps {
  isResponseValid: boolean;
  publicKeyHash: string;
  setIsResponseValid: (arg: boolean) => void;
  getBalanceByKey: () => void;
  setPublicKeyHash: (arg: string) => void;
}

export const FindBalance = ({
  isResponseValid,
  publicKeyHash,
  setIsResponseValid,
  getBalanceByKey,
  setPublicKeyHash,
}: FindBalanceProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.cotrolsWrapper}>
        <input
          className={cn(styles.inputPublicKeyHash, {
            [styles.invalidPublicKeyHash]: !isResponseValid,
          })}
          value={publicKeyHash}
          onChange={(event) => setPublicKeyHash(event.target.value.trim())}
          onFocus={() => setIsResponseValid(true)}
          placeholder="Enter Public Key Hash here..."
        />

        <button
          className={styles.add}
          onClick={getBalanceByKey}
        >
          Add
        </button>
      </div>
      {!isResponseValid &&  (
        <span className={styles.help}>Not valid Public Hash Key</span>
      )}
    </div>

  );
};
