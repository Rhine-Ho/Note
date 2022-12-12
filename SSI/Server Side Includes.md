<h1 align="center">SSI(Server Side Includes)</h1>

<h3 align="center">A simple interpreted server-side scripting language used almost exclusively for the World Wide Web(www). </h3>

---
### 

### What is SSI ?

- In web development, directives define custom tags translated to regular Javascript, HTML, or CSS to modify a page’s Document Object Model. Server Side Inclusion represents the directives in a web document’s request header field that instructs the server to include additional data within the HTML output for dynamic content delivery.

- It is most useful for including the contents of one or more files into a web page on a web server, using it's `#include` directive.

Examples:
> A web page containing a daily quotation could include the quotation by placing the following code into the file of the web page.

```
<!--#include virtual="../quote.txt" -->
```
>With one change of the `quote.txt` file, all pages that include the file will display the latest daily quotation. The inclusion is not limited to files, and may also be the text output from a program, or the value of a system variable such as the current time.

 This could commonly be a common piece of code throughout a site, such as a page header, a page footer and a navigation menu. 

- SSI also contains control directives for conditional features and directives for calling external programs. It is supported by `Apache`, `LiteSpeed`, `Nginx`, `IIS` as well as W3C's Jigsaw.It has its roots in HTTP.

In order for a web server to recognize an SSI-enabled HTML file and therefore carry out these instructions, either the filename should end with a special extension, by default .shtml, .stm, .shtm, or, if the server is configured to allow this, set the execution bit of the file.[3]