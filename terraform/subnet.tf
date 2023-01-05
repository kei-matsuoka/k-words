resource "aws_subnet" "public_subnet_1a" {
  vpc_id                  = "${aws_vpc.vpc.id}"
  cidr_block              = "10.0.10.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = false

  tags = {
    Name = "${var.r_prefix}-public-subnet-1a"
  }
}

resource "aws_subnet" "public_subnet_1c" {
  vpc_id                  = "${aws_vpc.vpc.id}"
  cidr_block              = "10.0.20.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = false

  tags = {
    Name = "${var.r_prefix}-public-subnet-1c"
  }
}

resource "aws_subnet" "private_subnet_1d" {
  vpc_id                  = "${aws_vpc.vpc.id}"
  cidr_block              = "10.0.30.0/24"
  availability_zone       = "ap-northeast-1d"
  map_public_ip_on_launch = false

  tags = {
    Name = "${var.r_prefix}-public-subnet-1d"
  }
}
