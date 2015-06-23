### Fetch required packages

`npm install`

### Fetch required typings

```bash
cd node_modules/sqlite-promised
tsd update
```

### Create database with script

`cat init.sql | sqlite3 database.db`