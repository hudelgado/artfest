#!/usr/bin/env python3

import argparse, os, json, codecs
import os 

dir_path = os.path.dirname(os.path.realpath(__file__))
parser = argparse.ArgumentParser(description='Generate base64Thumb for image')
parser.add_argument('file', help='the path to the file')
args = parser.parse_args()
ext = args.file.rpartition('.')[-1]

with open(args.file, 'r', encoding='utf-8') as f:
  data = json.load(f)
  i = 0
  for entry in data:
    for key in entry['images']:
      if key == 'group':
        j = 0
        for img in entry['images'][key]:
          if not 'placeholder' in img:
            out = os.popen(dir_path + '/genImgThumbBase64.py {file} '.format(file=img['url'])).read()
            img['placeholder'] = out
          elif img['placeholder'] == '':
            out = os.popen(dir_path + '/genImgThumbBase64.py {file} '.format(file=img['url'])).read()
            img['placeholder'] = out
        j = j+1
    i = i+1

  #with open(args.file + '.out', 'w') as json_file:
  #    json.dump(data, json_file)
  output_file = codecs.open(args.file + '.out', "w", encoding="utf-8")
  json.dump(data, output_file, indent=2, ensure_ascii=False)
  
