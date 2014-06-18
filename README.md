Knockout Image Rotater
======================

The 'Knockout Image Rotater' can rotate images reading their EXIF orientation values and using Knockout.js bindings.

## Execution ##
```
npm install (package.json)
bower install (bower.json)
```

## Usage ##

### Template ###

```html
<div data-bind="foreach: { data: images, as: 'image' }">
  <div class="rotated-image-wrapper"
       data-bind="rotatedImage: image.element, style: { height: image.properties.height }">
  </div>
</div>
```

### JavaScript ###

```javascript
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

ko.applyBindings(viewModel, document.getElementById('wrapper'));
```

or:

```javascript
ImageRotator.init();

var viewModel = {
  images: ko.observableArray([])
};

viewModel.images().push(new RotatedImage('assets/images/1-up.jpg'));
viewModel.images().push(new RotatedImage('assets/images/2-up-mirrored.jpg'));

ko.applyBindings(viewModel, document.getElementById('wrapper'));

...
```
