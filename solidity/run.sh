#!/bin/bash

echo "Deploying contract..."
truffle migrate --network development > contract.txt
contractAddress=$(grep "contract address" < contract.txt | awk '{print $NF}')
echo "Copying contract address into frontend/src/build/contracts : $contractAddress"
cat > ../frontend/src/build/contracts/contract.json <<EOF 
{
  "address": "$contractAddress"
}
EOF
echo "Copying contract ABI into frontend/src..."
cp -r build ../frontend/src