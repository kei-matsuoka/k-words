variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_account_id" {}
variable "database_username" {}
variable "database_password" {}
variable "acm_certificate_arn" {}
variable "certificate_arn" {}
variable "zone_id" {}

variable "r_prefix" {
  default = "k-words"
}
