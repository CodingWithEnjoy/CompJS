# CompJS

**A Lightweight HTML Component Library for Simplifying Code Structure**

CompJS is a small JavaScript library designed to enhance HTML code organization by introducing a simple and effective way to create and use components.

## Getting Started

To integrate CompJS into your project, add the following script tag at the end of your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/idkvarg/compjs@main/comp.js"></script>
```

With this setup, you can leverage the power of components to make your HTML code more modular and maintainable.

## Defining Components

Define components using the `<define>` tag. For example:

```html
<define name="post" style="--color:var(--color)">
    <h2 style="--color:var(--color)">{{title}}</h2>
    <p>{{about}}</p>
</define>
```

In this example, we've created a component named "post" with placeholders for the `title` and `about` variables.

## Using Components

To use a component, simply include its tag in your HTML code:

```html
<post color="red" title="This is CompJS"
      about="You can learn how to work with CompJS by reading this post">
</post>
```

Specify variable values directly in the component tag to customize its content.

## Variables and Default Values

Easily manage variable values within components. Set default values using the `{{varName=defaultValue}}` syntax. For instance:

```html
<define name="htmlViewer">
    {{html}}
</define>
<htmlViewer msg="hello">
    <h2>Hello World!</h2>
    <button onclick="alert('{{msg=hi}}')">Click Here</button>
</htmlViewer>
```

## Inserting Components

Insert components from external files into your code:

```html
<define src="path/to/component" name="something"></define>
<something></something>
```

CompJS streamlines your code, making it more readable and maintainable.

## Enjoy the Simplicity

CompJS is designed to simplify your HTML code, making it more modular and expressive. Enjoy a more efficient development experience with CompJS!
