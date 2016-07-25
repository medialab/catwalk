#!/bin/bash

export LC_CTYPE=C
export LANG=C

TWEETSFILE=$1
if [ -z "$TWEETSFILE" ]; then
  echo "ERROR: please input a tweets.csv file"
  exit 1
elif [ ! -f "$TWEETSFILE" ]; then
  echo "ERROR: No file found at $TWEETSFILE"
  exit 1
fi

source config.sh
if [ -z "$ROOT_MEDIA_URL" ]; then
  echo "ERROR: plase first setup ROOT_MEDIA_URL in config.sh"
fi

DIRNAME=output/$(basename "$TWEETSFILE" | tail -n 1 | sed 's/\.csv//g')

mkdir -p "$DIRNAME/media"

head -n 1 "$TWEETSFILE" > "$DIRNAME/filtered_tweets.csv"
cat "$TWEETSFILE" | sed 's/\s\+$//' | grep ",true$" >> "$DIRNAME/filtered_tweets.csv"

echo "filename,tweets_count" > "$DIRNAME/media_count.csv"
grep ",true$" "$DIRNAME/filtered_tweets.csv" |
  sed 's/^.*,\([^,]*\),true$/\1/'            |
  grep .                                     |
  tr '|' '\n'                                |
  sort | uniq -c | sort -rn                  |
  awk -F " " '{ print $2","$1 }' >> "$DIRNAME/media_count.csv"

cat "$DIRNAME/media_count.csv"  |
  grep -v '^filename'           |
  sed 's/,.*$//'                |
  while read IMGFILE; do
    IMGDIR=$(echo "$IMGFILE" | sed 's/_.*$//' | sed 's/.\{15\}$//')
    curl -sL "$ROOT_MEDIA_URL/$IMGDIR/$IMGFILE" > "$DIRNAME/media/$IMGFILE"
  done

TOTALIMGS=$(ls "$DIRNAME"/media/ | wc -l)
echo "Finished! $TOTALIMGS media were downloaded in $DIRNAME"
