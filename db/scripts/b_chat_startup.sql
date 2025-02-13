
drop table if exists chat_messages cascade;
drop table if exists chats cascade;
drop index if exists idx_chat_messages, idx_chat_users;

create table if not exists chats
(
    id         serial primary key,
    listing_id integer not null,
    user1_id   uuid    not null,
    user2_id   uuid    not null,
    created_at timestamp default current_timestamp,
    constraint fk_user1 foreign key (user1_id) references users (id) on delete cascade,
    constraint fk_user2 foreign key (user2_id) references users (id) on delete cascade,
    constraint fk_inserat foreign key (listing_id) references listings (id) on delete cascade,
    constraint user_order check (user1_id < user2_id),
    constraint unique_chat_per_listing unique (listing_id, user1_id, user2_id)
);

create index if not exists idx_chat_users on chats (listing_id, user1_id, user2_id);

create table if not exists chat_messages
(
    id         serial primary key,
    chat_id    integer not null,
    user_id    uuid    not null,
    message    text    not null,
    created_at timestamp default current_timestamp,
    constraint fk_chat foreign key (chat_id) references chats (id) on delete cascade,
    constraint fk_user foreign key (user_id) references users (id) on delete cascade
);

create index if not exists idx_chat_messages on chat_messages (chat_id, created_at);