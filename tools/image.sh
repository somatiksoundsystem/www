#!/usr/bin/env bash

magick album_dlya-orgij-i-horovodov.jpg -gravity center -crop 3:3 album_dlya-orgij-i-horovodov.jpg
mogrify -resize 300x300 -format jpg -quality 70 -path thumb/ *.*

