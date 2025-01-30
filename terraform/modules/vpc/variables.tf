variable "project_name" {
  type        = string
  description = "Name des Projekts"
}

variable "environment" {
  type        = string
  description = "Umgebung (dev, prod, etc.)"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR Block für die VPC"
  default     = "10.0.0.0/16"
}