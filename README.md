Big Pouch

It's [big](https://github.com/tmcw/big) but with pouchdb, you need to use erica to put it into couchdb (doesn't work in cloudant), and your slides are just docs with the set up

```json
{
"_id":"1",
"text":"slide"
}
```

and then incriment the ids

after you update the slides you need to run `replicate()` in the console.

There is a command line util you can also use, 

```bash
bigPouch new "slide content"

bigPouch get 4 #slide number

bigPouch update 4 #slide number

bigPouch len
```

