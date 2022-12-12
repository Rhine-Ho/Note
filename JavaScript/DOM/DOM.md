<h1 align="center">DOM（Document Object Model)文件物件模型</h1>

<h3 align="center">
The Document Object Model (DOM) connects web pages to scripts or programming languages by representing the structure of a document—such as the HTML representing a web page—in memory. Usually it refers to JavaScript, even though modeling HTML, SVG, or XML documents as objects are not part of the core JavaScript language.</h3>

---

```html
<body>
<style> 
div{
        margin:2% 20%;
        display:flex;
}
.header {
    margin:0% 25%;
    border:6px green groove;
}
span{
     margin:10%;
}
.one{
    margin:23%;
    border:2px black dashed;
    background-color:grey;
}
.two{
   margin-left:15%;
   margin-right:25%;
   border:6px green groove;
   padding:0% 4%;
}
.three{
    margin-left:0%;
    margin-right:0%;
    border:6px green groove;
    padding:0% 4%;
}
   </style>
<div class="header" align="center">HTML</div>

<div>
<span class="one"></span>
<span class="two">head</span>
<span class="one"></span>
</div>

<div>
<span class="two">head</span>
<span class="three">body</span>
</div>

<div>
<span class="one"></span>
<span class="one"></span>
</div>

<div>
<span class="two">title</span>
<span class="three">hello,world</span>
</div>
<div>
<span class="one"></span>
</div>

<div>
<span class="two">Hello</span>
</div>

</body>

```
<br><br>

---

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
    body {
        font: 24px Helvetica;
        background: #999999;
    }
    #main {
        min-height: 800px;
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: row;
    }
    #main > article {
        margin: 4px;
        padding: 5px;
        border: 1px solid #cccc33;
        border-radius: 7pt;
        background: #dddd88;
        flex: 3 1 60%;
        order: 2;
    }
    #main > nav {
        margin: 4px;
        padding: 5px;
        border: 1px solid #8888bb;
        border-radius: 7pt;
        background: #ccccff;
        flex: 1 6 20%;
        order: 1;
    }
    #main > aside {
        margin: 4px;
        padding: 5px;
        border: 1px solid #8888bb;
        border-radius: 7pt;
        background: #ccccff;
        flex: 1 6 20%;
        order: 3;
    }
    header, footer {
        display: block;
        margin: 4px;
        padding: 5px;
        min-height: 100px;
        border: 1px solid #eebb55;
        border-radius: 7pt;
        background: #ffeebb;
    }
    /* Too narrow to support three columns */
    @media all and (max-width: 640px) {
        #main, #page {
            flex-direction: column;
        }
        #main > article, #main > nav, #main > aside {
        /* Return them to document order */
            order: 0;
        }
        #main > nav, #main > aside, header, footer {
            min-height: 50px;
            max-height: 50px;
        }
    }
    </style>
  </head>
  <body>
    <header>header</header>
    <div id='main'>
      <article>article</article>
      <nav>nav</nav>
      <aside>aside</aside>
    </div>
    <footer>footer</footer>
  </body>
</html>

```

---
```

```


The DOM represents a document with a [logical tree](https://bethestrategicpm.com/logic-tree-diagrams/). Each branch of the tree ends in a node, and each node contains objects. DOM methods allow programmatic access to the tree. With them, you can change the document's structure, style, or content.

Nodes can also have event handlers attached to them. Once an event is triggered, the event handlers get executed.

