CREATE TABLE IF NOT EXISTS packages (
    voucher VARCHAR(30) PRIMARY KEY,
    postcode VARCHAR(5) NOT NULL,
    state SMALLINT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS clusters (
    name VARCHAR(1) PRIMARY KEY,
    postcode VARCHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    cluster VARCHAR(1) REFERENCES clusters(name) NOT NULL
);

INSERT INTO packages(voucher, postcode) 
    VALUES 
        ('A1A', '10041'),
        ('B2B', '11332'),
        ('C3C', '10042'),
        ('D4D', '11342'),
        ('E5E', '11444'),
        ('F6F', '16788'),
        ('G7G', '16788'),
        ('H8H', '10043'),
        ('I9I', '16800'),
        ('J0J', '16801');

INSERT INTO clusters 
    VALUES 
        ('A', '10'), 
        ('B', '11'), 
        ('C', '16');

INSERT INTO drivers(name, cluster) 
    VALUES 
        ('Moe', 'A'), 
        ('Larry', 'B'),
        ('Curly', 'C');
