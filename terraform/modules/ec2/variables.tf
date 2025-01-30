variable "project_name" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The target environment (e.g. dev, prod)"
  type        = string
}

variable "subnet_id" {
  description = "The ID of the subnet where the EC2 instance will be launched"
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC where security groups will be created"
  type        = string
}

variable "instance_type" {
  description = "The type of EC2 instance to launch"
  type        = string
  default     = "t2.micro"
}

variable "volume_size" {
  description = "The size of the root volume in gigabytes"
  type        = number
  default     = 20
}

variable "tags" {
  description = "Additional tags for all resources"
  type        = map(string)
  default     = {}
}

variable "ssh_allowed_cidr" {
  description = "CIDR blocks allowed to connect via SSH"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "enable_detailed_monitoring" {
  description = "Whether to enable detailed monitoring on the instance"
  type        = bool
  default     = false
}

variable "root_volume_type" {
  description = "Type of the root volume (gp2, gp3, io1, etc.)"
  type        = string
  default     = "gp2"
}