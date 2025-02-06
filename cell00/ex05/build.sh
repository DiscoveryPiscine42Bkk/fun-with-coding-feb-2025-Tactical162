#!/bin/bash

# Check if no arguments are supplied
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

# Loop through all arguments and create directories
for arg in "$@"; do
    dir_name="ex$arg"
    mkdir -p "$dir_name"
done
