import React, { useEffect, useState } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import cn from 'classnames';
import styles from './App.module.css';

const tezos = new TezosToolkit('https://mainnet-node.madfish.solutions');

interface AddressInfo {
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

  const deleteBalanceFromBalances = (publicKeyHash: string) => {
    const filteredBalances = balances.filter(balance => balance.publicKeyHash !== publicKeyHash);
    setBalances(filteredBalances);
  };

  return (
    <div className={styles.App}>
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
      <div>
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
           {balances.map(({publicKeyHash, balance}) => (
             <tr key={publicKeyHash}>
               <td>{publicKeyHash}</td>
               <td>{balance}</td>
               <td>
                 <button
                   className={styles.delete}
                   onClick={() => deleteBalanceFromBalances(publicKeyHash)}
                 />
               </td>
             </tr>
           ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
