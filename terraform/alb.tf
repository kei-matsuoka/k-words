resource "aws_alb" "alb" {
  name                       = "${var.r_prefix}-alb"
  internal                   = false
  enable_deletion_protection = false

  security_groups            = [aws_security_group.security_group_alb.id]
  subnets                    = [
    "${aws_subnet.public_subnet_1a.id}",
    "${aws_subnet.public_subnet_1c.id}"
  ]

}

resource "aws_alb_target_group" "alb_target_group" {
  name                 = "${var.r_prefix}-alb-target-group"
  port                 = 80
  depends_on           = [aws_alb.alb]
  target_type          = "ip"
  protocol             = "HTTP"
  vpc_id               = "${aws_vpc.vpc.id}"
  deregistration_delay = "300"

  health_check {
    interval            = 30
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
    matcher             = "200"
  }
}

resource "aws_alb_listener" "alb_listener" {
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  load_balancer_arn = "${aws_alb.alb.arn}"
  certificate_arn   = "${var.certificate_arn}"

  default_action {
    target_group_arn = "${aws_alb_target_group.alb_target_group.arn}"
    type             = "forward"
  }
}

resource "aws_security_group" "security_group_alb" {
  name        = "${var.r_prefix}-security-group-alb"
  vpc_id      = "${aws_vpc.vpc.id}"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.r_prefix}-security-group-alb"
  }
}
