

let phaseId;
const aggregatorRoundId = BigInt("1")
let roundId;

for(let i=1;i<=6;i++){
    phaseId =BigInt(i);
    roundId = (phaseId << 64n) | aggregatorRoundId 
    console.log("Phase ID "+phaseId+" RoundID "+roundId);
}

