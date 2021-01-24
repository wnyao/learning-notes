#!/bin/bash

# Remove compiled file
rm ./RoyalRumble.class

# Compile new file
javac ./RoyalRumble.java

# Run file
for file in ./input*.txt
do
  java -cp . Main $file
  printf "\n"
done
