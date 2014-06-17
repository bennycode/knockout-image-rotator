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
})(window.ko);;function RotatedImage(path) {
  this.properties = {
    path: ko.observable(path),
    width: ko.observable('100%'),
    height: ko.observable('100%'),
    orientation: ko.observable('1'),
    top: ko.observable('0px')
  };

  var self = this;
  var image = document.createElement('img');
  image.addEventListener('image-resize', function() {
    self.initImage();
  }, false);

  this.element = ko.observable(image);

  this.parseImage();
}

RotatedImage.prototype.initImage = function() {
  var self = this;
  var image = this.element();
  image.onload = function() {
    var imageWidth = image.clientWidth || image.width;
    var imageHeight = image.clientHeight || image.height;

    switch (self.properties.orientation()) {
      case 5:
      case 6:
      case 7:
      case 8:
        self.properties.width(imageHeight + 'px');
        self.properties.height(imageWidth + 'px');
        var top = (imageWidth - imageHeight) / 2;
        self.properties.top(top + 'px');
        break;
      default:
        self.properties.width(imageWidth + 'px');
        self.properties.height(imageHeight + 'px');
        break;
    }

  };

  image.className = 'rotated-image exif-orientation-' + self.properties.orientation();
  image.style.maxWidth = '100%';
  image.setAttribute('src', this.properties.path());
};

RotatedImage.prototype.parseImage = function() {
  var self = this;

  var onSuccess = function(exif) {
    self.properties.orientation(exif.orientation);
    self.initImage();
  };

  var xhr = new XMLHttpRequest();
  xhr.open('GET', self.properties.path());
  xhr.responseType = 'blob';

  xhr.onload = function(event) {
    var exif = {
      orientation: '1'
    };

    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var blob = xhr.response;

        var onMetaData = function(data) {
          exif.orientation = data.exif[0x0112] || '1';
          onSuccess(exif);
        };

        var options = {
          maxMetaDataSize: 262144,
          disableImageHead: false
        };

        try {
          loadImage.parseMetaData(blob, onMetaData, options);
        }
        catch (error) {
          console.warn('Error parsing image meta data: ' + error.message);
          onSuccess(exif);
        }

      }
    }

  };

  xhr.send();
};