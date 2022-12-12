<h1 ailgn="center">ES2022.</h1>

<h3 ailgn="center">What's new in ES2022?</h3>

-----
#### Features of ES2022

1. Method `.at()` of indexable values.
> This function lets us reads an element at the given index. It can accept negative indexes to read elements from the end of the given datatype.

For example:
```
[1,2,3,4,5].at(3) // returns 4

[1,2,3,4,5].at(-2) // returns 4

```
Datatypes supporting
* String
* Array
* All Typed Array classes: Uint8Array etc.

----

2. [RegExp](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions) match indices
