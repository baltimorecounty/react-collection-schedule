const scrollToAnchor = (elementId) => {
  var element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
};

export { scrollToAnchor };
