const images = {};

function importAll(r) {
  r.keys().forEach((fileName) => {
    const key = fileName.replace("./", "").replace(".jpg", "");
    images[key] = r(fileName);
  });
}

importAll(require.context("./", false, /\.(jpg|png)$/));

export default images;
