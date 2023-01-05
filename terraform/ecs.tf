resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.r_prefix}-ecs-cluster"
}

resource "aws_ecs_task_definition" "ecs_task_definition" {
  family                   = "k-words"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  execution_role_arn       = "arn:aws:iam::${var.aws_account_id}:role/ecsTaskExecutionRole"
  cpu                      = 256
  memory                   = 512
  container_definitions    = "${file("./task_definition.json")}"
}

resource "aws_ecs_service" "ecs_service" {
  cluster                            = "${aws_ecs_cluster.ecs_cluster.id}"
  launch_type                        = "FARGATE"
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  name                               = "k-words-service"
  task_definition                    = "${aws_ecs_task_definition.ecs_task_definition.arn}"
  desired_count                      = 1

  load_balancer {
    target_group_arn = "${aws_alb_target_group.alb_target_group.arn}"
    container_name   = "nginx"
    container_port   = 80
  }

  network_configuration {
    subnets = [
      "${aws_subnet.public_subnet_1a.id}",
      "${aws_subnet.public_subnet_1c.id}"
    ]
    security_groups = [
      "${aws_security_group.security_group_ecs.id}"
    ]
    assign_public_ip = true
  }
}

resource "aws_security_group" "security_group_ecs" {
  name        = "${var.r_prefix}-security-group-ecs"
  vpc_id      = "${aws_vpc.vpc.id}"

  ingress = [
    {
      from_port       = 443,
      to_port         = 443,
      protocol        = "tcp",
      cidr_blocks     = [],
      security_groups = [
        "${aws_security_group.security_group_vpc_endpoint.id}"
      ],
      description     = "",
      ipv6_cidr_blocks = [],
      prefix_list_ids = [],
      self = false
    },
    {
      from_port       = 80,
      to_port         = 80,
      protocol        = "tcp",
      cidr_blocks     = [],
      security_groups = [
        "${aws_security_group.security_group_alb.id}"
      ],
      description     = "",
      ipv6_cidr_blocks = [],
      prefix_list_ids = [],
      self = false
    }
  ]

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.r_prefix}-security-group-ecs"
  }
}
