# sir_predictalot
A simple prediction app for simple people.
A showcase of ideas built with react.

## How do I get it running?
```
/*** Terminal window 1
git clone https://github.com/the-knights-of-the-reactangular-table/sir_predictalot.git
cd sir_predictalot
npm install
node app.js

/*** Terminal window 2
gulp
```

## How does it work?
You'll need a mobile emulator. Chrome includes this in its dev tools, so simply open them up, click on the little mobile icon in the top-left of the devtool bar, then refresh.  

Once you've done that, you can log into the app. The included users are MIJOTHY, PHB, rory, jaysone, BEECHWARE. Check out dummydata.json in the api folder for information about them (friends list, topics selected etc).  

Once you've logged in, swipe left or swipe right on the image to predict no or yes respectively. The 'x' in the bottom left deletes the current topic from your preferences.  
The '+' in the bottom right opens up a submission panel in which you can upload custom predictions within topics from your preferences. If you select the 'm8s' option, only people on your friends list will be able to receive that prediction. Other options are available for anyone who has that topic in their preferences.

### Current bugs
When closing an alert box, the 'swipe' animation plays for the current image. This has no consequence bar the animation (annoyingly) playing.
