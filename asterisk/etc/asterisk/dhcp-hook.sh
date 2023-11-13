#!/bin/sh

# Check if correct number of arguments provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <IP_ADDRESS> <MAC_ADDRESS> <HOSTNAME>"
    exit 1
fi

# Extract the last part of the IP address (assuming it is in the format x.x.x.y)
EXTENSION=$(echo "$1" | awk -F'.' '{print $4}')

# Use awk to split the string and tr to fix zero padding and capitalization
MAC=$(echo "$2" | awk -F ":" '{for(i=1;i<=NF;i++) printf "%2s", $i}' | tr ' ' '0' | tr 'a-z' 'A-Z')

FILENAME="SIP$MAC.cnf"
TFTP_PATH="/srv/tftp"

# Copy the template file to the output location with .cnf extension
cp "$TFTP_PATH/SIPTEMPLATE.cnf" "$TFTP_PATH/$FILENAME"

# Replace all occurrences of $1 with the last part of the IP address
sed -i "s/\$1/$EXTENSION/g" "$TFTP_PATH/$FILENAME"

echo "File '$TFTP_PATH/$FILENAME' created."
