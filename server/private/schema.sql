CREATE TABLE IF NOT EXISTS albums (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  enabled     INTEGER NOT NULL DEFAULT 1,
  cover_photo_id INTEGER,
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS photos (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id  INTEGER NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  filename  TEXT NOT NULL,         -- base sin extensión (uuid o id)
  orig_ext  TEXT NOT NULL DEFAULT 'jpg',
  w INTEGER NOT NULL DEFAULT 0,
  h INTEGER NOT NULL DEFAULT 0,
  position  INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_photos_album ON photos(album_id, position);
