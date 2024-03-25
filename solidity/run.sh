#!/bin/bash

truffle migrate --network development > contract.txt 
grep "contract address" < contract.txt | awk '{print $NF}' > build/contracts/contract.txt
cp -r build ../frontend/src