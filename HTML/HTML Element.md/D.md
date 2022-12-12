# Element (D) Note.

-----


* `<data>`(en-US)
* `<datalist>`(en-US)
* `<dd>`(en-US)
* `<del>`(en-US)
* `<details>`(en-US)
* `<dfn>`(en-US)
* `<dialog>`(en-US)
* `<div>`
* `<dl>`(en-US)
* `<dt>`(en-US)

-----





The `<div>`is a HTML element is generic container for flow content.
<br>It has no effect on the content or layout until styled in some way using CSS(e.g styling is derectly applied to it, or some kind of layout model like Flexbox is applied to its parent element).

```

<div class="n2">
        <h1>Apeiron</h1>
          <div class="sleeve">
            <span class="one"></span>
            <div class="two "></div>
            <div class="three "></div>
            <div class="four "></div>
            <div class="five"></div>
          </div>
    </div>

- CSS

.sleeve{
  width: 200px;
  height: 5px;
  background: rgba(0, 0, 0, 0.1);
}
.one{
  background:linear-gradient(20deg, rgb(0, 0, 0), rgb(0, 255, 0), rgb(255, 255,255));
  padding:0px;
  box-shadow:0 0 45px 10px silver;
}
.two{
  background:linear-gradient(20deg, rgb(255, 255, 255), rgb(0, 255, 0), rgb(0, 0, 0)70%);
  padding:0px;
}
.three{
  background:linear-gradient(20deg, rgb(0, 0, 0)40%, rgb(0, 255, 0), rgb(255, 255, 255));
  padding:0px;
}
.four{
  background:linear-gradient(20deg, rgb(255, 255, 255), rgb(0, 255, 0), rgb(0, 0, 0)60%);
  padding:0px;
}
.five{
  background:linear-gradient(20deg, rgb(0, 0, 0)25%, rgb(0, 255, 0), rgb(255, 255, 255));
}

```

## layout




