-- Ensure we get two user IDs that respect the user_order constraint (user1_id < user2_id)
WITH user_pairs AS (
    SELECT
        u1.id as user1_id,
        u2.id as user2_id
    FROM users u1
             CROSS JOIN users u2
    WHERE u1.id < u2.id
    LIMIT 1 -- Ensure only one valid user pair is selected
)
-- Insert a sample chat while respecting constraints
INSERT INTO chats (listing_id, user1_id, user2_id)
SELECT
    (SELECT id FROM listings LIMIT 1), -- Ensure the listing exists
    user1_id,
    user2_id
FROM user_pairs
ON CONFLICT (listing_id, user1_id, user2_id) DO NOTHING -- Prevent duplicate chat insertions
RETURNING id, user1_id, user2_id;

-- Insert sample messages for the created chat
WITH chat_data AS (
    SELECT id as chat_id, user1_id, user2_id
    FROM chats
    ORDER BY id DESC -- Ensure we get the latest inserted chat
    LIMIT 1
)
INSERT INTO chat_messages (chat_id, user_id, message, created_at)
SELECT
    chat_id,
    CASE WHEN MOD(row_number() OVER(), 2) = 0 THEN user1_id ELSE user2_id END AS user_id, -- Alternate senders
    message,
    timestamp '2024-01-20 10:00:00' + (interval '1 minute' * (row_number() OVER())) -- Unique timestamps
FROM chat_data
         CROSS JOIN (
    VALUES
        ('Hi, is this apartment still available?'),
        ('Yes, it is! Would you like to schedule a viewing?'),
        ('That would be great! When would be possible?'),
        ('How about this Saturday at 2 PM?'),
        ('Perfect! I''ll be there. Could you send me the exact address?'),
        ('Sure! It''s Mannerheimintie 123, Helsinki. There''s parking available if you come by car.'),
        ('Thanks! Looking forward to seeing the place.'),
        ('Great! See you on Saturday!')
) AS m(message);
