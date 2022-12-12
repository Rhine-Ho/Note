<h1 align="center">Over view</h1>

<h3 align="center">When learning css, you must first know what html element, class, id and inline writing of CSS are. 
After knowing the basic css, there is one thing you must know first, and that is css weight.</h3>

---
Priority of css, for example:

- Css with the same weight but written later can overwrite css written first.
- When two selectors act on an element at the same time, the one with the highest weight takes precedence.

# Basic Css weight.
```
inline style > ID > Class > Element > *
```
- `*`: The commonly used default value of the whole station is 0-0-0-0, so it can be overridden as long as the weight exceeds it.

```
＊{
    padding:0;
    margin:0;

}
```
### Element
The weight of all Element is 0-0-0-1.
What are the total Element? Some common ones are listed below, and others please refer to
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity).
```
div, p, ul, ol, li, em, header, footer, article....
```
Same as element weight 0-0-0-1.
- #### psuedo-element

|Selector|  --  |
|--------|:-----|
| ::after|After element|
|::before|Before element|
|::first-letter|Applies styles to the first letter of the first line of a block-level element, but only when not preceded by other content (such as images or inline tables). |
|::first-line|Used to change the font of the first line of a paragraph.|
|selection|Applies styles to the part of a document that has been highlighted by the user (such as clicking and dragging the mouse across text).|
### class
Class will be written as class="__`class name`__" in html, and in css will have a dot'.' like this __`.class name`__ .

The weight of each class is 0-0-1-0.

```
.class name{
    padding:0;
    margin:0;
}
```
Both same as class weight 0-0-1-0.
View more Slectors [W3C](https://www.w3.org/TR/selectors/#overview).
- #### psuedo-classes

```
:nth-child() 、 :link 、 :hover 、 :focus 
:only-of-type 、 :nth-of-type
```
- #### Attribute seleter
```
[type:checkbox]、[attr]
```
### Id
Id will be written as id="__`id name`__"in html, and In css, it looks like __`#id name`__  with a pound sign in front.

The weight of each id is 0-1-0-0.
```
#id name{
    padding:0;
    margin:0;
}
```
### inline style attribute

The weight of inline style attribute 1-0-0-0.
```
<div style="color:red"> //type of style
CSS specififcity.
</div>
```
---
#Calculation of weight
```
01. *{}                         ====》0
02. li{}     /* a=0 b=0 c=1     ====》1(element)
03. .sith {} /* a=0 b=1 c=0     ====》10（class）
04. li ::first-line{}  /* a=0 b=0 c=2 ====》2(element/pseudo element)
05. ul li {}  /* a=0 b=0 c=2    ====》2（two elements）
06. ul ol+li{}/* a=0 b=0 c=3    ====》3（three elements）
07. h1+ *[rel=up]{} /* a=0 b=1 c=1   ====》11（selector/element）
08. ul ol li.red{}/* a=0 b=1 c=3     ====》13（class/three elements）
09. li.red.level{}/* a=0 b=2 c=1     ====》21（two classes/element）
10. style=".." /* a=10 b=0 c=0  ====》1000(inline style)
11. p {}     /* a=0 b=0 c=1     ====》1（element）
12. div p {} /* a=0 b=0 c=2     ====》2（two elements）
13. div p.sith{}   /* a=0 b=1 c=2    ====》12（class/two elements）
14. #sith{}        /* a=1 b=0 c=0    ====》100（ID）
15. body #darkside .sith p {} /* a=1 b=1 c=2  ====》112(1+100+10+1,ID/class/two elements)
```

view more
[W3c](https://www.w3.org/TR/CSS1/)