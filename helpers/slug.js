function slug(name) {
  return name.toLowerCase().split(" ").join("_");
}

module.exports = slug;
