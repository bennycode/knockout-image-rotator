ImageRotator.init();

var viewModel = {
  images: ko.observableArray([
    new RotatedImage('assets/images/1-up.jpg'),
    new RotatedImage('assets/images/2-up-mirrored.jpg'),
    new RotatedImage('assets/images/3-down.jpg'),
    new RotatedImage('assets/images/4-down-mirrored.jpg'),
    new RotatedImage('assets/images/5-left-mirrored.jpg'),
    new RotatedImage('assets/images/6-left.jpg'),
    new RotatedImage('assets/images/7-right-mirrored.jpg'),
    new RotatedImage('assets/images/8-right.jpg')
  ])
};

ko.applyBindings(viewModel, document.getElementById('rotationTests'));