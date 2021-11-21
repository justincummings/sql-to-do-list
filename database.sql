CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY,
	"task"  varchar (140),
	"status" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
("task", "status")
VALUES
('learn to code', false),
('remind myself everything is fine', false),
('get amazing new job in tech', false),
('remind myself everything is fine... again', false),
('profit.', false);