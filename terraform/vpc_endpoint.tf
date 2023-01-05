resource "aws_vpc_endpoint" "vpc_endpoint_s3" {
  vpc_id            = "${aws_vpc.vpc.id}"
  service_name      = "com.amazonaws.ap-northeast-1.s3"
  vpc_endpoint_type = "Gateway"

  tags = {
    Name = "${var.r_prefix}-vpc-endpoint-s3"
  }
}

resource "aws_vpc_endpoint_route_table_association" "aws_vpc_endpoint_route_table_association_with_endpoint_s3" {
  vpc_endpoint_id = "${aws_vpc_endpoint.vpc_endpoint_s3.id}"
  route_table_id  = "${aws_default_route_table.route_table.id}"
}

resource "aws_vpc_endpoint" "vpc_endpoint_ecr_api" {
  vpc_id              = "${aws_vpc.vpc.id}"
  service_name        = "com.amazonaws.ap-northeast-1.ecr.api"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = ["${aws_subnet.public_subnet_1a.id}","${aws_subnet.public_subnet_1c.id}"]
  security_group_ids  = ["${aws_security_group.security_group_vpc_endpoint.id}"]
  private_dns_enabled = true

  tags = {
    Name = "${var.r_prefix}-vpc-endpoint-ecr-api"
  }
}

resource "aws_vpc_endpoint" "vpc_endpoint_ecr_dkr" {
  vpc_id              = "${aws_vpc.vpc.id}"
  service_name        = "com.amazonaws.ap-northeast-1.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = ["${aws_subnet.public_subnet_1a.id}","${aws_subnet.public_subnet_1c.id}"]
  security_group_ids  = ["${aws_security_group.security_group_vpc_endpoint.id}"]
  private_dns_enabled = true

  tags = {
    Name = "${var.r_prefix}-vpc-endpoint-ecr-dkr"
  }
}

resource "aws_security_group" "security_group_vpc_endpoint" {
  name   = "${var.r_prefix}-security-group-vpc-endpoint"
  vpc_id = "${aws_vpc.vpc.id}"

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
    Name = "${var.r_prefix}-security-group-vpc-endpoint"
  }
}
