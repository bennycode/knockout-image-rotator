window.onload = function() {
  ImageRotator.init();

  var viewModel = {
    case1: new RotatedImage('assets/images/1-up.jpg'),
    case2: new RotatedImage('assets/images/2-up-mirrored.jpg'),
    case3: new RotatedImage('assets/images/3-down.jpg'),
    case4: new RotatedImage('assets/images/4-down-mirrored.jpg'),
    case5: new RotatedImage('assets/images/5-left-mirrored.jpg'),
    case6: new RotatedImage('assets/images/6-left.jpg'),
    case7: new RotatedImage('assets/images/7-right-mirrored.jpg'),
    case8: new RotatedImage('assets/images/8-right.jpg')
  };

  ko.applyBindings(viewModel.case1, document.getElementById('case1'));
  ko.applyBindings(viewModel.case2, document.getElementById('case2'));
  ko.applyBindings(viewModel.case3, document.getElementById('case3'));
  ko.applyBindings(viewModel.case4, document.getElementById('case4'));
  ko.applyBindings(viewModel.case5, document.getElementById('case5'));
  ko.applyBindings(viewModel.case6, document.getElementById('case6'));
  ko.applyBindings(viewModel.case7, document.getElementById('case7'));
  ko.applyBindings(viewModel.case8, document.getElementById('case8'));
};