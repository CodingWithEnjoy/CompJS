# It's CompJS
This is a small library that can be effective in shortening the size of your html codes by adding it to your projects
## How?
Please add this code to the end of your html code first:
```html
<script src="https://cdn.jsdelivr.net/gh/yesvarg/compjs@main/compjs.js"></script>
```
Then everything is ready for coding! From now on, you can only use the "define" tag and enter the code you want to use as a component multiple times. For example:
```html
<define name="post" style="--color:var(--color)">
    <h2 style="--color:var(--color)">{{title}}</h2>
    <p>{{about}}</p>
</define>
```
So far we have set up a component, note that this component is not going to be displayed until we include its tag in the html code. Here we set the name of the component equal to "post" through the "name" attribute. This means that whenever we enter the post tag, the entire code of the component will be displayed to us:
```html
<post></post>
```
## Variables
Naturally, when using components, there are parts that may change each time they are mentioned, for example, in the example above, our variable values ​​are "title" and "about" "color" (in the style attribute of the "define" tag). In order to create a post tag with different values ​​for these variables, we must act as follows:
```html
<post color="red" title="This is CompJS"
      about="You can learn how to work with CompJS by reading this post">
</post>
```
Also, if we want to set a default value for a variable of the component, it is enough to set it as:
```html
{{varName=defualtValue}}
```
There are times when we want to insert the html code entered into its tag in a part of a component instead of the variable, for this:
```html
<define name="htmlViewer">
      {{html}}
</define>
<htmlViewer msg="hello"><h2>Hello World!</h2><button onclick="alert('{{msg=hi}}')">Click Here</button></htmlViewer>
It will return a h2 and a button tag that when you click on, it alerts "hello"
```
## Insert a Component
You can insert a component from another place into your code instead of these tasks:
```html
<define src="path/to/component" name="something"></define>
<something></something>
```
And these are all the help that CompJS does by adding a few lines of code to your code!
<br>
enjoy!
