resource "aws_ecr_repository" "ecr_repository_api" {
  name                 = "${var.r_prefix}-ecr-repository-api"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "ecr_repository_nginx" {
  name                 = "${var.r_prefix}-ecr-repository-nginx"
  image_tag_mutability = "MUTABLE"
}
