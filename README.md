# Tezos Balances

## The task:

Create an app using React (functional components), TypeScript, Redux and https://www.npmjs.com/package/@taquito/taquito

You should create single page with:
input (for publicKeyHash)
Button (onPress will add publicKeyHash from input into the list and load balance for this account)
list of publicKeyHashes and it’s balances

Page reload should NOT reset the state of this page. 

PS: use TezosToolkit.tz.getBalance(accountPublicKeyHash) method to load balance for publicKeyHash. https://tezostaquito.io/typedoc/interfaces/_taquito_taquito.tzprovider.html#getbalance

RpcRrl: 'https://mainnet-node.madfish.solutions'

List of publicKeyHashes for test: 

- tz1a17ZmuN3yrnFHFyxyxovhVKuoP5YuCdr8 
- tz1Po3kCvcHJTPBbuntVfUQrwGo7UqDAvLr3 
- tz1KroYSGkPbXG6mTrtQfDSUjT31vthH7vYS 
- tz1Q8SvcHjBBihikyoEqg7bFCYwQafEU2iqb

## Technologies

- TypesScript, React
- HTML5, CSS Modules, Flex-box, Grid,
- Webpack

## Description
- [DEMO LINK](https://herkoss.github.io/tezos-balance/)
