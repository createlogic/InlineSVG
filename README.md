# InlineSVG
This is a jQuery plugin that takes an image selector as an argument having a SVG as source. Then it inlines the SVG so that the SVG stroke and path can be manipulated using plain CSS.


## Usage ##

### HTML ###
```
<img class="svg" src="http://addc.digitaslbiacademy.com/img/icon/svg/00-login.svg" alt="" />

```


### CSS ###
```
.svg path stroke {
	color:#00ff88;
}
```

### JS ###
```
$('.svg').inlineSVG();

```