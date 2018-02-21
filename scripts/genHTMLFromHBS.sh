#!/usr/bin/env sh

PATH="$@"
if [[ $PATH != */ ]];
then
  PATH="$PATH/"
fi

for f in "$PATH"*.hbs
do
  template=${f##*/}
  templatename="${template%.*}"
done

for f in "$PATH"*.json
do
  file=${f##*/}
  extension="${file##*.}"
  filename="${file%.*}"
  /usr/local/bin/node /usr/local/bin/hbs -H $PATH$templatename.js -D $PATH$filename.json $PATH$templatename.hbs -s > $PATH$filename.html
  echo Generated html file for $filename
  #hbs -H $PATH$templatename.js -D $PATH$filename.json $PATH$templatename.hbs -s > $PATH$filename.html
done
