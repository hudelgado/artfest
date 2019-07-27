#!/usr/bin/env python3

import argparse, os

parser = argparse.ArgumentParser(description='Generate base64Thumb for image')
parser.add_argument('file', help='the path to the file')
args = parser.parse_args()
ext = args.file.rpartition('.')[-1]
os.system('gm convert -size {size} {filepath} -resize {size} +profile "*" - | base64 | echo "data:image/{ext};base64,$(cat -)"'.format(size='16x16', 
filepath=args.file, ext=ext))
