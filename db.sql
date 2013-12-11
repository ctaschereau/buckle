CREATE TABLE buckle
(
  buckle_id serial,
  buckle_name text,
  notes text,
  date_acquired date,
  CONSTRAINT buckle_pkey PRIMARY KEY (buckle_id )
);


CREATE TABLE buckle_image
(
  id serial NOT NULL,
  filename text,
  buckle_id integer,
  mimetype text,
  CONSTRAINT buckle_image_pkey PRIMARY KEY (id ),
  CONSTRAINT buckle_id_fkey FOREIGN KEY (buckle_id)
      REFERENCES buckle (buckle_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);
