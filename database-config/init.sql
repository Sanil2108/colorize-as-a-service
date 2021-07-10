CREATE TABLE IF NOT EXISTS predictions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    prediction_complete BOOL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    input_url TEXT NOT NULL,
    output_uri TEXT DEFAULT NULL
);

