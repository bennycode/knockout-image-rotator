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

      $(window).on('resize', function() {
        $('.rotated-image').trigger('resize.image');
      });
    }
  };
})(window.ko);