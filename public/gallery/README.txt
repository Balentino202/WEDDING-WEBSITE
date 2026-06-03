Drop the couple's real photos in this folder (e.g. photo-1.jpg, photo-2.jpg …).

Then edit src/data/wedding.ts -> `gallery` and set each image's `src` to a
relative path like:  './gallery/photo-1.jpg'

For the hero background and bride/groom photos, replace the Unsplash URLs in
src/data/wedding.ts (`bride.photo`, `groom.photo`) and the `.hero__bg` rule in
src/components/Hero.css.
