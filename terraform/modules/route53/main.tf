resource "aws_route53_zone" "main" {
  name = "heimpoint.com"

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Output für die Nameserver
output "nameserver" {
  value = aws_route53_zone.main.name_servers
}

resource "aws_acm_certificate" "main" {
  domain_name       = "heimpoint.com"
  validation_method = "DNS"

  subject_alternative_names = [
    "*.heimpoint.com",
    "api.heimpoint.com",
    "www.heimpoint.com"
  ]

  lifecycle {
    create_before_destroy = true
  }
}