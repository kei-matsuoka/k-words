resource "aws_s3_bucket" "s3_bucket" {
  bucket = "${var.r_prefix}-s3-bucket"
}

resource "aws_s3_bucket_policy" "s3_bucket_policy" {
    bucket = "${aws_s3_bucket.s3_bucket.id}"
    policy = data.aws_iam_policy_document.iam_policy_document.json
}

data "aws_iam_policy_document" "iam_policy_document" {
  statement {
    sid    = "Allow CloudFront"
    effect = "Allow"
    principals {
      type = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.cloudfront_origin_access_identity.iam_arn}"]
    }
    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.s3_bucket.arn}/*"
    ]
  }
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access_block" {
  bucket                  = "${aws_s3_bucket.s3_bucket.id}"
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
