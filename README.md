# speedyBar

## How to Use

### Initiation
```javascript
  speedyFunc(speedy, speedyBar, total, length);
```

explanation : 
1. speedy   :   a bar that those length will be changed
2. speedyBar:   the wrap of speedy(at no.1) that gives the full width of the speedy(no.1)
3. total    :   specifies the total amount of animation
4. length   :   specifies how long the animation is running (in milliseconds)

this function creates an object named **speedyObj** which will used afterwards

### Counter
```javascript
  speedyObj.forward();
```

this is the one-step function for animate the bar from n-1 to n
if the bar reaches it max width it'll start from 0, again

### Skiping animation
```javascript
  speedyObj.skip();
```

this function used for skip the animation of the forward() function
and sets the width of the bar to n width

### towards to a certain point
```javascript
  speedyObj.goPos(toPos);
  // toPos is the point to go (must integer)
```

