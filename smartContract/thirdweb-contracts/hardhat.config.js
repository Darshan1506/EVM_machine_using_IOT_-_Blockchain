 /** @type import('hardhat/config').HardhatUserConfig */
 module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork:'goerli',
    networks:{
      hardhat:{},
      goerli:{
        url:'https://rpc.ankr.com/eth_goerli',
        accounts:[`0xa3a4835a5be3d637978b5f24fa391c2f7a89becca79b8431a5b16c1454d27c34`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};



