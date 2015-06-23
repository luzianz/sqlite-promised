CREATE TABLE "main"."notes" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	"content" TEXT NOT NULL,
	"when_created" INTEGER NOT NULL DEFAULT (strftime('%s','now'))
);

CREATE VIEW "main"."vw_notes" AS
SELECT n."id",
	n."content",
	n."when_created",
	strftime('%Y-%m-%dT%H:%M:%SZ', n."when_created", 'unixepoch') AS "when_created_string"
FROM "main"."notes" n;

INSERT INTO "main"."notes" ("content") VALUES('Work hard, have fun, no drama');