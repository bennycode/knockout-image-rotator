var ImageRotator = (function(ko) {
  return {
    init: function() {
      ko.bindingHandlers.rotatedImage = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
          var htmlElement = ko.utils.unwrapObservable(valueAccessor());
          htmlElement.style.top = viewModel.properties.top();

          element.innerHTML = '';
          element.appendChild(htmlElement);
        }
      };

      window.addEventListener('resize', function() {
        var images = document.querySelectorAll('.rotated-image');
        var event = new Event('image-resize');
        for (var i = 0, len = images.length; i < len; i++) {
          var image = images[i];
          image.dispatchEvent(event);
        }
      }, true);
    }
  };
})(window.ko);