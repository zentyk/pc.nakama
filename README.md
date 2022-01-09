# pc.nakama
A heroic labs - nakama js wrapper for playcanvas game engine.

## First Steps

__you don't need to import the nakama-js.umd.js file, this wrapper uses the 2.1.5 version inside__

### variables:

* server_ip : your nakama server ip

* nakama_port : your nakama server port (by default is 443 when using SSL connection)

* useSSL : this is a bool, use true if your server uses HTTPS.

__This nakama wrapper uses only custom authentication, other auth methods will be supported in further updates.__ 

* customId : the user's customId

* clientUsername : the user's username

This wrapper executes this options automaticaly:

* Auto-import of the nakama.js client
* Creates the client
* CheckSession and Authenticate your users
* Establish the socket connection
* Retrieve and Update the oponents list without process the match-presence events.

For more information about Custom Authentication see
[the documentation](https://heroiclabs.com/docs/authentication/)

## Use the playcanvas.js engine-only solution

Import the library like any ES6 module in your html file.

```js
<script type="module">
        import NakamaJs from "./pc-nakama.js";
        var nakama = new NakamaJs(<server_ip>, <nakama_port>,<useSSL>, <customId>, <clientUsername>);
</script>
```

## Use production-ready jsdelivr minified file

```js
<script type="module">
    import NakamaJs from 'https://cdn.jsdelivr.net/npm/pc.nakama@1.0.4/dist/prod/pc-nakama.min.js';
    var nk = new NakamaJs("192.168.100.1","443",true,"123","gamedev.js");
    nk.initiate();
</script>
```

## Use inside playcanvas editor script:

1. Import the file in the editor, __don't drop the file into the editor the drop option doesn't load well the file, instead use the 'upload' option.__

2. uncheck the 'preload' option in the file editor options.

3. you can create an empty script, attach the script as the first in the 'script loading order', __don't attach it to a component or entity__

```js
var module;

(function() {
    var asset = pc.Application.getApplication().assets.find('pc-nakama.min.js');
    
    async function load() {
        module = await import(asset.getFileUrl());
        var nakama = new NakamaJs(<server_ip>, <nakama_port>,<useSSL>, <customId>, <clientUsername>);
    }
    
    load();
})();
```

To create a tunel in ngrok
```
ngrok start --config ./ngrok.yml --all
```