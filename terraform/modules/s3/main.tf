resource "aws_s3_bucket" "terraform_state" {
  bucket = "${var.project_name}-terraform-state"
  
  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}