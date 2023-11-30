# BOM

## Scroll

### scrollHeight 和 scrollWidth（只读）

<!--获取元素整个**内容**的高度和宽度 （包含看不见的） ，如果有滚动条（滚动条会占用部分宽高），不计算滚动条的宽高-->

`Element.scrollHeight`属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括`padding`，但是不包括`border`、`margin`以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（`::before`或`::after`）的高度。

`Element.scrollWidth`属性表示当前元素的总宽度（单位像素），其他地方都与`scrollHeight`属性类似。这两个属性只读

整张网页的总高度可以从`document.documentElement`或`document.body`上读取

### scrollTop 和 scrollLeft（可读写）

<!--获取元素垂直和水平滚动条滚动的距离(被卷去的头部和左侧)-->

`Element.scrollLeft`属性表示当前元素的水平滚动条向右侧滚动的像素数量，`Element.scrollTop`属性表示当前元素的垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于 0。

如果要查看整张网页的水平的和垂直的滚动距离，要从`document.documentElement`元素上读取

这两个属性都可读写，设置该属性的值（不需要单位），会导致浏览器将当前元素自动滚动到相应的位置

## Offset

### offsetHeight, offsetWidth, offsetTop, offsetLeft（只读）

<!--获取盒子的高度宽度，包括内容区、内边距、边框（这里就是css设置的那些样式组合）-->

![image-20220825183858516](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa2bd3eecaf84314b974c3c05ab7f913~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

`Element.offsetHeight`属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）。

`Element.offsetWidth`属性表示元素的 CSS 水平宽度（单位像素），其他都与`Element.offsetHeight`一致。

这两个属性都是只读属性，只比`Element.clientHeight`和`Element.clientWidth`多了边框的高度或宽度。如果元素的 CSS 设为不可见（比如`display: none;`），则返回`0`。

`Element.offsetParent`属性返回最靠近当前元素的、并且 CSS 的`position`属性不等于`static`的上层元素。

该属性主要用于确定子元素位置偏移的计算基准，`Element.offsetTop`和`Element.offsetLeft`就是`offsetParent`元素计算的。

如果该元素是不可见的（`display`属性为`none`），或者位置是固定的（`position`属性为`fixed`），则`offsetParent`属性返回`null`。如果某个元素的所有上层节点的`position`属性都是`static`，则`Element.offsetParent`属性指向``元素。

## Client
