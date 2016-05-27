### Preload header charset bug demo
```
npm install
node index.js
```

Interestingly, if there is JS file with BOM in the same directory (see `/bom` page), it affects broken file and it starts recognizing as utf-8 correctly, however file itself was not changed.
