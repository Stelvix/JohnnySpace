CREATE TABLE IF NOT EXISTS readings (
                                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    temperature NUMERIC,
    humidity NUMERIC,
    soil_humidity NUMERIC,
    is_valid BOOLEAN DEFAULT true,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS actions (
                                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50),
    duration INTEGER,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    is_auto BOOLEAN DEFAULT false,
    status VARCHAR(20)
    );

CREATE TABLE IF NOT EXISTS alerts (
                                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50),
    severity VARCHAR(20),
    message TEXT,
    reading_id UUID REFERENCES readings(id),
    block_auto_watering BOOLEAN DEFAULT false,
    acknowledged BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS equipment_status (
                                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE,
    type VARCHAR(50),
    status VARCHAR(20),
    last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO equipment_status (name, type, status) VALUES
                                                      ('pump', 'pump', 'off'),
                                                      ('led', 'led', 'off'),
                                                      ('camera', 'camera', 'ready')
    ON CONFLICT (name) DO NOTHING;