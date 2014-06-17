function RotatedImage(path) {
  this.properties = {
    path: ko.observable(path),
    width: ko.observable('100%'),
    height: ko.observable('100%'),
    orientation: ko.observable('1'),
    top: ko.observable('0px')
  };

  var self = this;
  var image = document.createElement('img');
  image.onload = function() {
    var imageWidth = image.clientWidth || image.width;
    var imageHeight = image.clientHeight || image.height;

    if (self.properties.orientation() > 4) {
      self.properties.width(imageHeight + 'px');
      self.properties.height(imageWidth + 'px');
      var top = (imageWidth - imageHeight) / 2;
      self.properties.top(top + 'px');
    } else {
      self.properties.width(imageWidth + 'px');
      self.properties.height(imageHeight + 'px');
    }
  };

  $(image).on('resize.image', function() {
    self.initImage();
  });

  this.element = ko.observable(image);
  this.parseImage();
}

RotatedImage.prototype.initImage = function() {
  var self = this;
  var image = this.element();
  image.className = 'rotated-image exif-orientation-' + self.properties.orientation();
  image.style.maxWidth = '100%';
  image.setAttribute('src', this.properties.path());
  // https://code.google.com/p/chromium/issues/detail?id=7731
  image.onload();
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