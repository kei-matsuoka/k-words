resource "aws_default_route_table" "route_table" {
  default_route_table_id = "${aws_vpc.vpc.default_route_table_id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.internet_gateway.id}"
  }

  tags = {
    Name = "${var.r_prefix}-route-table"
  }
}

resource "aws_route_table_association" "route_table_association_with_public_subnet_1a" {
  subnet_id      = "${aws_subnet.public_subnet_1a.id}"
  route_table_id = "${aws_default_route_table.route_table.id}"
}

resource "aws_route_table_association" "route_table_association_with_public_subnet_1c" {
  subnet_id      = "${aws_subnet.public_subnet_1c.id}"
  route_table_id = "${aws_default_route_table.route_table.id}"
}
