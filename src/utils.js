export const preload = (...args) => {
    var images = new Array();
    if (document !== undefined) {
        for (var i = 0; i < args.length; i++) {
          images[i] = new Image();
          images[i].src = args[i]
        }
    }
  return images;
}