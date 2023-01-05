resource "aws_db_instance" "db_instance" {
  identifier          = "${var.r_prefix}-db-instance"
  engine              = "postgres"
  engine_version      = "13.7"
  instance_class      = "db.t3.micro"
  allocated_storage   = 200
  storage_type        = "gp2"
  username            = "${var.database_username}"
  password            = "${var.database_password}"
  port                = 5432
  multi_az            = false
  skip_final_snapshot = true

  vpc_security_group_ids = ["${aws_security_group.security_group_db.id}"]
  db_subnet_group_name   = "${aws_db_subnet_group.db_subnet_group.name}"
}

resource "aws_db_subnet_group" "db_subnet_group" {
  name        = "${var.r_prefix}-db-subnet-group"
  subnet_ids  = [
    "${aws_subnet.public_subnet_1a.id}",
    "${aws_subnet.public_subnet_1c.id}",
    "${aws_subnet.private_subnet_1d.id}"
  ]

  tags = {
    Name = "${var.r_prefix}-db-subnet-group"
  }
}

resource "aws_security_group" "security_group_db" {
  name        = "${var.r_prefix}-security-group-db"
  vpc_id      = "${aws_vpc.vpc.id}"

  ingress {
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    description      = ""
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    self             = false
    cidr_blocks = [
      "60.157.102.214/32"
    ]
    security_groups = [
      "${aws_security_group.security_group_ecs.id}"
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.r_prefix}-security-group-db"
  }
}
