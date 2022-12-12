<!Doctype html>
<html>
<body>
<style> 
.header {
    margin:0% 25%;
    border:6px green groove;
    padding:0% 4%;
}
.one{
    margin-left:30%;
    margin-right:8%;
    border:2px black dashed;
    background-color:grey;
}
.two{
   margin-left:25%;
   border:6px green groove;
   padding:0% 4%;
}
span.three{
    margin-left:15%;
    margin-right:20%;
    border:6px green groove;
    padding:0% 4%;
}
     @media all and (max-width: 640px) {
        div,span {
            margin:0% auto;
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
<div class="header" align="center">HTML</div>

<div>
<span class="one"></span>
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
<span class="three">Hello</span>
</div>
<div>
<span class="one"></span>
</div>

<div>
<span class="two">Hello,world</span>
</div>

</body>
</html>