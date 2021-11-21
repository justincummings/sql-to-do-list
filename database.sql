CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY,
	"task"  varchar (140) NOT NULL,
	"taskStatus" boolean DEFAULT FALSE
);

INSERT INTO "tasks"
("task", "taskStatus")
VALUES
('learn to code', FALSE),
('remind myself everything is fine', FALSE),
('get amazing new job in tech', FALSE),
('remind myself everything is fine... again', FALSE),
('profit.', FALSE);