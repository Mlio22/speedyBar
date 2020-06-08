# speedyBar

## How to Use

### Copy and Paste
Create an speedyBar element on your template

```html
  <div class="speedyWrapper">
    <speedy-bar></speedy-bar>
  </div>
```

put some styling on both elements, example:
```css
  .speedyWrapper {
    width: 100%;
    position: fixed;
    top: 0;
}

speedy-bar {
    display: inherit;
    width: 0%;
    background: red;
    height: 3px;
    transition: .5s all;
}
```
you can customize the color or the width, ANYTHING!.

and put this on your javascript file
```javascript
  const speedyBar = document.getElementsByTagName ("speedy-bar")[0];
  // [0] can be [1], [2], etc as you want
```

### Initializing
You need to set some settings at first use
just put those line on your javascript file

```javascript
  speedybar.init = {
    times: 3,         //  how many steps do you use 
    duration: 500   //  how long the duration step-to-step (in ms)
  };
```

### Features

#### Counter (Step)
```javascript
  speedyBar.step();
```

this is the one-step function for animate the bar from n-1 to n
if the bar reaches it max width it'll start from 0, again

### towards to a certain point
```javascript
  speedyObj.goPos(5); // must integer and not higher than times that was set
```

That's All.
