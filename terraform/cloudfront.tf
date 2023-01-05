resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.s3_bucket.bucket_regional_domain_name}"
    origin_id   = "${aws_s3_bucket.s3_bucket.id}"
    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.cloudfront_origin_access_identity.cloudfront_access_identity_path}"
    }
  }

  enabled             =  true
  default_root_object = "index.html"
  aliases             = ["k-words.net"]

  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 403
    response_code         = 200
    response_page_path    = "/"
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    allowed_methods        = [ "GET", "HEAD" ]
    cached_methods         = [ "GET", "HEAD" ]
    target_origin_id       = "${aws_s3_bucket.s3_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  viewer_certificate {
    acm_certificate_arn      = "${var.acm_certificate_arn}"
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }
}

resource "aws_cloudfront_origin_access_identity" "cloudfront_origin_access_identity" {

}
