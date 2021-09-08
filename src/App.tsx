import React, { useEffect, useState } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { Table } from "./components/Table/Table";
import { FindBalance } from "./components/FindBalance/FindBalance";
import styles from './App.module.css';

const tezos = new TezosToolkit('https://mainnet-node.madfish.solutions');

export interface AddressInfo {
  id: number;
  publicKeyHash: string;
  balance: number;
}

function App() {
  const [publicKeyHash, setPublicKeyHash] = useState('');
  const [balances, setBalances] = useState<AddressInfo[]>([]);
  const [isResponseValid, setIsResponseValid] = useState(true);

  useEffect(() => {
    const balances: string | null = window.localStorage.getItem('balances');

    if (typeof balances === 'string') {
      setBalances(JSON.parse(balances));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('balances', JSON.stringify(balances));
  }, [balances]);


  const getBalanceByKey = async () => {
    try {
      const balance = await tezos.tz.getBalance(publicKeyHash);

      setBalances(prevState => {
        if (Array.isArray(balance.c) && typeof balance.c[0] === 'number') {
          return [...prevState, {
            id: Number(new Date()),
            publicKeyHash: publicKeyHash,
            balance: balance.c[0],
          }];
        }

        return [...prevState];
      });

      setPublicKeyHash('');
    } catch (error) {
       setIsResponseValid(false);
    }
  };

  const deleteBalanceFromBalances = (id: number) => {
    const filteredBalances = balances.filter(balance => balance.id !== id);
    setBalances(filteredBalances);
  };

  return (
    <div className={styles.App}>
      <FindBalance
        isResponseValid={isResponseValid}
        publicKeyHash={publicKeyHash}
        setIsResponseValid={setIsResponseValid}
        getBalanceByKey={getBalanceByKey}
        setPublicKeyHash={setPublicKeyHash}
      />
      <Table balances={balances} deleteBalanceFromBalances={deleteBalanceFromBalances} />
    </div>
  );
}

export default App;
