#!/bin/bash

file_count=$(find . -maxdepth 1 -type f | wc -l)
dir_count=$(find . -maxdepth 1 -type d | wc -l)
echo "$((file_count + dir_count))"
