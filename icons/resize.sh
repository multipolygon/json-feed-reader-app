# Export icon512.png with padding 3, white background.

sizes=(384 192 152 144 128 96 72 180 152 144 120 114 76 72 57 32 64 256)
for size in ${sizes[*]}
do
    echo $size
    convert icon512.png -resize ${size}x${size} icon${size}.png
done

# Export transparent/icon512.png with padding 0, transparent background.

convert transparent/icon512.png -resize 32x32 transparent/favicon.ico
convert transparent/icon512.png -resize 128x128 transparent/icon128.png

cp transparent/favicon.ico ../favicon.ico

convert icon512.png -background white -compose Copy -gravity center -extent 1536x2048 ../splashscreens/ipad_splash.png
convert icon512.png -background white -compose Copy -gravity center -extent 1668x2224 ../splashscreens/ipadpro1_splash.png
convert icon512.png -background white -compose Copy -gravity center -extent 2048x2732 ../splashscreens/ipadpro2_splash.png
convert icon512.png -background white -compose Copy -gravity center -extent 1668x2388 ../splashscreens/ipadpro3_splash.png
convert icon512.png -background white -compose Copy -gravity center -extent 640x1136 ../splashscreens/iphone5_splash.png
convert icon512.png -background white -compose Copy -gravity center -extent 750x1334 ../splashscreens/iphone6_splash.png
convert icon512.png -background white -compose Copy -gravity center -extent 1242x2208 ../splashscreens/iphoneplus_splash.png
convert icon512.png -background white -compose Copy -gravity center -extent 1125x2436 ../splashscreens/iphonex_splash.png
convert icon512.png -background white -compose Copy -gravity center -extent 828x1792 ../splashscreens/iphonexr_splash.png
convert icon512.png -background white -compose Copy -gravity center -extent 1242x2688 ../splashscreens/iphonexsmax_splash.png
