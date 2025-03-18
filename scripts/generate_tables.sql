DROP TABLE IF EXISTS housing, on_campus_details, off_campus_details CASCADE;

-- Main Housing Table
CREATE TABLE housing (
    dorm_id SERIAL PRIMARY KEY,
    dorm_name TEXT NOT NULL,
    address TEXT NOT NULL,
    num_rooms NUMERIC NOT NULL,
    images TEXT,
    amenities TEXT,
    off_campus BOOLEAN NOT NULL,
    housing_type TEXT -- e.g., "dorm", "apartment", "house"
);

-- On-Campus Housing Details
CREATE TABLE on_campus_details (
    dorm_id INT PRIMARY KEY REFERENCES housing(dorm_id),
    grade_specific_housing TEXT,
    campus TEXT,
    avg_lottery_number NUMERIC
);

-- Off-Campus Housing Details
CREATE TABLE off_campus_details (
    dorm_id INT PRIMARY KEY REFERENCES housing(dorm_id),
    sq_ft NUMERIC,
    availability TEXT,
    pricing TEXT
);