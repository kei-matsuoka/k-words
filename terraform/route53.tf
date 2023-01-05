resource "aws_route53_record" "api_hostdomain" {
  zone_id = "${var.zone_id}"
  name    = "k-words.net"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.cloudfront_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.cloudfront_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "api_subdomain" {
  zone_id = "${var.zone_id}"
  name    = "api.k-words.net"
  type    = "A"

  alias {
    name                   = "${aws_alb.alb.dns_name}"
    zone_id                = "${aws_alb.alb.zone_id}"
    evaluate_target_health = true
  }
}
