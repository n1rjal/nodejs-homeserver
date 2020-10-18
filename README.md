## Homeserver in nodejs

> To host movies over wlan
> To host mp4 files over wlan

## Howto

Make sure nodejs and git is installed in your system
<br>
Open up your favourite terminal and type

```
git clone https://github.com/n1rjal/nodejs-homeserver.git
cd homeserver
npm install
npm run start
```

## Over Wifi

To stream over wifi add the following line in app.js

```javascript
app.listen("YOUR WIFI IP ADDRESS", 3000);
```

Open any other connected device in your network, open browser and nagivate to  
<br>

> YOUR WIFI IP ADDRESS: 3000
> Example:
> 192.168.134.12:3000

## Nodejs

This is built using node js. I got to learn more on the backend part of how streaming is done over the internet like the status code 206. Range, accepts and many streaming/partial headers

## Resoucres

[How is streaming done](https://www.cloudflare.com/learning/performance/what-is-streaming/)
