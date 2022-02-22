const scrollToAnchor = (elementId) => {
  console.log("Eat Shit");
  var element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
};

export { scrollToAnchor };
