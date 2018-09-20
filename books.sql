CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  author VARCHAR(256),
  title VARCHAR(256),
  isbn BIGINT,
  image_url VARCHAR(256),
  description TEXT
);

DELETE FROM books;

INSERT INTO books (author, title, isbn, image_url, description) VALUES ('Frank Herbert', 'Dune', 9780441013593, 'http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.');

INSERT INTO books (author, title, isbn, image_url, description) VALUES ('Alexandre Dumas', 'The Count of Monte Cristo', 9789577473523, 'http://books.google.com/books/content?id=rOQu3bomHMQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'With the post-Napoleonic era as the back-drop, the novel covers the life of a young sailor, Edmond Dantes. The narration follows him from near-triumph to complete disaster and then his swashbuckling adventures to get freedom and revenge. The blustering journey of the protagonist keeps the reader on the edge.');

INSERT INTO books (author, title, isbn, image_url, description) VALUES ('JRR Tolkien', 'The Lord of the Rings: The Fellowship of the Ring', 9780007488308, 'http://books.google.com/books/content?id=_FjrugAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'Continuing the story begun in The Hobbit, this is the first part of Tolkien s epic masterpiece, The Lord of the Rings, featuring an exclusive cover image from the film, the definitive text, and a detailed map of Middle-earth. Sauron, the Dark Lord, has gathered to him all the Rings of Power the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring the ring that rules them all which has fallen into the hands of the hobbit, Bilbo Baggins. In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose.');

INSERT INTO books (author, title, isbn, image_url, description) VALUES ('Dr. Seuss', 'Green Eggs and Ham', 9780007355914, 'https://books.google.com/books/content?id=6pMUQwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'Dr. Seuss''s much-loved classic, Green Eggs and Ham, is now available for the first time in picture book format.')