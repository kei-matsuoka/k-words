resource "aws_elasticache_replication_group" "elasticache_replication_group" {
  replication_group_id       = "${var.r_prefix}-elasticache-replication-group"
  engine                     = "redis"
  automatic_failover_enabled = true
  multi_az_enabled           = true
  node_type                  = "cache.t3.micro"
  parameter_group_name       = "default.redis7"
  engine_version             = "7.0"
  port                       = 6379
  description                = " "

  num_node_groups            = 1
  replicas_per_node_group    = 2


  subnet_group_name  = "${aws_elasticache_subnet_group.elasticache_subnet_group.name}"
  security_group_ids = [
    "${aws_security_group.security_group_elasticache.id}"
  ]
}

resource "aws_elasticache_subnet_group" "elasticache_subnet_group" {
  name = "${var.r_prefix}-elasticache-subnet-group"
  subnet_ids = [
    "${aws_subnet.public_subnet_1a.id}",
    "${aws_subnet.public_subnet_1c.id}"
  ]
}

resource "aws_security_group" "security_group_elasticache" {
  name   = "${var.r_prefix}-security-group-elasticache"
  vpc_id = "${aws_vpc.vpc.id}"

  ingress = [
    {
      from_port        = 0
      to_port          = 0
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      security_groups  = []
      description      = ""
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      self             = false
    },
    {
      from_port        = 6379
      to_port          = 6379
      protocol         = "tcp"
      cidr_blocks      = []
      security_groups  = ["${aws_security_group.security_group_ecs.id}"]
      description      = ""
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      self             = false
    }
  ]

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.r_prefix}-security-group-elasticache"
  }
}
