// npm install web3


const RPCProviderEthereumMainnet = "https://dry-proportionate-feather.discover.quiknode.pro/5e7253e60998f8f15c3bfb0eca533ba3ce75b296/";

const RCPProviderMumbaiPolygon = "https://alpha-wispy-emerald.matic-testnet.discover.quiknode.pro/5ea1a8e89cd8f2e72d863b99679d6994ba2cc8fa/";

let RPCProvider = RPCProviderEthereumMainnet;

// PARAMETERS TO CONFIGURE ALARMS
const yellowAlarm = 0.5;
const readAlarm = 1;

let web3;
let chainId;
let blockchainExplorer;

const networks =  {
    "networksList":
    [{
      "id": "1",
      "name": "Ethereum Mainnet",
       "RPCProvider" : RPCProviderEthereumMainnet,
       "blockchainExplorer":"https://www.etherscan.io/",
       "CHAINLINK_ETH_USD_AGGREGATOR":"0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",  //this is for mainnet -- need to add here because it depends on the chain
       "TOKEN_ADDRESS": "0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0"   
    },{
        "id": "2",
        "name": "Polygon Mumbai",
       "RPCProvider" : RCPProviderMumbaiPolygon,
        "blockchainExplorer":"https://mumbai.polygonscan.com/",
        "CHAINLINK_ETH_USD_AGGREGATOR":"0x0715A7794a1dc8e42615F059dD6e406A6594651A",  //this is for mainnet -- need to add here because it depends on the chain
        "TOKEN_ADDRESS": "0xce4e32fe9d894f8185271aa990d2db425df3e6be"

    }
]
  }


const tokenABI = [{"inputs":[{"internalType":"address","name":"_tContract","type":"address"},{"internalType":"address","name":"_oTellor","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newTellor","type":"address"}],"name":"NewTellorAddress","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"_allowances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"addresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"balances","outputs":[{"internalType":"uint128","name":"fromBlock","type":"uint128"},{"internalType":"uint128","name":"value","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"bytesVars","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newDeity","type":"address"}],"name":"changeDeity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tContract","type":"address"}],"name":"changeTellorContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"currentMiners","outputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"address","name":"miner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"disputeIdByDisputeHash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"disputesById","outputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"int256","name":"tally","type":"int256"},{"internalType":"bool","name":"executed","type":"bool"},{"internalType":"bool","name":"disputeVotePassed","type":"bool"},{"internalType":"bool","name":"isPropFork","type":"bool"},{"internalType":"address","name":"reportedMiner","type":"address"},{"internalType":"address","name":"reportingParty","type":"address"},{"internalType":"address","name":"proposedForkAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"migrated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"address","name":"","type":"address"}],"name":"minersByChallenge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"newValueTimestamps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"requestIdByQueryHash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"uints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const tokenImpABI = [{"inputs":[{"internalType":"address","name":"_flexAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newOracle","type":"address"},{"indexed":false,"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"NewOracleAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newProposedOracle","type":"address"},{"indexed":false,"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"NewProposedOracleAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"_allowances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"addresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"allowedToTrade","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_blockNumber","type":"uint256"}],"name":"balanceOfAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"balances","outputs":[{"internalType":"uint128","name":"fromBlock","type":"uint128"},{"internalType":"uint128","name":"value","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"bytesVars","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"currentMiners","outputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"address","name":"miner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"disputeIdByDisputeHash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"disputesById","outputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"int256","name":"tally","type":"int256"},{"internalType":"bool","name":"executed","type":"bool"},{"internalType":"bool","name":"disputeVotePassed","type":"bool"},{"internalType":"bool","name":"isPropFork","type":"bool"},{"internalType":"address","name":"reportedMiner","type":"address"},{"internalType":"address","name":"reportingParty","type":"address"},{"internalType":"address","name":"proposedForkAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_data","type":"bytes32"}],"name":"getAddressVars","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"}],"name":"getLastNewValueById","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNewCurrentVariables","outputs":[{"internalType":"bytes32","name":"_c","type":"bytes32"},{"internalType":"uint256[5]","name":"_r","type":"uint256[5]"},{"internalType":"uint256","name":"_diff","type":"uint256"},{"internalType":"uint256","name":"_tip","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"}],"name":"getNewValueCountbyRequestId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getTimestampbyRequestIDandIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_data","type":"bytes32"}],"name":"getUintVar","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addy","type":"address"}],"name":"isMigrated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"migrated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"address","name":"","type":"address"}],"name":"minersByChallenge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintToOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintToTeam","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"newValueTimestamps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"requestIdByQueryHash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"retrieveData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"}],"name":"teamTransferDisputedStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferOutOfContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"uints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateOracleAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"verify","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"}]

const oracleABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_reportingLock","type":"uint256"},{"internalType":"uint256","name":"_stakeAmountDollarTarget","type":"uint256"},{"internalType":"uint256","name":"_stakingTokenPrice","type":"uint256"},{"internalType":"uint256","name":"_minimumStakeAmount","type":"uint256"},{"internalType":"bytes32","name":"_stakingTokenPriceQueryId","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"indexed":true,"internalType":"uint256","name":"_time","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"_value","type":"bytes"},{"indexed":false,"internalType":"uint256","name":"_nonce","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"_queryData","type":"bytes"},{"indexed":true,"internalType":"address","name":"_reporter","type":"address"}],"name":"NewReport","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_newStakeAmount","type":"uint256"}],"name":"NewStakeAmount","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_staker","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"NewStaker","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_reporter","type":"address"},{"indexed":false,"internalType":"address","name":"_recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"_slashAmount","type":"uint256"}],"name":"ReporterSlashed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"StakeWithdrawRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"}],"name":"StakeWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"ValueRemoved","type":"event"},{"inputs":[],"name":"accumulatedRewardPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"addStakingRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getBlockNumberByTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"}],"name":"getCurrentValue","outputs":[{"internalType":"bytes","name":"_value","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getDataBefore","outputs":[{"internalType":"bool","name":"_ifRetrieve","type":"bool"},{"internalType":"bytes","name":"_value","type":"bytes"},{"internalType":"uint256","name":"_timestampRetrieved","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getGovernanceAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getIndexForDataBefore","outputs":[{"internalType":"bool","name":"_found","type":"bool"},{"internalType":"uint256","name":"_index","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"}],"name":"getNewValueCountbyQueryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakerAddress","type":"address"}],"name":"getPendingRewardByStaker","outputs":[{"internalType":"uint256","name":"_pendingReward","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRealStakingRewardsBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getReportDetails","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getReporterByTimestamp","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_reporter","type":"address"}],"name":"getReporterLastTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReportingLock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_reporter","type":"address"}],"name":"getReportsSubmittedByAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_reporter","type":"address"},{"internalType":"bytes32","name":"_queryId","type":"bytes32"}],"name":"getReportsSubmittedByAddressAndQueryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStakeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakerAddress","type":"address"}],"name":"getStakerInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTimeOfLastNewValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getTimestampIndexByTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getTimestampbyQueryIdandIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalStakeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalStakers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalTimeBasedRewardsBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_governanceAddress","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"isInDispute","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minimumStakeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"removeValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reportingLock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"requestStakingWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"retrieveData","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_reporter","type":"address"},{"internalType":"address","name":"_recipient","type":"address"}],"name":"slashReporter","outputs":[{"internalType":"uint256","name":"_slashAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeAmountDollarTarget","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingRewardsBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingTokenPriceQueryId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"bytes","name":"_value","type":"bytes"},{"internalType":"uint256","name":"_nonce","type":"uint256"},{"internalType":"bytes","name":"_queryData","type":"bytes"}],"name":"submitValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"timeBasedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeOfLastAllocation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeOfLastNewValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateStakeAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"verify","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"withdrawStake","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const governanceABI = [{"inputs":[{"internalType":"address payable","name":"_tellor","type":"address"},{"internalType":"address","name":"_teamMultisig","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_disputeId","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_timestamp","type":"uint256"},{"indexed":false,"internalType":"address","name":"_reporter","type":"address"}],"name":"NewDispute","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_disputeId","type":"uint256"},{"indexed":false,"internalType":"enum Governance.VoteResult","name":"_result","type":"uint8"}],"name":"VoteExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_disputeId","type":"uint256"},{"indexed":false,"internalType":"enum Governance.VoteResult","name":"_result","type":"uint8"},{"indexed":false,"internalType":"address","name":"_initiator","type":"address"},{"indexed":false,"internalType":"address","name":"_reporter","type":"address"}],"name":"VoteTallied","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_disputeId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"_supports","type":"bool"},{"indexed":false,"internalType":"address","name":"_voter","type":"address"},{"indexed":false,"internalType":"bool","name":"_invalidQuery","type":"bool"}],"name":"Voted","type":"event"},{"inputs":[],"name":"autopayAddrsQueryId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"beginDispute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_disputeId","type":"uint256"},{"internalType":"address","name":"_voter","type":"address"}],"name":"didVote","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_disputeId","type":"uint256"}],"name":"executeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getDataAfter","outputs":[{"internalType":"bytes","name":"_value","type":"bytes"},{"internalType":"uint256","name":"_timestampRetrieved","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getDataBefore","outputs":[{"internalType":"bytes","name":"_value","type":"bytes"},{"internalType":"uint256","name":"_timestampRetrieved","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDisputeFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_disputeId","type":"uint256"}],"name":"getDisputeInfo","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_reporter","type":"address"}],"name":"getDisputesByReporter","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getIndexForDataAfter","outputs":[{"internalType":"bool","name":"_found","type":"bool"},{"internalType":"uint256","name":"_index","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getIndexForDataBefore","outputs":[{"internalType":"bool","name":"_found","type":"bool"},{"internalType":"uint256","name":"_index","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"},{"internalType":"uint256","name":"_maxAge","type":"uint256"},{"internalType":"uint256","name":"_maxCount","type":"uint256"}],"name":"getMultipleValuesBefore","outputs":[{"internalType":"bytes[]","name":"_values","type":"bytes[]"},{"internalType":"uint256[]","name":"_timestamps","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"}],"name":"getNewValueCountbyQueryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"}],"name":"getOpenDisputesOnId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getReporterByTimestamp","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getTimestampbyQueryIdandIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVoteCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_disputeId","type":"uint256"}],"name":"getVoteInfo","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256[17]","name":"","type":"uint256[17]"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"enum Governance.VoteResult","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"getVoteRounds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_voter","type":"address"}],"name":"getVoteTallyByAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"idMappingContract","outputs":[{"internalType":"contract IMappingContract","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"isInDispute","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracle","outputs":[{"internalType":"contract IOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracleAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_queryId","type":"bytes32"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"retrieveData","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addy","type":"address"}],"name":"setIdMappingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_disputeId","type":"uint256"}],"name":"tallyVotes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"teamMultisig","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tellor","outputs":[{"internalType":"contract ITellor","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_id","type":"bytes32"}],"name":"valueFor","outputs":[{"internalType":"int256","name":"_value","type":"int256"},{"internalType":"uint256","name":"_timestamp","type":"uint256"},{"internalType":"uint256","name":"_statusCode","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_disputeId","type":"uint256"},{"internalType":"bool","name":"_supports","type":"bool"},{"internalType":"bool","name":"_invalidQuery","type":"bool"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"voteCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_disputeIds","type":"uint256[]"},{"internalType":"bool[]","name":"_supports","type":"bool[]"},{"internalType":"bool[]","name":"_invalidQuery","type":"bool[]"}],"name":"voteOnMultipleDisputes","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const chainlinkAgregatorABI = [{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"},{"internalType":"address","name":"_accessController","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"int256","name":"current","type":"int256"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"updatedAt","type":"uint256"}],"name":"AnswerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":true,"internalType":"address","name":"startedBy","type":"address"},{"indexed":false,"internalType":"uint256","name":"startedAt","type":"uint256"}],"name":"NewRound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"accessController","outputs":[{"internalType":"contract AccessControllerInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aggregator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"confirmAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"phaseAggregators","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"phaseId","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"proposeAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proposedAggregator","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"proposedGetRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proposedLatestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_accessController","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

let ORACLE_ADDRESS = "0xD9157453E2668B2fc45b7A803D3FEF3642430cC0";

let GOVERNANCE_ADDRESS = "0x46038969D7DC0b17BC72137D07b4eDe43859DA45";

let TOKEN_ADDRESS;


//CODE EXECUTED ON STARTUP


let ETH_USD_queryID= "0x83a7f3d48786ac2667503a61e8c415438ed2922eb86a2906e4ee66d9a2ce4992";
let BTC_USD_queryID= "0xa6f013ee236804827b77696d350e9f0ac3e879328f2a3021d473a0b778ad78ac";

let queryID = ETH_USD_queryID;


//Chainlink
let chainlinkLatestRoundDataAnswer;
let chainlinkgetRoundBeforeLatestRoundAnswer;

let chainlinkprice;

let phaseID;
let aggregatorroundID;

let manipulationcost= 1e40;
let reportsreceived;
let TRBprice = 15; //Assume TRB price is 15 USD
let disputeFee;

var tellorDataTable = [];
let openDisputesonID = 0;


let reportersMap = new Map();
let frequency;

const secondsInAnHour = 3600;
const secondsInADay= 86400;
let LIQUITY_TIMEOUT = 4*60*60; //4 HOURS



 // TIME WINDOWS
let displayDataInDays = 10;

let timeWindow = displayDataInDays*secondsInADay;  //Time windows for tellor data to display

//TIME SIMULATOR
let daysSimulationBefore = 0;  // Can be touched by the userid= "simulated_days_before"
let hoursSimulationBefore = 0;  // Can be touched by the user       id="simulated_days_before"

let timeSimulationBefore = daysSimulationBefore * secondsInADay + hoursSimulationBefore * secondsInAnHour;
 

//DISPUTE PARAMETERS
let disputeWindow = 900;    // Time that reporters have to dispute values (15 minutes = 900 s)
let stakeAmount;
let tellorPriceAfterDisputeWindow;
let tellorPriceTimestampAfterDisputeWindows;//=nowInSeconds();
let reportsInWindow;

let tellorLastPrice;
let tellorLastTimestamp = nowInSeconds() - timeWindow;

// web3  Objects
let tokenContract;
let oracleContract; 
let governanceContract; 
let chainlinkAgregatorContract;


//PROVIDER FUNCTIONS 


//setProvider();

async function setProvider(){

    let selector = document.getElementById("network_selector");
    let selectId;
    if(selector==null){
        selectId = 0;
    }else {
        selectId= selector.value;
    }

   // console.log("Select Id "+selectId);
    RPCProvider =  networks.networksList[selectId].RPCProvider;

    web3 = await new Web3(new Web3.providers.HttpProvider(RPCProvider));

    blockchainExplorer =  networks.networksList[selectId].blockchainExplorer;

    TOKEN_ADDRESS = networks.networksList[selectId].TOKEN_ADDRESS; 
    tokenContract = new web3.eth.Contract(tokenImpABI, TOKEN_ADDRESS);
    oracleContract = new web3.eth.Contract(oracleABI, ORACLE_ADDRESS);
    governanceContract = await new web3.eth.Contract(governanceABI, GOVERNANCE_ADDRESS);
    let CHAINLINK_ETH_USD_AGGREGATOR_ADDRESS = RPCProvider =  networks.networksList[selectId].CHAINLINK_ETH_USD_AGGREGATOR;
    chainlinkAgregatorContract = new web3.eth.Contract(chainlinkAgregatorABI, CHAINLINK_ETH_USD_AGGREGATOR_ADDRESS);
       
    
    updateNotSoChangingValues();

    clearData();
}


async function updateNotSoChangingValues(){

    chainId = await web3.eth.getChainId();
    document.getElementById("chain_id").innerHTML = chainId;
    document.getElementById("query_id").innerHTML = queryID;
 
    
    disputeFee = await governanceContract.methods.getDisputeFee().call();
    
    disputeFee = disputeFee / 1e18;
 
    stakeAmount = await oracleContract.methods.getStakeAmount().call();
    stakeAmount = stakeAmount/ 1e18;
    
    
    //TIME SIMULATOR
    daysSimulationBefore = document.getElementById("simulated_days_before").value;
    hoursSimulationBefore = document.getElementById("simulated_hours_before").value;
 
    timeSimulationBefore = daysSimulationBefore * secondsInADay + hoursSimulationBefore * secondsInAnHour;
 
    //GET DISPLAY DATA IN DAYS AND UPDATE TIME WINDOWS
     
     displayDataInDays=document.getElementById("display_data_in_days").value;
     timeWindow = displayDataInDays*secondsInADay;  //Time windows for tellor data to display
     
     console.log("display data in days "+displayDataInDays);


     //LIQUITY TABLE FIXED
     
     document.getElementById("liquity_timeout").innerHTML = LIQUITY_TIMEOUT;

 
 }
 

function clearData(){
    reportersMap = new Map();
    tellorLastTimestamp = nowInSeconds() - timeWindow;
    tellorDataTable = [];
}

function calculateReportsInWindow(){
    let count= 0;
    for (let step = tellorDataTable.length -1 ; step >= 0; step--) {
        if(tellorDataTable[step].timestamp > nowInSeconds() - disputeWindow){
            count++;
        }else{
            break;
        }
    }
    return count;
};


async function printFrontEnd(){

    document.getElementById("current_time").innerHTML = secondsToDate(nowInSeconds());
   if ( chainlinkLatestRoundDataAnswer!=undefined){
           document.getElementById("chainlink_roundID").innerHTML = chainlinkLatestRoundDataAnswer[0];
           document.getElementById("chainlink_phaseID").innerHTML = phaseID;
           document.getElementById("chainlink_aggregator_roundID").innerHTML = aggregatorroundID;
           document.getElementById("chainlink_price").innerHTML = chainlinkLatestRoundDataAnswer[1]/1e8;
           document.getElementById("chainlink_started_at").innerHTML = chainlinkLatestRoundDataAnswer[2];
           document.getElementById("chainlink_updated_at").innerHTML = chainlinkLatestRoundDataAnswer[3];
   }

   if ( chainlinkgetRoundBeforeLatestRoundAnswer!=undefined){
    document.getElementById("chainlink_roundID_before_latest").innerHTML = chainlinkgetRoundBeforeLatestRoundAnswer[0];
    document.getElementById("chainlink_price_before_latest").innerHTML = chainlinkgetRoundBeforeLatestRoundAnswer[1]/1e8;
    document.getElementById("chainlink_started_at_before_latest").innerHTML = chainlinkgetRoundBeforeLatestRoundAnswer[2];
    document.getElementById("chainlink_updated_at_before_latest").innerHTML = chainlinkgetRoundBeforeLatestRoundAnswer[3];
  }

    document.getElementById("open_disputes_on_ID").innerHTML = openDisputesonID;
    document.getElementById("dispute_window").innerHTML=disputeWindow;
    document.getElementById("dispute_fee").innerHTML=parseFloat(disputeFee).toFixed(1)+" TRB";

    document.getElementById("stake_amount").innerHTML=parseFloat(stakeAmount).toFixed(0)+" TRB";

    document.getElementById("frequency").innerHTML=frequency;
    reportsInWindow = calculateReportsInWindow();
    document.getElementById("reports_in_dispute_window").innerHTML=reportsInWindow;

    document.getElementById("number_of_reporters").innerHTML = countReporters();

    document.getElementById("tellor_price_after_dispute").innerHTML = tellorPriceAfterDisputeWindow;
    document.getElementById("tellor_price_timestamp_after_dispute").innerHTML = tellorPriceTimestampAfterDisputeWindows;
    


    if(tellorPriceTimestampAfterDisputeWindows.toNumber() + LIQUITY_TIMEOUT < nowInSeconds()){
        document.getElementById("tellor_status").innerHTML = "Tellor is Frozen";
        document.getElementById("tellor_status").bgColor= "Red";

    }else{
        document.getElementById("tellor_status").innerHTML = "Tellor is Working";
    }

    //Print Contracts URLs and links
    let tokenContractURL=blockchainExplorer+'address/'+TOKEN_ADDRESS;
    document.getElementById("token_contract_url").innerHTML = "<a href='"+tokenContractURL+"' target='_blank'>"+TOKEN_ADDRESS+"</a>";

    let oracleContractURL=blockchainExplorer+'address/'+ORACLE_ADDRESS;
    document.getElementById("oracle_contract_url").innerHTML = "<a href='"+oracleContractURL+"' target='_blank'>"+ORACLE_ADDRESS+"</a>";

    let governanceContractURL=blockchainExplorer+'address/'+GOVERNANCE_ADDRESS;
    document.getElementById("governance_contract_url").innerHTML = "<a href='"+governanceContractURL+"' target='_blank'>"+GOVERNANCE_ADDRESS+"</a>";


    //Print reporters table
    var reporters_table = document.getElementById("reporters_table");
    reporters_table.innerHTML="";
    var row = reporters_table.insertRow(0);
    var cell1= row.insertCell(0);
    var cell2= row.insertCell(1);
    
    cell1.innerHTML = "<b>Reporter Address</b>";
    cell2.innerHTML = "<b>TRB Staking</b>";
    
    for (let [key, value] of reportersMap) {
        var row = reporters_table.insertRow(1);
        var cell1= row.insertCell(0);
        var cell2= row.insertCell(1);
        //cell1.setAttribute("href", "https://www.google.com.ar");
        cell1.innerHTML = "<a href='"+blockchainExplorer+"address/"+ key + "' target='_blank'>"+key+"</a>";
        cell2.innerHTML = value+" TRB "+" ("+value*TRBprice+" USD)";
    }
    


    //Print first rows
    var tellor_data = document.getElementById("tellor_data");
    tellor_data.innerHTML="";  //clear table

    var row = tellor_data.insertRow(0);
    var cell1= row.insertCell(0);
    var cell2= row.insertCell(1);
    var cell3= row.insertCell(2);
    var cell4= row.insertCell(3);
    var cell5= row.insertCell(4);
    var cell6= row.insertCell(5);
    var cell7= row.insertCell(6);
    var cell8= row.insertCell(7);

    var cell9= row.insertCell(8);


    cell1.innerHTML = "<b>TimeStamp</b>";

    cell2.innerHTML = "<b>Price</b>";
    cell3.innerHTML = "<b>Total Change (%)</b>";
    cell4.innerHTML = "<b>Age</b>";
    cell5.innerHTML = "<b>Cost to Stale (CtS)</b>";
    cell6.innerHTML = "<b>CtS in USD</b>";
    cell7.innerHTML = "<b> &Delta;	Price (%) </b>";

    cell8.innerHTML = "<b>Reporter</b>";
    
    
    let lastPrice = -1;
    let deltaChange;

    for (let step = 0; step < tellorDataTable.length; step++) {
     
        ctm = disputeFee * costToManipulate(tellorDataTable.length-step-1-reportsInWindow);
        //ctm = ctm * 10;  // ctm in TRB more or less,,
        ctminUSD = ctm * TRBprice; 
        change = (tellorDataTable[step].price - tellorLastPrice) * 100/tellorLastPrice;

        if(lastPrice<0){  // First iteration will fail for negative price assets
            deltaChange = 0;
        } else{
            deltaChange = (tellorDataTable[step].price - lastPrice) * 100 /lastPrice;
        }
        
        lastPrice = tellorDataTable[step].price;

     
        var row = tellor_data.insertRow(1);
        var cell1= row.insertCell(0);
        var cell2= row.insertCell(1);
        var cell3= row.insertCell(2);
        var cell4= row.insertCell(3);
        var cell5= row.insertCell(4);
        var cell6= row.insertCell(5);
        var cell7= row.insertCell(6);
        var cell8= row.insertCell(7);
        var cell9= row.insertCell(8);

 
        cell1.innerHTML = tellorDataTable[step].timestamp;
        cell2.innerHTML = showPrice(tellorDataTable[step].price); //parseFloat(web3.utils.fromWei(tellorDataTable[step].price)).toFixed(4); 
        cell3.innerHTML = parseFloat(change).toFixed(2)+" %";
        cell4.innerHTML = toHoursAndMinutes(nowInSeconds()-tellorDataTable[step].timestamp); 
        cell5.innerHTML = parseFloat(ctm).toFixed(2) +" TRB ";
        cell6.innerHTML = "USD "+parseFloat(ctminUSD).toFixed(0);
        cell7.innerHTML = parseFloat(deltaChange).toFixed(2)+" %";
     
        if(Math.abs(deltaChange)>=yellowAlarm){
            cell7.bgColor = "Yellow";            
        }
        if(Math.abs(deltaChange)>=readAlarm){
            cell7.bgColor = "Red";            
        }


        cell8.innerHTML = shortAddress(tellorDataTable[step].reporter);
        //cell8.innerHTML = "<input type='button' value='Dispute'+tellorDataTable[step].timestamp onclick='test()' />";

        if(tellorDataTable.length-reportsInWindow-1==step){
            cell2.bgColor="yellow";
        }
        

    }
    


    
}

function test(){
    console.log("sss");
}

function showPrice(price){
    return parseFloat(web3.utils.fromWei(price)).toFixed(2); 
}

async function updateMainValues(){

    reports = await governanceContract.methods.getMultipleValuesBefore(queryID,nowInSeconds(),secondsInADay,10000).call(); //this can be much faster, just read internal table.
    frequency = reports[0].length;
    chainlinkLatestRoundDataAnswer  = await chainlinkAgregatorContract.methods.latestRoundData().call();
 
    if(chainlinkLatestRoundDataAnswer!='undefined'){

        let roundID = chainlinkLatestRoundDataAnswer[0];
        
        
        phaseID = parseInt(roundID._hex.substring(2,4),16);
        aggregatorroundID = parseInt(roundID._hex.substring(4,20),16);

        //incorrectly calculate last Round Id like Liquity, 
        let roundIDLast= BigInt(roundID._hex) - BigInt(1);
        roundIDLastHex = '0x'+roundIDLast.toString(16);
        chainlinkgetRoundBeforeLatestRoundAnswer = await chainlinkAgregatorContract.methods.getRoundData(roundIDLastHex).call();;
    }

    
     
    if(chainlinkLatestRoundDataAnswer  != undefined){
        chainlinkprice = chainlinkLatestRoundDataAnswer [1]/1e8; //8 digits for chainlink ETH/USD pair
    }else{
        chainlinkprice = 'undefined';
    }
    
    openDisputesonID = await governanceContract.methods.getOpenDisputesOnId(queryID).call();
    
    let temp = await oracleContract.methods.getDataBefore(queryID,nowInSeconds()-disputeWindow).call();
    tellorPriceAfterDisputeWindow = showPrice(temp[1]); 
    tellorPriceTimestampAfterDisputeWindows=temp[2];
    
    }


async function showStakerInfo(holder){
    let info = await oracleContract.methods.getStakerInfo(holder).call();
    console.log("TRB locked of "+holder+":");
    console.log(web3.utils.fromWei(info[1])+" TRB");
    console.log(info);
    
}

async function reportedValuesSinceCreation(queryID){
    let reportsamount = await oracleContract.methods.getNewValueCountbyQueryId(queryID).call();
    console.log("Number of reports "+reportsamount);
}


function costToManipulate(distance){
    var cost;
    if (distance<0) return 0;

    switch (distance){
        case 0:
            cost = 0;
            break;
        case 1: 
            cost = 1;
            break;
        case 2:
            cost = 3;
            break;
        case 3:
            cost = 7;
            break;
        case 4:
            cost = 15;
            break;
        default:
            cost= 15 + (distance-4)*10
        }   
        return cost;
    }
    
function countReporters(){
     
    return reportersMap.size;

}    

let locked = 0;
async function calculateReporters(){
          if(locked==0){
           locked = 1;
           let count = 0;           
           for (let index = tellorDataTable.length-1; index >= 0; index--) {
               if(tellorDataTable[index].reporter !=""){
                    break;
               }else{
                     let reporterAddress = await governanceContract.methods.getReporterByTimestamp(queryID,tellorDataTable[index].timestamp).call();
                      tellorDataTable[index].reporter = reporterAddress;
                     if(!reportersMap.has(reporterAddress)){
                        let stakerInfo =  await oracleContract.methods.getStakerInfo(reporterAddress).call(); //    Oracle getStakerInfo//audit
                        //oracleContract.methods.getStakerInfo(reporterAddress).call();
                        reportersMap.set(reporterAddress,stakerInfo[1]/1e18);
                        //console.log("Reporter added "+reporterAddress+" stake amount "+stakerInfo[1]/1e18);

                     }
                     count++;
                     if(count > 10){
                        count=0;
                        await sleep(1000);
                     }
            }
          }
          locked = 0;
        }   
   
}




async function getMultipleValuesBefore(queryID){

    let unreadTimeWindows = nowInSeconds() - tellorLastTimestamp;
    reports = await governanceContract.methods.getMultipleValuesBefore(queryID,nowInSeconds(),unreadTimeWindows,10000).call();

    let oldTellorLastTimestamp = tellorLastTimestamp;
    let length = reports[0].length;
    
    if (length>0){
        tellorLastPrice = reports[0][length-1];            //Update Tellor Last Price to calculate price change. 
        tellorLastTimestamp = reports[1][length-1];        //Update Tellor Last Timestamp read
    }

    for (let step = 0; step < length; step++) {
        stepprice = reports[0][step];
        steptimestamp = reports[1][step];
        
        if(steptimestamp >oldTellorLastTimestamp){
            tellorDataTable.push({timestamp: steptimestamp, price: stepprice, reporter:""});
        }
    }

    printFrontEnd();

}


var reportersArray = [ ];
const map1 = new Map();

async function getAllReporters(timestamps){
    for (let step = 0; step < timestamps.length; step++) {
        let reporterAddress = await oracleContract.methods.getReporterByTimestamp(queryID,timestamps[step]).call();
        reportersArray.push({timestamp: timestamps[step], reporterAddress: reporterAddress});
        map1.set(timestamps[step],reporterAddress)
    }
}

async function showAllData(){
    await updateMainValues();
    await getMultipleValuesBefore(queryID);
 }



//TIME UTILS FUNCTION

function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours+"h "+minutes+"m "+seconds+"s";
  }


//check march 13  1678725827 (15 days)


function nowInSeconds(){
    let now = Math.round(+new Date()/1000) - timeSimulationBefore;  //now in seconds (javascript return milisecs... of course we need Computer time sinchronized)
    return now;
}

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};


function secondsToDate(timestamp){
    return new Date(timestamp*1000);
}

// STRING UTILS FUNCTIONS

function shortAddress(address){
    return address.substring(0,6)+"..."+address.substring(35,39);
}