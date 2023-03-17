```
@Post('rss-translate')
  async rssTranslateRoute(@Body() input: {id: number}, @Res() res: Response) {
    return res.status(200).send('rss')
    if (!input) return res.status(400).send()
    const bookIndex = defaultTo(0, Number(input.id))
    const result = await this.speedReader.readBook(bookIndex)
    if (!result) return res.status(400).send()

    return res.status(200).send(result)
  }
```


nest-cli.json

```
 "rss-translate": {
      "type": "library",
      "root": "libs/rss-translate",
      "entryFile": "index",
      "sourceRoot": "libs/rss-translate/src",
      "compilerOptions": {
        "tsConfigPath": "libs/rss-translate/tsconfig.lib.json"
      }
    }
```
